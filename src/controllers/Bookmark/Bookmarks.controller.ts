import Bookmark, { IBookmark } from "../../models/Bookmark.model";
import { paginationOptions, verifyToken } from "../../utils";

async function bookmarks(
  req: {
    query: {
      q: string;
      page: string;
      per_page: string;
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
    const { q, page, per_page } = req.query;
    const { authorization } = req.headers;
    const isAuthorized: any = verifyToken(authorization);
    if (!isAuthorized) {
      return res.status(400).json({
        message: "Not authorised",
        success: false,
      });
    }
    const query = {
      isTrashed: false,
      author: isAuthorized.sub,
      $or: [
        { title: { $regex: new RegExp(q), $options: "i" } },
        { url: { $regex: new RegExp(q), $options: "i" } },
      ],
    };

    Bookmark.paginate(query, await paginationOptions(per_page, page))
      .then(async (result: any) => {
        res.status(200).json(result);
      })
      .catch((err: any) => {
        console.log(err);
      });
  } catch (error) {
    return res.status(500).json({ message: "An error occured." });
  }
}

export default bookmarks;
