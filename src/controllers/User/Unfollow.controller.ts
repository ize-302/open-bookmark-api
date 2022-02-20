import { ObjectId } from "mongoose";
import User from "../../models/User.model";
import { userIsAuthorized } from "../../utils";
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
    const isAuthorized: any = userIsAuthorized(req, res);
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
