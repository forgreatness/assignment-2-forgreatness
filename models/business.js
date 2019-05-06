const { extractValidFields } = require('../lib/validation');
const { getDBReference } = require('../lib/mongo');

exports.BusinessSchema = {
  ownerid: { required: true },
  name: { required: true },
  address: { required: true },
  city: { required: true },
  state: { required: true },
  zip: { required: true },
  phone: { required: true },
  category: { required: true },
  subcategory: { required: true },
  website: { required: false },
  email: { required: false }
};

exports.getNextAvailableID = async function () {
  const db = getDBReference();
  const collection = db.collection('businesses');
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

exports.getBusinessPage = async function (page) {
  const db = getDBReference();
  const collection = db.collection('businesses');
  const count = await collection.countDocuments();

  const pageSize = 10;
  const lastPage = Math.ceil(count / pageSize);
  page = page < 1 ? 1 : page;
  page = page > lastPage ? lastPage : page;
  const offset = (page - 1) * pageSize;

  const results = await collection.find({})
    .sort({ _id: 1 })
    .skip(offset)
    .limit(pageSize)
    .toArray();

  return {
    businesses: results,
    page: page,
    totalPages: lastPage,
    pageSize: pageSize,
    count: count
  };
};

exports.insertNewBusiness = async function (business) {
  // const lodgingToInsert = extractValidFields(lodging);
  const db = getDBReference();
  const collection = db.collection('businesses');
  const result = await collection.insertOne(business);
  return result.insertedId;
};

exports.getBusinessDetail = async function (businessID) {
  const db = getDBReference();
  const collection = db.collection('businesses');
  const query = [
    {
      $match:{"id": businessID }
    },
    {
      $lookup:
      {
        from: "reviews",
        localField: "id",
        foreignField: "businessid",
        as: "reviews"
      }
    },
    {
      $lookup:
      {
        from: "photos",
        localField: "id",
        foreignField: "businessid",
        as: "photos"
      }
    }
  ];
  const result = await collection.aggregate(query).toArray();
  return result;
}

exports.updateBusiness = async function (businessId, updatedDetail) {
  const db = getDBReference();
  const collection = db.collection('businesses');
  const result = await collection.updateOne({ id: businessId }, { $set: updatedDetail });
  return result.nModified;
}

exports.removeBusiness = async function (businessID) {
  const db = getDBReference();
  const businessCollection = db.collection('businesses');
  const reviewCollection = db.collection('reviews');
  const photoCollection = db.collection('photos');
  const removedBusinessResult = await businessCollection.deleteOne({ id: businessID });
  const removedPhotosResult = await photoCollection.deleteMany({ businessid: businessID });
  const removedReviewsResult = await reviewCollection.deleteMany({ businessid: businessID });

  const result = {
    removed: removedBusinessResult.result.n,
    businessPhotosRemoved: removedPhotosResult.result.n,
    businessReviewsRemoved: removedReviewsResult.result.n
  };

  return result;
}
