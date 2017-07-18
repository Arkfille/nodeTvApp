var express = require('express');
var router = express.Router();
var YouTube = require('youtube-node');
var youTube = new YouTube();
youTube.setKey('AIzaSyAyO8ZM8hdQsTjhn-nfxYHLMAJ9cwGDZQg');
youTube.addParam('type', 'video');
/* GET users listing. */
router.get('/', function(req, res, next) {
var YTresponse;
var realresult;
var searchquery = "Vevo"
  if(req.query.search){
    console.log(req.query.search);
     searchquery = req.query.search;
  }

   youTube.search(searchquery, 24, function(error, result) {
    if (error) {
      console.log(error);
    } 
    else {
      YTresponse = JSON.stringify(result, null, 1);
      realresult = result;
      
    }
    renderView();
  });

  function renderView() {
       res.render('tv', {data: realresult});
}
});

module.exports = router;
