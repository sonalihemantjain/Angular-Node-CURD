const express =  require('express');
const controller = require('../controller/employee.controller')

const router = express.Router();
router.get('/api/getAllData', controller.getAllData);
router.post('/api/addNewEmp', controller.addNewEmp);
router.delete('/api/deleteEmp', controller.deleteEmp);
router.delete('/api/updateEmp', controller.updateEmp);


module.exports = router;