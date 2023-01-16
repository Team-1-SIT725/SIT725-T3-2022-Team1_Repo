const models = require("../models")
// const Address = require("../models/addressVarificationModel")
const myForm = models.addressVarificationModel.Address
// const path = require("path")

const addForm = async (req, res) => {
   

    let address_line_1 = req.body.address_line_1
    let address_line_2 = req.body.address_line_2
    let suburb = req.body.suburb
    let city = req.body.city
    let postcode = req.body.postcode
    let image = req.file


    //
    const newForm = new myForm({
        address_line_1: address_line_1,
        address_line_2: address_line_2,
        suburb: suburb,
        city: city,
        postcode: postcode,
        // filePath: req.files.path,
        // originalFilename: req.files.originalname,
        // newFilename: req.files.filename,
        // fileSize: req.files.size,
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

module.exports = { addForm, }