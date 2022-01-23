import User, { IUser } from "../../models/User.model";
import { verifyToken } from "../../utils/index";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

async function user(
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
    const is_authorized: any = verifyToken(authorization);
    if (!is_authorized) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: ReasonPhrases.UNAUTHORIZED });
    }
    const { avatar_url, full_name, email } = is_authorized.user_metadata;
    const foundUser: any = await User.findOne({
      email,
    });
    if (foundUser) {
      res.status(StatusCodes.OK).json(foundUser);
    } else {
      const user: IUser = new User({
        avatar_url,
        full_name,
        email,
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

export default user;
