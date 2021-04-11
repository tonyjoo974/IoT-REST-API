// const mongoose = require('mongoose');
//
// const sensorSchema = new mongoose.Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     sensor_type: {type: String, ref: 'Hygro'},
//     sensor_type: {type: String, ref: 'Thermo'},
//     //time : { type : Date, default: Date.now },
//     temperature: {type: Number, ref: 'Thermo'},
//     humidity: {type: Number, ref: 'Hygro'}
// });
//
// module.exports = mongoose.model('Sensor', sensorSchema);

const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type: {
      type: String,
      required: true,
      enum: ['hygrometer', 'thermometer']
    },
    //time : { type : Date, default: Date.now },
    // for the time I use mongoose built in { timestamps: true }
    // temperature: {type: Number},
    // humidity: {type: Number}
    // store value instead. if it's type 'Hydro' you know it's humidity
    value: {
      type: Number,
      required: true
    }
}, { timestamps: true } );
// timestamps: true gives you createdAt and updatedAt automatically

module.exports = mongoose.model('Sensor', sensorSchema);
