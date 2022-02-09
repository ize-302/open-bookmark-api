import { ObjectId } from "mongoose";
import Bookmark from "../../models/Bookmark.model";
import Category from "../../models/Category.model";
import { verifyAccessToken } from "../../utils";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

/**
 * Trash a bookmark
 *
 *  Description: Temporary trash a bookmark
 */
async function trashBookmark(
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
    const bookmarkToTrash: any = await Bookmark.findOneAndUpdate(
      {
        _id: id,
        author: isAuthorized.sub,
      },
      {
        is_trashed: true,
      }
    );
    // remove from category
    await Category.updateOne(
      { _id: bookmarkToTrash.category },
      { $pull: { bookmarks: id } }
    );
    if (bookmarkToTrash) {
      return res.status(StatusCodes.OK).json({
        message: "Bookmark trashed!",
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

export default trashBookmark;
