import jwt from "jsonwebtoken";
import axios from "axios";
import randToken from "rand-token";

// PAGINATION UTISL
const customLabels = {
  totalDocs: "total_items",
  docs: "items",
  limit: "per_page",
  page: "page",
  nextPage: "next",
  prevPage: "prev",
  totalPages: "page_count",
  pagingCounter: "slNo",
  meta: "paginator",
};

export const paginationOptions = async (per_page: any, page: any) => {
  return {
    limit: per_page,
    page: page,
    allowDiskUse: true,
    customLabels: customLabels,
    lean: true,
    sort: { updated_at: -1 },
    leanWithId: true,
  };
};

export function verifyAccessToken(jwtToken: string) {
  try {
    var token = jwtToken.replace("Bearer ", "");
    return jwt.verify(token, `${process.env.JWT_SECRET}`);
  } catch (e) {
    console.log("e:", e);
    return null;
  }
}

export async function generateAccessToken(payload: any) {
  const access_token = await jwt.sign(
    {
      avatar_url: payload.picture,
      full_name: payload.name,
      email: payload.email,
      sub: payload.sub,
    },
    `${process.env.JWT_SECRET}`,
    { expiresIn: "1h", algorithm: "HS256" }
  );
  return access_token;
}

export function generateRefreshToken(payload: any) {
  let refresh_tokens: any = {};
  let refresh_token = randToken.uid(256);
  refresh_tokens[refresh_token] = payload.sub;
  return refresh_token;
}

// get author detail
export async function fetchUser(req: any, authorId: any) {
  return axios
    .get(`http://${req.headers.host}/api/v1/users/${authorId}/info`)
    .then((response) => {
      return response.data;
    });
}

export async function logout({ req, refresh_token }: any) {
  return axios
    .post(`http://${req.headers.host}/api/v1/auth/logout`, {
      refresh_token: refresh_token,
    })
    .then((response) => {
      return response.data;
    });
}
