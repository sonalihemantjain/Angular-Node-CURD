const express =  require('express');
const controller = require('../controller/employee.controller')

const router = express.Router();
router.get('/api/getAllData', controller.getAllData);
router.post('/api/addNewEmp', controller.addNewEmp);
router.delete('/api/deleteEmp', controller.deleteEmp);
router.put('/api/updateEmp', controller.updateEmp);
router.get('/api/getAllDataWithSp', controller.getAllDataWithSp);

module.exports = router;