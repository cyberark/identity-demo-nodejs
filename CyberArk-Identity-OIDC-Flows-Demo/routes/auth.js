const https = require('https')
var express = require('express');
var router = express.Router();

const HttpRequestTimeOut = 60000;//60 secs
const PollIntervalInMs = 2000;
const PollTimeOutInMs = 120000;

var integer = 0;
router.get('/', (req,res,next) => {
  res.render('customerlogin',{"action":"customerLogin"});
});

router.get('/userLogin', (req,res,next) => {
  res.render('customerlogin',{"action":"customerLogin"});
});


router.post('/startAuth', (req,res,next) => {
  const data = JSON.stringify({
   TenantId: res.locals.tenantId,
   User: req.body.username,
   Version: "1.0"                
 });
  var resp = restRequest('POST', res.locals.tenantFqdn,'/security/StartAuthentication', data, null)
  .then((resp) => {
    if(resp) {
      PrepareSession(req, resp);
      res.redirect('/auth/RedirectToNextState');
    }
  }).catch((error) => {
    res.render("customerror", {"error":error,"error_description":""});
  });
});

router.post('/advanceAuth', (req,res,next) => {
  var inputAnswer = req.body.answer ? req.body.answer : null;
  const data = JSON.stringify({
    TenantId: res.locals.tenantFqdn,
    SessionId: req.session.SessionId,
    MechanismId: req.session.CurrentMechanismId,
    Action: "Answer",
    Answer: inputAnswer        
  });
  restRequest('POST', res.locals.tenantFqdn, '/security/AdvanceAuthentication', data, null)
  .then((resp) => {
    PrepareSession(req, resp);
    res.redirect('/auth/RedirectToNextState');
  }).catch((error) => 
  {
    res.render("customerror", {"error":error,"error_description":""});
  });
});

function Poll(tenantFqdn, sessionId, mechanismId, action, pollInterval, endTime, callback) {
  var data = JSON.stringify({
    TenantId: tenantFqdn,
    SessionId: sessionId,
    MechanismId: mechanismId,
    Action: action    
  });

  restRequest('POST', tenantFqdn, '/security/AdvanceAuthentication', data, null)
  .then((resp) => {
        if(resp.Result.Summary == 'OobPending' && Date.now() < endTime) {//OOB pending cases
          setTimeout(() => {
            data.Action = 'Poll';
          Poll(tenantFqdn, sessionId, mechanismId, "Poll", pollInterval, endTime, callback);
          }, pollInterval);
        } 
        else {
          callback(resp, null);
        }
    })
  }

  const restRequest = function (requestMethod, tenantFqdn, path, data, customHeaders) {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: tenantFqdn,
        port: 443,
        path: path,
        method: requestMethod,
        headers: { ...(customHeaders != null) && customHeaders,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: HttpRequestTimeOut
      };

      const request = https.request(options, response => {
        response.on('data', d => {
          resp = JSON.parse(d.toString());
        });

        response.on('end', function() {
          var package = resp
            resolve(package);
          });
      });

      request.on('error', error => {
        console.error(error);
        reject(error);
      });
      if(requestMethod != 'GET') {
        request.write(data);
      }
      request.end();
    });
  }

  router.get('/RedirectToNextState', (req, res, next) => {
    var state = null;
    if(req.query.state) {
      state = req.query.state;
    }
    else {
      state = req.session.CurrentState;
    }

    if(state == "Error") {//If failure occured
      res.render("customerror", {"error":req.session.Error,"error_description":req.session.ErrorMessage});
    }
    else if(state == "NewPackage") {//new package)
      res.redirect('/auth/showmech');
    }
    else if(state == "StartNextChallenge") {
      if(req.session.Challenges.length > 1) {
        req.session.Mechanisms = req.session.Challenges[1].Mechanisms;
      }
      res.redirect('/auth/showmech');
    }
    else if(state == "LoginSuccess") {//FINAL response
      var authToken = null;
      if(req.query.Auth) {
        authToken = req.query.Auth;
      }
      else {
        authToken = req.session.AuthToken;
      }
      res.redirect(res.locals.resourceUrlPath+"?Auth="+authToken);
    }
  });

  function PrepareSession(req, package) {
      if(package.success == false) {//If failure occured
        //error
        req.session.CurrentState = "Error";
        req.session.Error = package.Result.Summary;
        req.session.ErrorMessage = package.Message;
      }
      else if(package.Result.Summary == "NewPackage") {//new package
        req.session.CurrentState = package.Result.Summary;
        if(package.Result.Challenges && package.Result.Challenges.length > 0) {
            req.session.SessionId = package.Result.SessionId;
            req.session.Challenges = package.Result.Challenges;
            req.session.Mechanisms = req.session.Challenges[0].Mechanisms;
        }
      }
      else if(package.Result.Summary == "StartNextChallenge") {
        req.session.CurrentState = package.Result.Summary;
      }
      else if(package.Result.Summary == "LoginSuccess"){
        req.session.CurrentState = package.Result.Summary;
        req.session.AuthToken = package.Result.Auth;
      }
    }

    router.get('/showmech', (req, res, next) => {
      res.locals.Mechanisms = req.session.Mechanisms;
      res.locals.SessionId = req.session.SessionId;
      res.render("customerlogin",{"action":"mechanisms"});
    });

    router.post('/pollOOB', (req,res,next) => {
      Poll(req.body.TenantId,req.body.SessionId, req.body.MechanismId, req.body.Action, PollIntervalInMs, Date.now()+PollTimeOutInMs,
        function(resp, error) {
          if(error) {
            res.send({"success":false,"result":error}); 
          }
          else {
            if(resp.success == true) {
              if(resp.Result.Auth) {
                res.send({"success":true,"result":resp.Result.Summary,"Auth":resp.Result.Auth});
              }
              else {
                res.send({"success":true,"result":resp.Result.Summary});
              }
            }
            else {
              res.send({"success":false,"result":resp.Result.Summary+"\n"+resp.Message});
            }
          }
        });
    });

    router.post('/choosemech', (req,res,next) => {
      if(req.body.mechanismId) {
        var mechId = req.body.mechanismId;
        var mech = req.session.Mechanisms.find(mech => mech.MechanismId == mechId);
        if(mech) { 
          req.session.CurrentMechanismId = mechId;
          res.locals.Mechanism = mech;
          res.locals.SessionId = req.session.SessionId;
          res.render("customerlogin",{"action":"mfaanswer"});
        }
        else {
          res.render("customerror", {"error":"Mechanism used does not belong to current session","error_description":null});
        }
  }
});

    module.exports = router;