const productModel = require("../models/productModel");

//GET
const productController = {
  get: (req, res) => {
    return productModel
      .get()
      .then((result) => {
        return res.status(200).send({ message: "success", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error.message });
      });
  },

  // GET BY ID
  getDetail: (req, res) => {
    const request = {
      ...req.body,
      id: req.params.id,
    };
    return productModel
      .getDetail(request)
      .then((result) => {
        return res.status(201).send({ message: "success", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },

  //POST
  add: (req, res) => {
    return productModel.add(req.body).then((result) => {
      return res
        .status(201)
        .send({ message: "success", data: result })
        .catch((error) => {
          return res.status(500).send({ message: error });
        });
    });
  },

  // update: (req, res) => {},

  //PATCH
  update: (req, res) => {
    const request = {
      ...req.body,
      id: req.params.id,
    };
    return productModel
      .update(request)
      .then((result) => {
        return res.status(201).send({ message: "success", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },

  //DELETE
  remove: (req, res) => {
    const request = {
      ...req.body,
      id: req.params.id,
    };
    return productModel
      .remove(request)
      .then(() => {
        return res.status(201).send({ message: `success to delete data`, data: {} });
      })
      .catch((err) => {
        return res.status(500).send({ message: err.message });
      });
  },
};

module.exports = productController;
