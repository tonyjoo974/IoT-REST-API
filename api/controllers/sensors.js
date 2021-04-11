const mongoose = require('mongoose');
var moment = require('moment');
const _ = require('underscore');


const Sensor = require('../models/sensor');

exports.sensors_get_all = (req, res, next) => {
  // Sensor.find()
  //   .select('type value createdAt')
  //   .exec()
  //   .then(docs => {
  //           res.status(200).json({
  //             sensors: docs.map(doc => {
  //               return {
  //                   _id: doc._id,
  //                   sensor_type: doc.type,
  //                   value: doc.value,
  //                   time: doc.createdAt
  //                   //humidity: doc.humidity + "%"
  //                   //time: doc.time,
  //                   }
  //             })
  //           });
  //       })
  //   .catch(err => {
  //     res.status(500).json({
  //       error: err
  //     });
  //   });
  Sensor.find({'type': {$in : ['thermometer', 'hygrometer']}}).select('type value createdAt').exec(function(err, data){
    if(err) throw err;
    let sensorData  = _.groupBy(data, 'type')
    res.render('sensors', { thermosensors: sensorData.thermometer, hygrosensors: sensorData.hygrometer, moment: moment });
});
  // Sensor.find({'type': 'thermometer'}).select('type value createdAt').exec(function(err, data){
  //       if(err) throw err;
  //       res.render('sensors', { thermosensors: data, moment: moment });
  //   });

  // Sensor.find({}, (err, data) => {
  //   if(err) throw err;
  //   res.render('sensors', {sensors: data} );
  // });
}


exports.sensors_create_sensor = (req, res, next) => {
  // create sensor object
  const sensor = new Sensor({
    _id: new mongoose.Types.ObjectId(),
    // you dont new to add _id, Mongoose adds it by default
    type: req.body.type,
    value: req.body.value
  });
  //save it
  sensor
  .save()
  .then(result => {
    console.log(result);
    res.status(201).json({
      message: 'Created sensor data successfully',
      createdSensor_data: result._doc // you can access the data on the _doc property
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
        error: err
    });
  });
}

exports.sensors_delete_all = (req, res, next) => {
    Sensor.remove({})
    .exec()
    .then(result => {
        res.status(200).json({
          message: 'All sensor data deleted'
      });
    })
    .catch(err => {
          res.status(500).json({
          error: err
        });
    });
}

exports.sensors_delete_sensor = (req, res, next) => {
    Sensor.remove({ _id: req.params.sensorId })
    .exec()
    .then(result => {
        res.status(200).json({
          message: 'Sensor data deleted'
      });
    })
    .catch(err => {
          res.status(500).json({
          error: err
        });
    });
}

//
// exports.sensors_get_sensor = (req, res, next) => {
//     Order.findById(req.params.orderId)
//     .populate('product')
//     .exec()
//     .then(order => {
//       if (!order) {
//           return res.status(404).json({
//               message: 'Order not found'
//           });
//       }
//         res.status(200).json({
//             order: order,
//             request: {
//                 type: 'GET',
//                 url: 'http://localhost:3000/orders'
//             }
//         });
//     })
//     .catch(err => {
//         res.status(500).json({
//           error: err
//         });
//     });
// }
//
// exports.sensors_update_sensor = (req, res, next) => {
//     Order.remove({ _id: req.params.orderId })
//     .exec()
//     .then(result => {
//         res.status(200).json({
//           message: 'Order deleted',
//           request: {
//               type: 'POST',
//               url: 'http://localhost:3000/orders',
//               body: { productId: 'ID', quantity: "Number"}
//           }
//       });
//     })
//     .catch(err => {
//           res.status(500).json({
//           error: err
//         });
//     });
// }
