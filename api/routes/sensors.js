const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const SensorsController = require('../controllers/sensors');

// Get all the sensors
router.get('/', SensorsController.sensors_get_all);
// Create a sensor data
router.post('/', checkAuth, SensorsController.sensors_create_sensor);
// Delete all sensor data
router.delete('/', checkAuth, SensorsController.sensors_delete_all);
// Delete a sensor data
router.delete('/:sensorId', checkAuth, SensorsController.sensors_delete_sensor);

// Get a sensor data
// router.get('/:sensorId', SensorsController.sensors_get_sensor);
// Update sensor data
// router.patch('/:sensorId', SensorsController.sensors_update_sensor);

module.exports = router;
