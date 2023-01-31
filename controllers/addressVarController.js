const models = require("../models")
const alert = require("alert")
// const Address = require("../models/addressVarificationModel")
const myForm = models.addressVarificationModel.Address
// const path = require("path")

const addForm = async (req, res) => {


    let address_line_1 = req.body.address_line_1
    let address_line_2 = req.body.address_line_2
    let suburb = req.body.suburb
    let city = req.body.city
    let postcode = req.body.postcode

    if (req.file == undefined) {
        alert("Need to upload a file")
    }
    let newForm;
    //
    try {
        newForm = new myForm({
            address_line_1: address_line_1,
            address_line_2: address_line_2,
            suburb: suburb,
            city: city,
            postcode: postcode,
            filePath: req.file.path,
            originalFilename: req.file.originalname,
            newFilename: req.file.filename,
            fileSize: req.file.size,
        })


        newForm
            .save()
            .then((result) => {
                res.json({
                    statusCode: 200,
                    message: "Form successfully added",
                    data: result,
                })
            }).catch((err) => {
                console.log("Error", err)
                res.json({ statusCode: 400, message: err })
            })
    }
    catch (err) {
        console.log("Error", err)
        res.json({ statusCode: 400, message: err })
    }
}

module.exports = { addForm, }