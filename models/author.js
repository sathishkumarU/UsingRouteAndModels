const {mongoose,model} = require("mongoose")

const aurthorSchema = new mongoose.Schema({
    name :
    {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('Author',aurthorSchema)