import Bookmark, { IBookmark } from "../../models/Bookmark.model";

async function create(
  req: {
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
    const { title, url, description, isPrivate } = req.body;
    if (!title || !url) {
      return res.status(400).json({
        message: "Fill up form",
        success: false,
      });
    }
    const bookmarkExists = await Bookmark.findOne({
      url: url,
    });
    if (bookmarkExists) {
      if (bookmarkExists.url === url) {
        return res.status(400).json({
          message: "URL already bookmarked",
          success: false,
        });
      }
    } else {
      const bookmark: IBookmark = new Bookmark({
        title,
        url,
        description,
        isPrivate,
        created_at: new Date(),
      });
      const createBookmark = await bookmark.save();
      if (createBookmark) {
        res.status(200).json({
          success: true,
          message: "Bookmark created!",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "An error occured." });
  }
}

export default create;
