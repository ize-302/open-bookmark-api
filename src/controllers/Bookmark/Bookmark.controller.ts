import { ObjectId } from "mongoose";
import Bookmark from "../../models/Bookmark.model";

async function getBookmark(
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
    const findBookmark: any = await Bookmark.findOne({
      _id: id,
    });
    if (findBookmark) {
      return res.status(200).json(findBookmark);
    }
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "Bookmark not found!" });
  }
}

export default getBookmark;
