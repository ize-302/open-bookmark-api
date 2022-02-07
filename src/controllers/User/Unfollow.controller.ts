import { ObjectId } from "mongoose";
import User from "../../models/User.model";
import { verifyAccessToken } from "../../utils";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

/**
 * follow a user
 */
async function unfollowUser(
  req: {
    params: { id: ObjectId };
    headers: any;
  },
  res: {
    status: (arg0: number) => {
      json: any;
    };
  }
) {
  try {
    const { id } = req.params;
    const { authorization } = req.headers;
    const isAuthorized: any = verifyAccessToken(authorization);
    if (!isAuthorized) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: ReasonPhrases.UNAUTHORIZED });
    }
    // remove me from followee's followers
    await User.updateOne(
      { sub: id },
      { $pull: { followers: isAuthorized.sub } }
    );
    /// remove followee to my following
    await User.updateOne(
      { sub: isAuthorized.sub },
      { $pull: { following: id } }
    );
    res.status(StatusCodes.OK).json({ message: "Unfollowed" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
}

export default unfollowUser;
