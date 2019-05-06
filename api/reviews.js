const router = require('express').Router();
const bodyParser = require('body-parser');

const validation = require('../lib/validation');
const { ReviewSchema, getAllReviews, getNextAvailableID, insertNewReview, getReviewDetail, updateReview, removeReview } = require('../models/review.js');

router.use(bodyParser.json());

exports.router = router;

/*
 * Route to create a new review.
 */
router.post('/', async function (req, res, next) {
  if (validation.validateAgainstSchema(req.body, ReviewSchema)) {
    const review = validation.extractValidFields(req.body, ReviewSchema);
    const reviews = await getAllReviews();

    /*
     * Make sure the user is not trying to review the same business twice.
     */
    const userReviewedThisBusinessAlready = reviews.some(
      existingReview => existingReview
        && existingReview.userid === review.userid
        && existingReview.businessid === review.businessid
    );

    if (userReviewedThisBusinessAlready) {
      res.status(403).send({
        error: "User has already posted a review of this business"
      });
    } else {
      review.id = await getNextAvailableID();
      try {
        const id = await insertNewReview(review);
        res.status(201).send({
          id: review.id,
          links: {
            review: `/reviews/${review.id}`,
            business: `/businesses/${review.businessid}`
          }
        });
      } catch (err) {
        console.error(err);
        res.status(500).send({
          error: "Failed to insert review. Try again later."
        });
      }
    }
  } else {
    res.status(400).send({
      error: "Request body is not a valid review object"
    });
  }
});

/*
 * Route to fetch info about a specific review.
 */
router.get('/:reviewID', async function (req, res, next) {
  const reviewID = parseInt(req.params.reviewID);
  try {
    const reviewDetail = await getReviewDetail(reviewID);
    if (reviewDetail) {
      res.status(200).send(reviewDetail);
    } else {
      res.status(404).send({
        err: "Resource is not found"
      });
    }
  } catch (err) {
    res.status(500).send({
      error: "Error fetching detail. Try again later."
    });
  }
});

/*
 * Route to update a review.
 */
router.put('/:reviewID', async function (req, res, next) {
  const reviewID = parseInt(req.params.reviewID);
  if (validation.validateAgainstSchema(req.body, ReviewSchema)) {
    /*
     * Make sure the updated review has the same businessid and userid as
     * the existing review.
     */
    let updatedReview = validation.extractValidFields(req.body, ReviewSchema);
    let existingReview = await getReviewDetail(reviewID);
    if (updatedReview.businessid === existingReview.businessid && updatedReview.userid === existingReview.userid) {
      updatedReview.id = reviewID;
      try {
        const nModified = await updateReview(reviewID, updatedReview);
        res.status(200).send({
          nModified: nModified,
          links: {
            photo: `/photos/${reviewID}`,
            business: `/businesses/${updatedReview.businessid}`
          }
        });
      } catch (err) {
        console.error(err);
        res.status(500).send({
          error: "Failed to update review. Try again later."
        });
      }
    } else {
      res.status(403).send({
        error: "Updated review must have the same businessid and userid"
      });
    }
  } else {
    res.status(400).send({
      error: "Request body is not a valid review object"
    });
  }
});

/*
 * Route to delete a review.
 */
router.delete('/:reviewID', async function (req, res, next) {
  const reviewID = parseInt(req.params.reviewID);
  try {
    const acknowledged = await removeReview(reviewID);
    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(500).send({
      error: "Failed to delete review. Try again later."
    });
  }
});
