const logger = (data) => (req, res, next) => {
  console.log(data);
  next();
};

module.exports = logger;
