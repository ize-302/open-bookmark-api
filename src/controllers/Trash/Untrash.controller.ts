import { ObjectId } from "mongoose";
import Bookmark from "../../models/Bookmark.model";
import Category from "../../models/Category.model";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { verifyAccessToken } from "../../utils";

/**
 * Untrash a bookmark
 *
 *  Description:  Unrash a bookmark
 */
async function restoreBookmark(
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
    const id = req.params.id;
    const { authorization } = req.headers;
    const isAuthorized: any = verifyAccessToken(authorization);
    if (!isAuthorized) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: ReasonPhrases.UNAUTHORIZED });
    }
    const bookmarkToRestore: any = await Bookmark.findOneAndUpdate(
      {
        _id: id,
        author: isAuthorized.sub,
      },
      {
        is_trashed: false,
      }
    );
    // add back to category
    await Category.updateOne(
      { _id: bookmarkToRestore.category },
      { $addToSet: { bookmarks: id } }
    );
    if (bookmarkToRestore) {
      return res.status(StatusCodes.OK).json({
        message: "Bookmark restored!",
      });
    } else {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Bookmark not found!",
      });
    }
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
}

export default restoreBookmark;
