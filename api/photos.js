const router = require('express').Router();
const bodyParser = require('body-parser');

const validation = require('../lib/validation');
const { PhotoSchema, getNextAvailableID, insertNewPhoto, getPhotoDetail, updatePhoto, removePhoto } = require('../models/photo.js');

router.use(bodyParser.json());

exports.router = router;

/*
 * Route to create a new photo.
 */
router.post('/', async function (req, res, next) {
  if (validation.validateAgainstSchema(req.body, PhotoSchema)) {
    const photo = validation.extractValidFields(req.body, PhotoSchema);
    photo.id = await getNextAvailableID();
    try {
      const id = await insertNewPhoto(photo);
      res.status(201).send({
        id: photo.id,
        links: {
          photo: `/photos/${photo.id}`,
          business: `/businesses/${photo.businessid}`
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        error: "Failed to insert photo. Try again later."
      });
    }
  } else {
    res.status(400).send({
      err: "Request body does not contain a valid photo."
    });
  }
});

/*
 * Route to fetch info about a specific photo.
 */
router.get('/:photoID', async function (req, res, next) {
  const photoID = parseInt(req.params.photoID);
  try {
    const photoDetail = await getPhotoDetail(photoID);
    if (photoDetail) {
      res.status(200).send(photoDetail);
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
 * Route to update a photo.
 */
router.put('/:photoID', async function (req, res, next) {
  const photoID = parseInt(req.params.photoID);
  if (validation.validateAgainstSchema(req.body, PhotoSchema)) {
    /*
     * Make sure the updated photo has the same businessid and userid as
     * the existing photo.
     */
    const updatedPhoto = validation.extractValidFields(req.body, PhotoSchema);
    const existingPhoto = await getPhotoDetail(photoID);
    if (existingPhoto && updatedPhoto.businessid === existingPhoto.businessid && updatedPhoto.userid === existingPhoto.userid) {
      updatedPhoto.id = photoID;
      try {
        const nModified = await updatePhoto(photoID, updatedPhoto);
        res.status(200).send({
          nModified: nModified,
          links: {
            photo: `/photos/${photoID}`,
            business: `/businesses/${updatedPhoto.businessid}`
          }
        });
      } catch (err) {
        console.error(err);
        res.status(500).send({
          error: "Failed to update photo. Try again later."
        });
      }
    } else {
      res.status(403).send({
        error: "Updated photo must have the same businessid and userid"
      });
    }
  } else {
    res.status(400).send({
      error: "Request body is not a valid photo object"
    });
  }
});

/*
 * Route to delete a photo.
 */
router.delete('/:photoID', async function (req, res, next) {
  const photoID = parseInt(req.params.photoID);
  try {
    const acknowledged = await removePhoto(photoID);
    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(500).send({
      error: "Failed to delete photo. Try again later."
    });
  }
});
