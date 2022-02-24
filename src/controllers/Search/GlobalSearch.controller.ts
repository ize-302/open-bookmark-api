import Bookmark from "../../models/Bookmark.model";
import User from "../../models/User.model";
import { paginationOptions, userIsAuthorized, fetchUser } from "../../utils";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

/**
 *  Search
 *
 *  Description: search for bookmarks and users
 */
async function globalSearch(
  req: {
    query: {
      search_for: string;
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
    const { search_for, q, page, per_page } = req.query;
    userIsAuthorized(req, res);
    let query = {};
    let result = {};
    // query users
    if (search_for === "users") {
      query = {
        $or: [
          { full_name: { $regex: new RegExp(q), $options: "i" } },
          { email: { $regex: new RegExp(q), $options: "i" } },
        ],
      };
      const users = await User.paginate(
        query,
        await paginationOptions(per_page, page)
      ).then(async (result: any) => {
        return result;
      });
      result = users || [];
    } else if (search_for === "bookmarks") {
      // query bookmarks
      query = {
        is_private: false,
        is_trashed: false,
        $or: [
          { title: { $regex: new RegExp(q), $options: "i" } },
          { url: { $regex: new RegExp(q), $options: "i" } },
        ],
      };
      const bookmarks = await Bookmark.paginate(
        query,
        await paginationOptions(per_page, page)
      ).then(async (result: any) => {
        for (let i = 0; i < result.items.length; i++) {
          result.items[i].author = await fetchUser(req, result.items[i].author);
        }
        return result;
      });
      result = bookmarks || [];
    }
    res.status(StatusCodes.OK).json({ ...result, result_type: search_for });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
}

export default globalSearch;
