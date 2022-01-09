import Bookmark, { IBookmark } from "../../models/Bookmark.model";
import { verifyToken } from "../../utils/index";

async function create(
  req: {
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
    const { title, url, comment, isPrivate } = req.body;
    const { authorization } = req.headers;
    const isAuthorized: any = verifyToken(authorization);
    if (!isAuthorized) {
      return res.status(400).json({
        message: "Not authorised",
        success: false,
      });
    }
    if (!title || !url) {
      return res.status(400).json({
        message: "Fill up form",
        success: false,
      });
    }
    const bookmark: IBookmark = new Bookmark({
      title,
      url,
      comment,
      isPrivate,
      created_at: new Date(),
      author: isAuthorized.sub,
    });
    const createBookmark = await bookmark.save();
    if (createBookmark) {
      res.status(200).json({
        success: true,
        message: "Bookmark created!",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "An error occured." });
  }
}

export default create;
