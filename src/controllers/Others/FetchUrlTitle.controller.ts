import cheerio from "cheerio";
import axios from "axios";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

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
          .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
      });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
}

export default fetchUrlTitle;
