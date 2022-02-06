import { ObjectId } from "mongoose";
import User from "../../models/User.model";
import { verifyAccessToken } from "../../utils";
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
    // // check if follower already following
    const isFollowing = followers.find((follower: any) => {
      return follower === isAuthorized.sub;
    });
    if (isFollowing) {
      return res.status(StatusCodes.OK).json({ message: "Already following" });
    }
    // add to followee's followers list
    followers.unshift(isAuthorized.sub);
    const updateFollowers: any = await User.findOneAndUpdate(
      {
        sub: id,
      },
      {
        followers: followers,
      }
    );
    // HANDLE FOLLWING FOR FOLLOWER's FOLLOWERS
    // get followe's details
    let follower: any = await User.findOne({
      sub: isAuthorized.sub,
    });
    let following = follower.following;
    // add  followee to follower's following list
    following.unshift(id);
    const updateFollowing: any = await User.findOneAndUpdate(
      {
        sub: isAuthorized.sub,
      },
      {
        following: following,
      }
    );

    if (updateFollowers && updateFollowing) {
      res.status(StatusCodes.OK).json({ message: "Following" });
    }
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
}

export default followUser;
