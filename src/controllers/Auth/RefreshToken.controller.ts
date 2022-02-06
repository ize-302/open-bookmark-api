import User from "../../models/User.model";
import Token from "../../models/Token.model";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { generateAccessToken } from "../../utils/index";
import moment from "moment";
moment.suppressDeprecationWarnings = true;

async function refreshtoken(
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
    // get refresh token details
    const foundRefreshToken: any = await Token.findOne({
      token: refresh_token,
    });
    let currentDate = moment(new Date());
    const expires_at = moment(foundRefreshToken.expires_at);
    if (!foundRefreshToken) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "Refresh token is not in database" });
    }
    if (currentDate < expires_at) {
      // get user's details
      const getUserDetails: any = await User.findOne({
        sub: foundRefreshToken.user,
      });
      // GENERATE JWT
      const access_token = await generateAccessToken(getUserDetails);
      res
        .status(StatusCodes.OK)
        .json({ access_token: access_token, refresh_token });
    } else {
      res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "Refresh token is expired" });
    }
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
}

export default refreshtoken;
