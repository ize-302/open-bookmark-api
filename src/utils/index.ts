import jwt from "jsonwebtoken";
import axios from "axios";

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

export function verifyToken(jwtToken: string) {
  try {
    var token = jwtToken.replace("Bearer ", "");
    return jwt.verify(token, `${process.env.SUPABASE_JWT_SECRET}`);
  } catch (e) {
    console.log("e:", e);
    return null;
  }
}

// get author detail
export async function fetchUser(req: any, authorId: any) {
  return axios
    .get(`http://${req.headers.host}/api/v1/users/${authorId}/info`)
    .then((response) => {
      return response.data;
    });
}
