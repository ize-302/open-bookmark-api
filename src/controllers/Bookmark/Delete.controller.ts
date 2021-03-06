import { ObjectId } from "mongoose";
import Bookmark from "../../models/Bookmark.model";
import { userIsAuthorized } from "../../utils";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

/**
 * Delete a bookmark
 *
 *  Description: Permanently delete a bookmark
 */
async function deleteBookmark(
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
    const bookmarkToDelete: any = await Bookmark.findOneAndRemove({
      _id: id,
      author: isAuthorized.sub,
    });

    if (bookmarkToDelete) {
      return res.status(StatusCodes.OK).json({
        message: "Deleted!",
      });
    } else {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: ReasonPhrases.NOT_FOUND,
      });
    }
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
}

export default deleteBookmark;
