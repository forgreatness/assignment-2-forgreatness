const { extractValidFields } = require('../lib/validation');
const { getDBReference } = require('../lib/mongo');

/*
 * Schema describing required/optional fields of a photo object.
 */
exports.PhotoSchema = {
  userid: { required: true },
  businessid: { required: true },
  caption: { required: false }
};

exports.getNextAvailableID = async function () {
  const db = getDBReference();
  const collection = db.collection('photos');
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
  const result = await collection.aggregate(query).toArray();
  const nextAvailableID = result[0].maxID + 1;
  return nextAvailableID;
}

exports.insertNewPhoto = async function (photo) {
  // const lodgingToInsert = extractValidFields(lodging);
  const db = getDBReference();
  const collection = db.collection('photos');
  const result = await collection.insertOne(photo);
  return result.insertedId;
};

exports.getPhotoDetail = async function (photoID) {
  const db = getDBReference();
  const collection = db.collection('photos');
  const result = await collection.find({ id: photoID }).next();
  return result;
}

exports.updatePhoto = async function (photoID, updatedPhoto) {
  const db = getDBReference();
  const collection = db.collection('photos');
  const result = await collection.updateOne({ id: photoID }, { $set: updatedPhoto });
  return result.result.n;
}

exports.removePhoto = async function (photoID) {
  const db = getDBReference();
  const collection = db.collection('photos');
  const result = await collection.deleteOne({ id: photoID });
}
