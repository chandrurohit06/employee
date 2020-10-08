const message = require("./message");

//validation for getting valid data from client
module.exports = (validator) => {
  return (req, res, next) => {
    // console.log(req.body);
    const { error } = validator(req.body);
    if (error) return res.status(400).send(message(error.details[0].message));
    next();
  };
};
