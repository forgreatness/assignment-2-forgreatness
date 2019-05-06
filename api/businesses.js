const router = require('express').Router();
const bodyParser = require('body-parser');

const validation = require('../lib/validation');
const { BusinessSchema, getNextAvailableID, getBusinessPage, insertNewBusiness, getBusinessDetail, updateBusiness, removeBusiness } = require('../models/business.js');

router.use(bodyParser.json());

exports.router = router;

/*
 * Route to return a list of businesses.
 */
router.get('/', async function (req, res) {
  try {
    const businessesPage = await getBusinessPage(parseInt(req.query.page) || 1);
    res.status(200).send(businessesPage);
  } catch (err) {
    res.status(500).send({
      error: "Error fetching businesses. Try again later."
    });
  }
});

/*
 * Route to create a new business.
 */
router.post('/', async function (req, res, next) {
  if (validation.validateAgainstSchema(req.body, BusinessSchema)) {
    const business = validation.extractValidFields(req.body, BusinessSchema);
    business.id = await getNextAvailableID();
    try {
      const id = await insertNewBusiness(business);
      res.status(201).send({
        id: business.id,
        links: {
          business: `/businesses/${business.id}`
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        error: "Failed to insert business. Try again later."
      });
    }
  } else {
    res.status(400).send({
      err: "Request body does not contain a valid Business."
    });
  }
});

/*
 * Route to fetch info about a specific business.
 */
 router.get('/:businessid', async function (req, res, next) {
   const businessid = parseInt(req.params.businessid);
   try {
     const businessDetail = await getBusinessDetail(businessid);
     res.status(200).send(businessDetail);
   } catch (err) {
     res.status(500).send({
       error: "Error getting business detail. Try again later."
     });
   }
 });

/*
 * Route to replace data for a business.
 */
router.put('/:businessid', async function (req, res, next) {
  const businessid = parseInt(req.params.businessid);
  if (validation.validateAgainstSchema(req.body, BusinessSchema)) {
    business = validation.extractValidFields(req.body, BusinessSchema);
    business.id = businessid;
    try {
      const nModified = await updateBusiness(businessid, business);
      res.status(200).send({
        nModified: nModified,
        links: {
          business: `/businesses/${businessid}`
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        error: "Failed to update business. Try again later."
      });
    }
  } else {
    res.status(400).send({
      err: "Request body does not contain a valid Business."
    });
  }
});

/*
 * Route to delete a business.
 */
router.delete('/:businessid', async function (req, res, next) {
  const businessid = parseInt(req.params.businessid);
  try {
    const result = await removeBusiness(businessid);
    res.status(204).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      error: "Failed to delete business. Try again later."
    });
  }
});
