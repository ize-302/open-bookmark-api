import { ObjectId } from "mongoose";
import Bookmark from "../../models/Bookmark.model";
import Category from "../../models/Category.model";
import { userIsAuthorized } from "../../utils";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

/**
 * Update a bookmark
 *
 *  Description: Update a bookmark
 */
async function updateBookmark(
  req: {
    params: { id: ObjectId };
    body: {
      title: string;
      url: string;
      description: string;
      is_private: boolean;
      category: string;
      oldCategory: string;
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
    const id = req.params.id;
    const isAuthorized = userIsAuthorized(req, res);
    const { title, url, description, is_private, category, oldCategory } =
      req.body;
    const bookmarkToUpdate: any = await Bookmark.findOneAndUpdate(
      {
        _id: id,
        author: isAuthorized.sub,
      },
      {
        title,
        url,
        description,
        is_private,
        category,
        updated_at: Date.now(),
      }
    );

    if (bookmarkToUpdate) {
      return res.status(StatusCodes.OK).json({
        message: "Bookmark Updated!",
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

export default updateBookmark;
