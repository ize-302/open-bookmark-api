import Bookmark, { IBookmark } from "../../models/Bookmark.model";
import { paginationOptions, verifyToken, fetchUser } from "../../utils";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

/**
 *  User's bookmarks
 *
 *  Description: Get all bookmarks of logged user
 */
async function bookmarks(
  req: {
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
    const { authorization } = req.headers;
    const isAuthorized: any = verifyToken(authorization);
    if (!isAuthorized) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: ReasonPhrases.UNAUTHORIZED });
    }
    const query = {
      is_trashed: false,
      author: isAuthorized.sub,
      $or: [
        { title: { $regex: new RegExp(q), $options: "i" } },
        { url: { $regex: new RegExp(q), $options: "i" } },
      ],
    };

    Bookmark.paginate(query, await paginationOptions(per_page, page))
      .then(async (result: any) => {
        for (let i = 0; i < result.items.length; i++) {
          result.items[i].author = await fetchUser(req, result.items[i].author);
        }
        res.status(StatusCodes.OK).json(result);
      })
      .catch((err: any) => {
        console.log(err);
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

export default bookmarks;
