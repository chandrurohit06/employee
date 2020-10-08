var db = require("../config/db");
var dbFunc = require("../config/db-function");
const joi = require("joi");

//fetching all empolyees from database

function getAllEmp() {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM emp ", (error, row) => {
      if (error) {
        dbFunc.connectionRelease;
        reject(error);
      } else {
        dbFunc.connectionRelease;
        resolve(row);
      }
    });
  });
}
//create new empolyee record
function addemp(emp) {
  console.log(emp.emp_name);
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO emp( name, email, mobile, location)VALUES('" +
        emp.emp_name +
        "','" +
        emp.emp_email +
        "','" +
        emp.emp_mobile +
        "','" +
        emp.emp_location +
        "')",
      (error, rows, fields) => {
        if (error) {
          dbFunc.connectionRelease;
          reject(error);
        } else {
          dbFunc.connectionRelease;
          resolve("successfully submitted");
        }
      }
    );
  });
}

//update existing empolyee record

function updateemp(id, emp) {
  console.log(emp);
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE emp set name='${emp.emp_name}', email='${emp.emp_email}',mobile='${emp.emp_mobile}',location='${emp.emp_location}' WHERE (id='${id}')`,
      (error, rows, fields) => {
        if (error) {
          dbFunc.connectionRelease;
          reject(res.status(400).send(error.message));
        } else {
          dbFunc.connectionRelease;
          resolve("updated successfully");
        }
      }
    );
  });
}

// /deleting employee record

function deleteemp(emp) {
  console.log(emp);
  return new Promise((resolve, reject) => {
    emp.map((e, index) => {
      db.query(`DELETE FROM emp WHERE id='${e.id}'`, (error, rows, fields) => {
        if (emp.length - 1 === index) {
          if (error) {
            dbFunc.connectionRelease;
            reject("rejected");
          } else {
            dbFunc.connectionRelease;
            resolve("Deleted successfully");
          }
        }
      });
    });
  });
}

// validation

const validators = (data) => {
  const schema = joi.object({
    emp_id: joi.number(),
    emp_name: joi.string().min(1).required(),
    emp_email: joi.string().email().min(1).required(),
    emp_mobile: joi.number().min(1).required(),
    emp_location: joi.string().min(1).required(),
  });

  return schema.validate(data);
};

// exporting functionality

const model = {
  getAllEmp: getAllEmp,
  addemp: addemp,
  updateemp: updateemp,
  deleteemp: deleteemp,
  validators: validators,
};
module.exports = model;
