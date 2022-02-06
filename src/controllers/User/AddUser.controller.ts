import User, { IUser } from "../../models/User.model";
import { verifyAccessToken } from "../../utils/index";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

/**
 *  Handle user
 *
 *  Description: Save newly registered user to DB
 */
async function addUser(
  req: {
    headers: any;
  },
  res: {
    status: (arg0: number) => {
      json: any;
    };
  }
) {
  try {
    const { authorization } = req.headers;
    const is_authorized: any = verifyAccessToken(authorization);
    if (!is_authorized) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: ReasonPhrases.UNAUTHORIZED });
    }
    const { avatar_url, full_name, email } = is_authorized.user_metadata;
    const { sub } = is_authorized;
    const foundUser: any = await User.findOne({
      email,
    });
    if (foundUser) {
      const updatedUser = await User.findOneAndUpdate(
        {
          email: email,
        },
        {
          sub,
        }
      );
      res.status(StatusCodes.OK).json(updatedUser);
    } else {
      const user: IUser = new User({
        avatar_url,
        full_name,
        email,
        sub,
        joined: new Date(),
      });
      const created_user = await user.save();
      res.status(StatusCodes.CREATED).json(created_user);
    }
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
}

export default addUser;
