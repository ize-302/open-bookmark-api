import { ObjectId } from "mongoose";
import Bookmark from "../../models/Bookmark.model";
import Category from "../../models/Category.model";
import { userIsAuthorized } from "../../utils";
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
    const isAuthorized = userIsAuthorized(req, res);
    const bookmarkToTrash: any = await Bookmark.findOneAndUpdate(
      {
        _id: id,
        author: isAuthorized.sub,
      },
      {
        is_trashed: true,
      }
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
