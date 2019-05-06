const { extractValidFields } = require('../lib/validation');
const { getDBReference } = require('../lib/mongo');

/*
 * Schema describing required/optional fields of a review object.
 */
exports.ReviewSchema = {
  userid: { required: true },
  businessid: { required: true },
  dollars: { required: true },
  stars: { required: true },
  review: { required: false }
};

exports.getNextAvailableID = async function () {
  const db = getDBReference();
  const collection = db.collection('reviews');
  const query = [
    {
      $project: { maxID: { $max: "$id" } }
    },
    {
      $sort: { maxID:-1 }
    },
    {
      $limit: 1
    }
  ];
  const result = await collection.aggregate(query).next();
  const nextAvailableID = result.maxID + 1;
  return nextAvailableID;
}

exports.getAllReviews = async function () {
  const db = getDBReference();
  const collection = db.collection('reviews');
  const results = await collection.find().toArray();
  return results;
}

exports.insertNewReview = async function (review) {
  const db = getDBReference();
  const collection = db.collection('reviews');
  const result = await collection.insertOne(review);
  return result.insertedId;
};

exports.getReviewDetail = async function (reviewID) {
  const db = getDBReference();
  const collection = db.collection('reviews');
  const result = await collection.find({ id: reviewID }).next();
  return result;
}

exports.updateReview = async function (reviewID, updatedReview) {
  const db = getDBReference();
  const collection = db.collection('reviews');
  const result = await collection.updateOne({ id: reviewID }, { $set: updatedReview });
  return result.result.n;
}

exports.removeReview = async function (reviewID) {
  const db = getDBReference();
  const collection = db.collection('reviews');
  const result = await collection.deleteOne({ id: reviewID });
}
