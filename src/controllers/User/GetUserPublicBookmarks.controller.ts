import Bookmark, { IBookmark } from "../../models/Bookmark.model";
import { paginationOptions, verifyAccessToken, fetchUser } from "../../utils";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

/**
 *  User's bookmarks
 *
 *  Description: Get all bookmarks of logged user
 */
async function userPublicBookmarks(
  req: {
    params: {
      id: string;
    };
    query: {
      q: string;
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
    const { q, page, per_page } = req.query;
    const { id } = req.params;
    const query = {
      is_trashed: false,
      author: id,
      $or: [
        { title: { $regex: new RegExp(q), $options: "i" } },
        { url: { $regex: new RegExp(q), $options: "i" } },
      ],
      is_private: false,
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
          .json({ meesage: ReasonPhrases.INTERNAL_SERVER_ERROR });
      });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ meesage: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
}

export default userPublicBookmarks;
