import { ObjectId } from "mongoose";
import Bookmark from "../../models/Bookmark.model";
import { verifyAccessToken } from "../../utils";
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
    const { authorization } = req.headers;
    const isAuthorized: any = verifyAccessToken(authorization);
    if (!isAuthorized) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: ReasonPhrases.UNAUTHORIZED });
    }
    const { title, url, description, is_private, category } = req.body;
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
        updated_at: new Date(),
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
