import { ObjectId } from "mongoose";
import Bookmark from "../../models/Bookmark.model";

async function restoreBookmark(
  req: {
    params: { id: ObjectId };
  },
  res: {
    status: (arg0: number) => {
      json: any;
    };
  }
) {
  try {
    const id = req.params.id;
    const bookmarkToRestore: any = await Bookmark.findOneAndUpdate(
      {
        _id: id,
      },
      {
        isTrashed: false,
      }
    );
    if (bookmarkToRestore) {
      return res.status(200).json({
        success: true,
        message: "Bookmark restored!",
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

export default restoreBookmark;
