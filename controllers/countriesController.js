const Joi = require('joi');
const Country = require('../models/Country');
const createANewCountry = async (req, res, next) => {

    //set validation rules (JOI)
    const countrySchema = Joi.object({
        'name': Joi.string().required(),
        'abbr': Joi.string().required(),
        'capital': Joi.string().required(),
        'continent': Joi.string().required(),
        'date_of_independence': Joi.string().required(),
        'population': Joi.number().integer(),
        'name_of_president': Joi.string().required(),
    });


    const { error, value } = countrySchema.validate(req.body, { abortEarly: false });

    if (error) {
        console.log(error);
        throw new Error(error);
    }

    const country = await Country.create(value);

    if (!country) {
        throw new Error("Something went wrong, could not add country");
    }

    const result = {
        message: 'Created Country!',
        data: country
    };

    res.status(201).json(result);

}

// const getAllCountries = async (req, res, next) => {


//     const search = req.query.search;
//     const continent = req.query.continent;
//     const start_with = req.query.starts_with;



//     if (search) {
//         const countries = await Country.find().where('name').equals(search);

//         if (countries.length === 0) {
//             return res.status(404).json({
//                 'message': `No Country with name ${search} found`
//             });
//         }

//         const result = {
//             message: 'Success!',
//             countries: countries
//         };

//         return res.status(200).json(result);
//     }


//     if (continent) {
//         const countries = await Country.find().where('continent').equals(continent);


//         if (countries.length === 0) {
//             return res.status(404).json({
//                 'message': `No Country in ${continent} found`
//             });
//         }

//         const result = {
//             message: 'Success!',
//             countries: countries
//         };

//         return res.status(200).json(result);

//     }

//     if (start_with) {
//         const countries = await Country.find({ name: new RegExp(`^${start_with}`, 'i') });

//         if (countries.length === 0) {
//             return res.status(404).json({
//                 'message': `No Country with name that starts with ${start_with} found`
//             });
//         }

//         const result = {
//             message: 'Success!',
//             countries: countries
//         };

//         return res.status(200).json(result);
//     }

//     const page = 1;
//     const limit = 10;



//     Country.paginate({}, { page, limit }).then(function (result) {
//         const { docs, totalDocs, limit, page, totalPages } = result;
//         res.status(200).json(
//             {
//                 countries: docs, totalDocs, limit, page, totalPages
//             });
//     });
// }
const getAllCountries = async (req, res, next) => {

    const { search, continent, starts_with, page = 1, limit = 10 } = req.query;

    let query = {};

    if (search) {
        query.name = search;
    } else if (continent) {
        query.continent = continent;
    } else if (starts_with) {
        query.name = new RegExp(`^${starts_with}`, 'i');
    }
    console.log('Query object:', query);

    // If there is a search criteria, use it to find countries
    if (Object.keys(query).length) {
        const countries = await Country.find(query);
        const totalDocs = await Country.countDocuments(query);

        if (countries.length === 0) {
            return res.status(404).json({
                message: `No Country ${search ? `with name ${search}` :
                    continent ? `in ${continent}` :
                        `with name that starts with ${starts_with}`} found`
            });
        }

        return res.status(200).json({
            message: 'countries',
            countries,
            totalDocs
        });
    }

    // If no search criteria, paginate all countries
    const result = await Country.paginate({}, { page, limit });

    if (result.docs.length === 0) {
        return res.status(404).json({
            message: 'No Country Found'
        });
    }

    const { docs, totalDocs, totalPages } = result;

    return res.status(200).json({
        message: 'Countries Found',
        countries: docs,
        totalDocs,
        limit,
        page,
        totalPages
    });


};


const getASpecificCountry = async (req, res, next) => {
    const countryId = req.params.id;

    const country = await Country.findById(countryId);

    if (!country) {
        throw new Error("Cannot find country");
    }

    res.status(200).json(country);
}

const updateACountry = async (req, res, next) => {

    const countryId = req.params.id;

    const reqBody = req.body;

    const country = await Country.findById(countryId);

    if (!country) {
        throw new Error(`Could not find country with id ${countryId}`);
    }

    Object.keys(reqBody).forEach(key => {
        country[key] = reqBody[key];
    });

    const result = await country.save();

    if (!result) {
        throw new Error("Something went wrong, could not update country");
    }
    res.status(200).json({
        "message": "Update Successsful",
        "data": result
    });

}

const deleteACountry = async (req, res, next) => {
    const countryId = req.params.id;

    const country = await Country.findByIdAndDelete(countryId);

    if (!country) {
        throw new Error("Could not find Country");
    }

    res.status(200).json({
        message: `${country.name} deleted successfully`,
    });
}




module.exports = {
    createANewCountry,
    getAllCountries,
    getASpecificCountry,
    updateACountry,
    deleteACountry
}