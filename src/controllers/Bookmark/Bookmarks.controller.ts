import Bookmark, { IBookmark } from "../../models/Bookmark.model";
import { paginationOptions } from "../../utils";

async function bookmarks(
  req: {
    query: {
      q: string;
      page: string;
      per_page: string;
    };
  },
  res: {
    status: (arg0: number) => {
      json: any;
    };
  }
) {
  try {
    const { q, page, per_page } = req.query;
    const query = {
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
