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

/* GET home page. */
router.get("/home", function (req, res, next) {
  res.redirect("/");
});

router.get("/", (req, res, next) => {
  var content = {};
  if (req.session.user || req.session.sessionTokens || req.session.claims) {
    res.render("navbar2", {
      content: {
        user: req.session.user,
        loginStatus: false,
        action: "login",
        sessionTokens: req.session.sessionTokens,
        claims: req.session.claims,
      },
    });
  } else {
    res.render("navbar2", { content: null });
  }
});

module.exports = router;
