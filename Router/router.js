const models = require("../model/empmodel");
const validate = require("../middleware/validate");
const controller = require("../controler/emp-controller");

// routers

const init = (router) => {
  router

    .route("/emp")
    .post(validate(models.validators), controller.addempployee)

    .get(controller.getallemp);

  router
    .route("/emp/:id")
    .put(validate(models.validators), controller.updateEmployee);
  router.route("/emp/delete").post(controller.deleteEmpolyee);
};

module.exports.init = init;
