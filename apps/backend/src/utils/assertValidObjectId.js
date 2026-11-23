const httpStatus = require("http-status");
const ApiError = require("./ApiError");

// Same rule as the Joi `objectId` validator (validations/custom.validation.js).
// mongoose.isValidObjectId is looser: it also accepts any 12-character string
// and numbers, which then reach the query as ids that can never match.
const OBJECT_ID_PATTERN = /^[0-9a-fA-F]{24}$/;

// Throws 400 when `id` isn't a 24-character hex ObjectId, before it reaches a
// query (where Mongoose would throw a CastError) or `new ObjectId()` (a BSONError).
const assertValidObjectId = (id, field) => {
  if (typeof id !== "string" || !OBJECT_ID_PATTERN.test(id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Invalid ${field} id`);
  }
};

module.exports = assertValidObjectId;
