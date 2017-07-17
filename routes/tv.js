var express = require('express');
var router = express.Router();
var YouTube = require('youtube-node');
var youTube = new YouTube();
youTube.setKey('AIzaSyAyO8ZM8hdQsTjhn-nfxYHLMAJ9cwGDZQg');

/* GET users listing. */
router.get('/', function(req, res, next) {
var YTresponse;
var realresult;


   youTube.search('G-eazy', 25, function(error, result) {
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
