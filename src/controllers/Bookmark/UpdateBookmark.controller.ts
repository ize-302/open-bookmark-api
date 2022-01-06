import { ObjectId } from "mongoose";
import Bookmark from "../../models/Bookmark.model";

async function updateBookmark(
  req: {
    params: { id: ObjectId };
    body: {
      title: string;
      url: string;
      description: string;
      isPrivate: boolean;
    };
  },
  res: {
    status: (arg0: number) => {
      json: any;
    };
  }
) {
  try {
    const id = req.params.id;
    const { title, url, description, isPrivate } = req.body;
    const bookmarkToUpdate: any = await Bookmark.findOneAndUpdate(
      {
        _id: id,
      },
      {
        title,
        url,
        description,
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