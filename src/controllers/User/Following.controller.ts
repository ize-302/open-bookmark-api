import User from "../../models/User.model";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { fetchUser } from "../../utils";

/**
 *  Get user's followings
 *
 *  Description: get a user's followings details
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
    if (!foundUser) return res.status(StatusCodes.OK).json([]);
    for (let i = 0; i < foundUser.following.length; i++) {
      foundUser.following[i] = await fetchUser(req, foundUser.following[i]);
    }
    res.status(StatusCodes.OK).json(foundUser.following);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
}

export default getUserInfo;
