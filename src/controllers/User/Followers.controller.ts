import User from "../../models/User.model";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { fetchUser, paginationOptions } from "../../utils";

/**
 *  Get user's followers
 *
 *  Description: get a user's followers details
 */
async function getUserInfo(
  req: {
    query: {
      page: string;
      per_page: string;
    };
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
    const { page, per_page } = req.query;
    const { id } = req.params;
    const foundUser: any = await User.findOne({
      sub: id,
    });
    const query = {
      sub: foundUser.followers,
    };

    if (!foundUser) return res.status(StatusCodes.OK).json({message: 'User not found'});
    User.paginate(query, await paginationOptions(per_page, page))
    .then(async (result: any) => {
      for (let i = 0; i < result.items.length; i++) {
        result.items[i].followers = await fetchUser(req, result.items[i]);
      }
      res.status(StatusCodes.OK).json(result);
    })
    .catch((err: any) => {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
}

export default getUserInfo;
