const productModel = require("../models/productModel");
const formResponse = require("../../helper/form-response")
const { unlink } = require("node:fs");
// const { Console } = require("node:console");

//GET
const productController = {
  get: (req, res) => {
    return productModel
      .get(req.query)
      .then((result) => {
        //error handling
        if (result == "") return res.status(401).send({ message: "Not Found." });
        return res.status(200).send({ message: "success", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error.message });
      });
  },

  // GET BY ID
  getDetail: (req, res) => {
    const id = req.params.id;
    return productModel
      .getDetail(id)
      .then((result) => {
        if (result != undefined) {
          // if (result != null) {
          return formResponse(
            200,
            result,
            "Get data product by id success",
            res
          );
        } else {
          return formResponse(400, { result }, "Products id not found", res);
        }
      })
      .catch((error, result) => {
        return formResponse(500, { result }, error, res);
      });
  },

  //POST
  add: (req, res) => {
    const request = {
      ...req.body,
      file: req.files,
    };
    return productModel
      .add(request)
      .then((result) => {
        return res.status(201).send({ message: "success", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },

  //PATCH
  update: (req, res) => {
    const request = {
      ...req.body,
      id: req.params.id,
      file: req.files
    }
    console.log(request);
    return productModel.update(request)
      .then((result) => {
        if (typeof result.oldImages != "undefined") {
          for (let index = 0; index < result.oldImages.length; index++) {
            console.log(result.oldImages[index].filename)
            unlink(`public/uploads/images/${result.oldImages[index].filename}`, () => {
              console.log(`successfully deleted ${result.oldImages[index].filename}`)
            });
          }
        }
        return res.status(201).send({ message: "succes", data: result })
        // return formResponse(201, "success", result, res)
      }).catch((error) => {
        return res.status(500).send({ message: error })
        // return formResponse(500, error)
      })
  },

  //DELETE
  remove: (req, res) => {
    const id = req.params.id;
    return productModel
      .remove(id)
      .then((result) => {
        for (let index = 0; index < result.length; index++) {
          // console.log(result.rows[0].filename);
          unlink(`/public/uploads/images/${result[index].filename}`, (err) => {
            console.log(result[index].filename);
            if (err) throw err;
            console.log(`successfuly deleted ${result[index].filename}`);
          });
        }
        return res.status(201).send({ message: `success to delete data`, data: result });
      })
      .catch((err) => {
        return res.status(500).send({ message: err });
      });
  },
};

module.exports = productController;
