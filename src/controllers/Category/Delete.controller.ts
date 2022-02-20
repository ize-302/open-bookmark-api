import { ObjectId } from "mongoose";
import Category from "../../models/Category.model";
import { userIsAuthorized } from "../../utils";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

/**
 * Delete a category
 *
 *  Description: Permanently delete a category
 */
async function deleteCategory(
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
    const isAuthorized: any = userIsAuthorized(req, res);
    const categoryToDelete: any = await Category.findOneAndRemove({
      _id: id,
      author: isAuthorized.sub,
    });
    if (categoryToDelete) {
      return res.status(StatusCodes.OK).json({
        message: "Deleted!",
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

export default deleteCategory;
