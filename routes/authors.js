const express = require('express')
const Authors = require('../models/author')

const router = express.Router(); 

// all Authors Route
router.get('/',(req,res) => {
    res.render('authors/index')
}
) ;

// New Authors Route
router.get('/new',(req,res) => {
    res.render('authors/new',{author : new Authors()})
}
);
// Create New Authors
router.post('/',(req,res) => {
    res.send(req.body.name)
}
);
module.exports = router;
    


