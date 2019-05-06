const router = require('express').Router();
const bodyParser = require('body-parser');
const { getUserBusinesses, getUserReviews, getUserPhotos } = require('../models/user.js');

router.use(bodyParser.json());

exports.router = router;

/*
 * Route to list all of a user's businesses.
 */
router.get('/:userid/businesses', async function (req, res) {
  const userid = parseInt(req.params.userid);
  try {
    const userBusinesses = await getUserBusinesses(userid);
    if (userBusinesses) {
      res.status(200).send({
        businesses: userBusinesses
      });
    } else {
      res.status(404).send({
        err: "Resource is not found"
      });
    }
  } catch (err) {
    res.status(500).send({
      error: "Error fetching user businesses. Try again later."
    });
  }
});

/*
 * Route to list all of a user's reviews.
 */
router.get('/:userid/reviews', async function (req, res) {
  const userid = parseInt(req.params.userid);
  try {
    const userReviews = await getUserReviews(userid);
    if (userReviews) {
      res.status(200).send({
        reviews: userReviews
      });
    } else {
      res.status(404).send({
        err: "Resource is not found"
      });
    }
  } catch (err) {
    res.status(500).send({
      error: "Error fetching user reviews. Try again later."
    });
  }
});

/*
 * Route to list all of a user's photos.
 */
router.get('/:userid/photos', async function (req, res) {
  const userid = parseInt(req.params.userid);
  try {
    const userPhotos = await getUserPhotos(userid);
    if (userPhotos) {
      res.status(200).send({
        photos: userPhotos
      });
    } else {
      res.status(404).send({
        err: "Resource is not found"
      });
    }
  } catch (err) {
    res.status(500).send({
      error: "Error fetching user photos. Try again later."
    });
  }
});
