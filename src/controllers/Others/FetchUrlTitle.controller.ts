import cheerio from "cheerio";
import axios from "axios";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

/**
 *  Grab a title of URL
 *
 *  Description: Grabs the title of any given url
 */
async function fetchUrlTitle(
  req: {
    query: { url: string };
  },
  res: {
    status: (arg0: number) => {
      json: any;
    };
  }
) {
  try {
    const url = req.query.url;
    axios
      .get(url)
      .then((response) => {
        var $ = cheerio.load(response.data);
        var title = $("title").text();
        res.status(StatusCodes.OK).json({ title });
      })
      .catch((error) => {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: "Could not generate title" });
      });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
}

export default fetchUrlTitle;
