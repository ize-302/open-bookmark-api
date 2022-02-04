import User, { IUser } from "../../models/User.model";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { fetchUser } from "../../utils";
import { resourceLimits } from "worker_threads";

/**
 *  Handle user
 *
 *  Description: get a user's detail
 */
async function getUserInfo(
  req: {
    params: {
      id: string;
    };
  },
  res: {
    status: (arg0: number) => {
      json: any;
    };
  }
) {
  try {
    const { id } = req.params;
    const foundUser: any = await User.findOne({
      sub: id,
    });
    if (foundUser) {
      res.status(StatusCodes.OK).json(foundUser);
    } else {
      res.status(StatusCodes.OK).json({});
    }
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
}

export default getUserInfo;
