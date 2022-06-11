import Bookmark, { IBookmark } from "../../models/Bookmark.model";
import Category from "../../models/Category.model";
import { userIsAuthorized } from "../../utils/index";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

/**
 *  Create bookmark
 *
 *  Description: Create a bookmark
 */
async function create(
  req: {
    body: {
      title: string;
      url: string;
      description: string;
      is_private: boolean;
      category: string;
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
    const { title, url, description, is_private, category } = req.body;
    const isAuthorized = userIsAuthorized(req, res);
    if (!title || !url) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: ReasonPhrases.BAD_REQUEST });
    }
    const bookmark: IBookmark = new Bookmark({
      title,
      url,
      description,
      is_private,
      created_at: Date.now(),
      updated_at: Date.now(),
      author: isAuthorized.sub,
      category,
    });
    const createBookmark = await bookmark.save();
    // update category
    if (category) {
      await Category.updateOne(
        { _id: createBookmark.category },
        { $addToSet: { bookmarks: [createBookmark._id] } }
      );
    }
    if (createBookmark) {
      res.status(StatusCodes.CREATED).json({ message: ReasonPhrases.CREATED });
    }
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
}

export default create;
