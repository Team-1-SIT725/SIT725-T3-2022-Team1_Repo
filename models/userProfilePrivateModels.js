const mongoose = require("mongoose")

const formSchema = mongoose.Schema({
    itemDesc: {
        type: String,
        requre: true,
    },
    methodDesc: {
        type: String,
        requre: true,
    },
})

const myForm = mongoose.model("myForm", formSchema)
module.exports = {
    myForm,
}
