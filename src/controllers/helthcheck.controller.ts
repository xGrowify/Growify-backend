import { asyncHandler } from "../utils/AsyncHandler.js";

import { ApiResponse, ResponseCode } from "../utils/ApiResponse.js";

const helthcheck = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json(new ApiResponse(ResponseCode.SUCCESS_OK, "Server is up and running"));
});
export { helthcheck };