import { ObjectId } from "mongoose";
import Category from "../../models/Category.model";
import { userIsAuthorized } from "../../utils";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

/**
 * Update a category
 *
 *  Description: Update a category
 */
async function updateCategory(
  req: {
    params: { id: ObjectId };
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
    const id = req.params.id;
    const isAuthorized: any = userIsAuthorized(req, res);
    const { name } = req.body;
    const categoryToUpdate: any = await Category.findOneAndUpdate(
      {
        _id: id,
        author: isAuthorized.sub,
      },
      {
        name,
      }
    );
    if (categoryToUpdate) {
      return res.status(StatusCodes.OK).json({
        message: "Category Updated!",
      });
    } else {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: ReasonPhrases.NOT_FOUND,
      });
    }
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
}

export default updateCategory;
