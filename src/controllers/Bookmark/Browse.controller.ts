import Bookmark from "../../models/Bookmark.model";
import { paginationOptions, fetchUser, userIsAuthorized } from "../../utils";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

/**
 *  Browse bookmarks
 *
 *  Description: Get all publicly available bookamrks by users you follow
 */
async function browse(
  req: {
    query: {
      page: string;
      per_page: string;
    };
    headers: any;
  },
  res: {
    status: (arg0: number) => {
      json: any;
    };
  }
) {
  try {
    const { page, per_page } = req.query;
    const isAuthorized = userIsAuthorized(req, res);
    // get user's followings
    const userDetails = await fetchUser(req, isAuthorized.sub);
    const followings = userDetails.following;

    const query = {
      is_private: false,
      is_trashed: false,
      author: { $in: followings },
    };

    Bookmark.paginate(query, await paginationOptions(per_page, page))
      .then(async (result: any) => {
        for (let i = 0; i < result.items.length; i++) {
          result.items[i].author = await fetchUser(req, result.items[i].author);
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

export default browse;
