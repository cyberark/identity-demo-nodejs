var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.redirect('/');
});

router.get('/', (req,res,next) => {
	var content = {};
	if(req.session.user || req.session.sessionTokens || req.session.claims) {
		res.render('navbar2', {"content":{"user":req.session.user,"loginStatus":false,"action":"login","sessionTokens":req.session.sessionTokens,"claims":req.session.claims}});
	}
	else {
		res.render('navbar2', {"content":null});
	}
});



module.exports = router;
