import Bookmark, { IBookmark } from "../../models/Bookmark.model";
import { paginationOptions, verifyAccessToken } from "../../utils";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

/**
 *  User's trashed bookmarks
 *
 *  Description: Get all trashed bookmarks of logged user
 */
async function getTrash(
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
    const isAuthorized: any = verifyAccessToken(authorization);
    if (!isAuthorized) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: ReasonPhrases.UNAUTHORIZED });
    }
    const query = {
      is_trashed: true,
      author: isAuthorized.sub,
      $or: [
        { title: { $regex: new RegExp(q), $options: "i" } },
        { url: { $regex: new RegExp(q), $options: "i" } },
      ],
    };

    Bookmark.paginate(query, await paginationOptions(per_page, page))
      .then(async (result: any) => {
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

export default getTrash;
