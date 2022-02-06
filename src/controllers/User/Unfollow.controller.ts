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
    const user: any = await User.findOne({
      sub: id,
    });
    let followers = user.followers;
    // remove follower from followee's followers list
    followers = followers.filter((follower: any) => {
      return follower !== isAuthorized.sub;
    });
    const updateFollowers: any = await User.findOneAndUpdate(
      {
        sub: id,
      },
      {
        followers: followers,
      }
    );
    // HANDLE UNFOLLOW FOR FOLLOWER
    // find follower's details
    const follower: any = await User.findOne({
      sub: isAuthorized.sub,
    });
    let following = follower.following;
    following = following.filter((followee: any) => {
      return followee !== id;
    });
    const updateFollowing: any = await User.findOneAndUpdate(
      {
        sub: isAuthorized.sub,
      },
      {
        following: following,
      }
    );
    // remove from follwoing
    if (updateFollowers && updateFollowing) {
      res.status(StatusCodes.OK).json({ message: "Unfollowed" });
    }
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
}

export default unfollowUser;
