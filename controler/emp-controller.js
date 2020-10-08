const empmodel = require("../model/empmodel");

exports.getallemp = async (req, res, err) => {
  await empmodel
    .getAllEmp()

    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(err));
};

// creating a new employee record
exports.addempployee = async (req, res, err) => {
  let empData = req.body;
  await empmodel
    .addemp(empData)

    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(err));
};
// update updateEmployee

exports.updateEmployee = async (req, res) => {
  let empData = req.body;
  let id = req.params.id;

  await empmodel
    .updateemp(id, empData)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send(err));
};

exports.deleteEmpolyee = async (req, res) => {
  let empId = req.body.emp;
  // console.log(req.body.emp);

  await empmodel
    .deleteemp(empId)

    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send(err));
};
