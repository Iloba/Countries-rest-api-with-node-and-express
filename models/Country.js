const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');



const countrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, 'Name must be at least 3 characters long got {VALUE}'],
        maxlength: [50, 'Name must be at most 50 characters long'],
        unique: true,
    },

    abbr: {
        type: String,
        required: true
    },

    capital: {
        type: String,
        required: true
    },

    continent: {
        type: String,
        required: true
    },

    date_of_independence: {
        type: Date,
        required: true
    },

    population: {
        type: Number,
        required: true
    },

    name_of_president: {
        type: String,
        required: true
    },

    created_at: {
        type: Date,
        default: Date.now
    }
});

countrySchema.plugin(mongoosePaginate);
const Country = mongoose.model('Country', countrySchema);

module.exports = Country;





// const userSchema = new Schema({
//     username: {
//         type: String,
//         required: [true, 'Username is required'],
//         minlength: [3, 'Username must be at least 3 characters long'],
//         maxlength: [20, 'Username must be at most 20 characters long']
//     },
//     email: {
//         type: String,
//         required: [true, 'Email is required'],
//         match: [/.+\@.+\..+/, 'Please fill a valid email address']
//     },
//     age: {
//         type: Number,
//         min: [18, 'Age must be at least 18'],
//         max: [65, 'Age must be at most 65']
//     },
//     status: {
//         type: String,
//         enum: {
//             values: ['active', 'inactive'],
//             message: 'Status must be either active or inactive'
//         }
//     },
//     website: {
//         type: String,
//         validate: {
//             validator: function(v) {
//                 return /^(https?:\/\/)?([\w\d\-]+\.){1,3}[a-zA-Z]{2,6}(\/)?$/.test(v);
//             },
//             message: props => `${props.value} is not a valid URL`
//         }
//     }
// });