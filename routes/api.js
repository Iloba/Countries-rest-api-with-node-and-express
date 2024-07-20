const express = require('express');
const { createANewCountry, getAllCountries, getASpecificCountry, updateACountry, deleteACountry } = require('../controllers/countriesController');
const tryCatch = require('../utils/tryCatch');

const router = express.Router();

//define my routes
router.post('/', tryCatch(createANewCountry));  //post
router.get('/', tryCatch(getAllCountries)); //get
router.get('/:id', tryCatch(getASpecificCountry)); //get
router.patch('/:id', tryCatch(updateACountry)); //patch
router.delete('/:id', tryCatch(deleteACountry)); //delete



module.exports = router;