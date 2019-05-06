const { extractValidFields } = require('../lib/validation');
const { getDBReference } = require('../lib/mongo');

exports.getUserBusinesses = async function (userID) {
  const db = getDBReference();
  const collection = db.collection('businesses');
  const results = await collection.find({ ownerid: userID }).toArray();
  return results;
}

exports.getUserReviews = async function (userID) {
  const db = getDBReference();
  const collection = db.collection('reviews');
  const results = await collection.find({ userid: userID }).toArray();
  return results;
}

exports.getUserPhotos = async function (userID) {
  const db = getDBReference();
  const collection = db.collection('photos');
  const results = await collection.find({ userid: userID }).toArray();
  return results;
}
