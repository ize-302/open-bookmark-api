import Bookmark, { IBookmark } from "../../models/Bookmark.model";
import { verifyToken } from "../../utils/index";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

/**
 *  Create bookmark
 *
 *  Description: Create a bookmark
 */
async function create(
  req: {
    body: {
      title: string;
      url: string;
      comment: string;
      is_private: boolean;
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
    const { title, url, comment, is_private } = req.body;
    const { authorization } = req.headers;
    const isAuthorized: any = verifyToken(authorization);
    if (!isAuthorized) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: ReasonPhrases.UNAUTHORIZED });
    }
    if (!title || !url) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: ReasonPhrases.BAD_REQUEST });
    }
    const bookmark: IBookmark = new Bookmark({
      title,
      url,
      comment,
      is_private,
      created_at: new Date(),
      author: isAuthorized.sub,
    });
    const createBookmark = await bookmark.save();
    if (createBookmark) {
      res.status(StatusCodes.CREATED).json({ message: ReasonPhrases.CREATED });
    }
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
}

export default create;
