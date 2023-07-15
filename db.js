const {MongoClient }= require('mongodb')

let dbconnection
module.exports = {
    connectToDb : (cb)=>{
        MongoClient.connect('mongodb://0.0.0.0:27017/BookStore')
        .then((client) => {
             dbconnection =client.db()
             return cb()
        })
        .catch(err => {
            console.log(err);
            return cb(err)
        })
    },
    getDb:() => dbconnection
}