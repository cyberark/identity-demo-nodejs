var express = require('express');
var router = express.Router();
var utl = require('util');
var querystring = require('querystring');

/* User Operations */

router.get('/userinfo', (req,res,next) => {
	res.render('navbar2', {"content":{"user":req.session.user,"loginStatus":true,"action": 'userinfo',"sessionTokens":req.session.sessionTokens,"claims":req.session.claims}});
});

router.get('/response', (req,res,next) => {
	res.render('navbar2', {"content":{"user":req.session.user,"loginStatus":true,"action": 'response',"sessionTokens":req.session.sessionTokens,"claims":req.session.claims}});
});

router.get('/tokens', (req,res,next) => {
	res.render('navbar2', {"content":{"user":req.session.user,"loginStatus":true,"action": 'tokens',"sessionTokens":req.session.sessionTokens,"claims":req.session.claims}});
});

router.get('/claims', (req,res,next) => {
	res.render('navbar2', {"content":{"user":req.session.user,"loginStatus":true,"action": 'claims',"sessionTokens":req.session.sessionTokens,"claims":req.session.claims}});
});


module.exports = router;
