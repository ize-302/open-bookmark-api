import { ObjectId } from "mongoose";
import Bookmark from "../../models/Bookmark.model";
import { verifyToken } from "../../utils";

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
    const { authorization } = req.headers;
    const isAuthorized: any = verifyToken(authorization);
    if (!isAuthorized) {
      return res.status(400).json({
        message: "Not authorised",
        success: false,
      });
    }
    const bookmarkToDelete: any = await Bookmark.findOneAndRemove({
      _id: id,
      author: isAuthorized.sub,
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
