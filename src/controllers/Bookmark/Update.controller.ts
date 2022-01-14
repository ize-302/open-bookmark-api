import { ObjectId } from "mongoose";
import Bookmark from "../../models/Bookmark.model";
import { verifyToken } from "../../utils";

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
      return res.status(400).json({
        message: "Not authorised",
        success: false,
      });
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
      return res.status(200).json({
        success: true,
        message: "Bookmark updated!",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Bookmark not found!",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "An error occured." });
  }
}

export default updateBookmark;
