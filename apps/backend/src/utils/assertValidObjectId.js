const mongoose = require("mongoose");
const httpStatus = require("http-status");
const ApiError = require("./ApiError");

// Throws 400 when `id` can't be a MongoDB ObjectId, before it reaches a query
// (where Mongoose would throw a CastError) or `new ObjectId()` (a BSONError).
const assertValidObjectId = (id, field) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Invalid ${field} id`);
  }
};

module.exports = assertValidObjectId;
