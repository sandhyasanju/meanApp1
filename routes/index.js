var express = require("express");
var router = express.Router();

//set route for home page
router.get("/", function(request, response, next) {
    response.render("index.html");
});

//EXPORTING THE MODULE TO USE IN ANOTHERMODULES
module.exports = router;