import cheerio from "cheerio";
import axios from "axios";

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
        res.status(200).json({
          title: title,
        });
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({
          error,
        });
      });
  } catch (error) {
    return res.status(500).json({ message: "An error occured." });
  }
}

export default fetchUrlTitle;
