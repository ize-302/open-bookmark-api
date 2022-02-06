import Category, { ICategory } from "../../models/Category.model";
import { paginationOptions, verifyAccessToken } from "../../utils";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

/**
 *  User's categories
 *
 *  Description: Get all categories of logged user
 */
async function categories(
  req: {
    headers: any;
  },
  res: {
    status: (arg0: number) => {
      json: any;
    };
  }
) {
  try {
    const { authorization } = req.headers;
    const isAuthorized: any = verifyAccessToken(authorization);
    if (!isAuthorized) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: ReasonPhrases.UNAUTHORIZED });
    }

    const categories: any = await Category.find({
      author: isAuthorized.sub,
    });
    if (categories) {
      return res.status(StatusCodes.OK).json(categories);
    } else {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: ReasonPhrases.NOT_FOUND });
    }
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ meesage: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
}

export default categories;
