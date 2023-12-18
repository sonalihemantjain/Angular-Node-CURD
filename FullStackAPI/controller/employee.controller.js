const { sql, poolPromise } = require("../database/db");
const fs = require("fs");
var rawdata = fs.readFileSync("./query/queries.json");
var queries = JSON.parse(rawdata);

class EmpController {
  async getAllData(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query(queries.getAllData);
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  async addNewEmp(req, res) {
    try {
      console.log("Variable value:", req.body);
      if (
        req.body.name != null &&
        req.body.employee_code != null &&
        req.body.salary != null
      ) {
        const pool = await poolPromise;

        const result = await pool
          .request()
          .input("name", sql.VarChar, req.body.name)
          .input("employee_code", sql.VarChar, req.body.employee_code)
          .input("salary", sql.Decimal, req.body.salary)
          .query(queries.addNewEmp);
        res.json(result);
      } else {
        res.send("Please fill all the details!");
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  async deleteEmp(req, res) {
    try {
      if (req.body.id != null) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input("id", sql.Int, req.body.id)
          .query(queries.deleteEmp);
        res.json(result);
      } else {
        res.send("Please fill all the details!");
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  async updateEmp(req, res) {
    try {
      if (req.body.name != null && req.body.id != null) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input("newName", sql.VarChar, req.body.name)
          .input("id", sql.Int, req.body.id)
          .query(queries.updateEmp);
        res.json(result);
      } else {
        res.send("All fields are required!");
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
}

const controller = new EmpController();
module.exports = controller;
