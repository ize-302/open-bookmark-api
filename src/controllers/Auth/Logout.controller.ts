import Token from "../../models/Token.model";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

async function verifyUser(
  req: {
    headers: any;
    body: { refresh_token: string };
  },
  res: {
    status: (arg0: number) => {
      json: any;
    };
  }
) {
  try {
    const { refresh_token } = req.body;
    await Token.findOneAndRemove({
      token: refresh_token,
    });
    res.status(StatusCodes.OK).json({ message: "Logged out" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
}

export default verifyUser;
