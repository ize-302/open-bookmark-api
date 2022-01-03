import jwt from "jsonwebtoken";

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
    lean: false,
  };
};
