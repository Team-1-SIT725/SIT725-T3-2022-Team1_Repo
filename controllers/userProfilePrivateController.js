const models = require("../models")
const myForm = models.userProfilePrivateModels.myForm
const path = require("path")


const addForm = async (req, res) => {
    // store variables for req
    let itemDesc = req.body.itemDesc
    let methodDesc = req.body.methodDesc

    //
    const newForm = new myForm({
        itemDesc: itemDesc,
        methodDesc: methodDesc

    })

    newForm
        .save()
        // .then(res.redirect("/login.html"))
        .then((result) => {
            res.json({
                statusCode: 200,
               // message: "Form successfully added",
                data: result,
            })
        })
        .catch((err) => {
            console.log("Error", err)
            res.json({ statusCode: 400, message: err })
        })
}

module.exports = { addForm, }