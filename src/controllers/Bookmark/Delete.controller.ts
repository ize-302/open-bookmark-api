import { ObjectId } from "mongoose";
import Bookmark, { IBookmark } from "../../models/Bookmark.model";

async function deleteBookmark(
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
    const bookmarkToDelete: any = await Bookmark.findOneAndRemove({
      _id: id,
    });
    if (bookmarkToDelete) {
      return res.status(200).json({
        success: true,
        message: "Bookmark deleted!",
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

export default deleteBookmark;
