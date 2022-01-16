import { ObjectId } from "mongoose";
import Bookmark from "../../models/Bookmark.model";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

async function getBookmark(
  req: {
    params: { id: ObjectId };
  },
  res: {
    status: (arg0: number) => {
      json: any;
    };
  }
) {
  try {
    const id = req.params.id;
    const foundBookmark: any = await Bookmark.findOne({
      _id: id,
    });
    if (foundBookmark) {
      return res.status(StatusCodes.OK).json(foundBookmark);
    } else {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: ReasonPhrases.NOT_FOUND });
    }
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
}

export default getBookmark;
