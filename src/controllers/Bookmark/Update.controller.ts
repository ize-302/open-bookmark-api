import { ObjectId } from "mongoose";
import Bookmark from "../../models/Bookmark.model";
import { verifyToken } from "../../utils";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

async function updateBookmark(
  req: {
    params: { id: ObjectId };
    body: {
      title: string;
      url: string;
      comment: string;
      isPrivate: boolean;
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
    const isAuthorized: any = verifyToken(authorization);
    if (!isAuthorized) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: ReasonPhrases.UNAUTHORIZED });
    }
    const { title, url, comment, isPrivate } = req.body;
    const bookmarkToUpdate: any = await Bookmark.findOneAndUpdate(
      {
        _id: id,
        author: isAuthorized.sub,
      },
      {
        title,
        url,
        comment,
        isPrivate,
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
