import User, { IUser } from "../../models/User.model";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import {
  verifyAccessToken,
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/index";
import randToken from "rand-token";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function verifyUser(
  req: {
    headers: any;
    query: { token: string };
  },
  res: {
    status: (arg0: number) => {
      json: any;
    };
  }
) {
  try {
    const { token } = req.query;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload: any = ticket.getPayload();
    const foundUser: any = await User.findOne({
      email: payload.email,
    });
    if (foundUser) {
      await User.findOneAndUpdate(
        {
          email: payload.email,
        },
        {
          sub: payload.sub,
        }
      );
    } else {
      const user: IUser = new User({
        avatar_url: payload.picture,
        full_name: payload.name,
        email: payload.email,
        sub: payload.sub,
        joined: new Date(),
      });
      await user.save();
    }
    // GENERATE JWT
    const access_token = await generateAccessToken(payload);
    // GENERATE REFRESH TOKEN
    let refresh_token = generateRefreshToken(payload);
    res
      .status(StatusCodes.OK)
      .json({ access_token: access_token, refresh_token });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
}

export default verifyUser;
