import User, { IUser } from "../../models/User.model";
import { userIsAuthorized } from "../../utils/index";
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
    const isAuthorized = userIsAuthorized(req, res);
    const { avatar_url, full_name, email } = isAuthorized.user_metadata;
    const { sub } = isAuthorized;
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
