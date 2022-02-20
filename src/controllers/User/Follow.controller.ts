import { ObjectId } from "mongoose";
import User from "../../models/User.model";
import { userIsAuthorized } from "../../utils";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

/**
 * follow a user
 */
async function followUser(
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
    const isAuthorized = userIsAuthorized(req, res);
    // add me to followee's followers
    await User.updateOne(
      { sub: id },
      { $addToSet: { followers: isAuthorized.sub } }
    );
    // add followee to my following
    await User.updateOne(
      { sub: isAuthorized.sub },
      { $addToSet: { following: id } }
    );
    res.status(StatusCodes.OK).json({ message: "Following" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
}

export default followUser;
