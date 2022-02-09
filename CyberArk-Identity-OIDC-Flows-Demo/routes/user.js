/*
 * Copyright (c) 2022 CyberArk Software Ltd. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var express = require("express");
var router = express.Router();
var utl = require("util");
var querystring = require("querystring");

/* User Operations */

router.get("/userinfo", (req, res, next) => {
  res.render("navbar2", {
    content: {
      user: req.session.user,
      loginStatus: true,
      action: "userinfo",
      sessionTokens: req.session.sessionTokens,
      claims: req.session.claims,
    },
  });
});

router.get("/response", (req, res, next) => {
  res.render("navbar2", {
    content: {
      user: req.session.user,
      loginStatus: true,
      action: "response",
      sessionTokens: req.session.sessionTokens,
      claims: req.session.claims,
    },
  });
});

router.get("/tokens", (req, res, next) => {
  res.render("navbar2", {
    content: {
      user: req.session.user,
      loginStatus: true,
      action: "tokens",
      sessionTokens: req.session.sessionTokens,
      claims: req.session.claims,
    },
  });
});

router.get("/claims", (req, res, next) => {
  res.render("navbar2", {
    content: {
      user: req.session.user,
      loginStatus: true,
      action: "claims",
      sessionTokens: req.session.sessionTokens,
      claims: req.session.claims,
    },
  });
});

module.exports = router;
