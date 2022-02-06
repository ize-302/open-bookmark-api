import Category, { ICategory } from "../../models/Category.model";
import { verifyAccessToken } from "../../utils/index";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

/**
 *  Create category
 *
 *  Description: Create a category
 */
async function createCategory(
  req: {
    body: {
      name: string;
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
    const { name } = req.body;
    const { authorization } = req.headers;
    const isAuthorized: any = verifyAccessToken(authorization);
    if (!isAuthorized) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: ReasonPhrases.UNAUTHORIZED });
    }
    if (!name) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: ReasonPhrases.BAD_REQUEST });
    }
    const category: ICategory = new Category({
      name,
      created_at: new Date(),
      author: isAuthorized.sub,
    });
    const createCategory = await category.save();
    if (createCategory) {
      res.status(StatusCodes.CREATED).json({ message: ReasonPhrases.CREATED });
    }
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
}

export default createCategory;
