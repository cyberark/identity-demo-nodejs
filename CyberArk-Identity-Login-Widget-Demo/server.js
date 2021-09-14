/*
* Copyright (c) 2021 CyberArk Software Ltd. All rights reserved.
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
'use strict';
const fs = require('fs')
var http = require( "http" ),
    pathUtils = require( "path" ),
    express = require( "express" ),
    app = express(),
    PORT = 5000;

app.get( "*",function( req, res ) {
    res.setHeader('Strict-Transport-Security','max-age=31536000; includeSubDomains');
    res.setHeader("Content-Security-Policy", "script-src 'self' <TENANT_URL> 'unsafe-inline' 'unsafe-eval'");
    res.sendFile(pathUtils.resolve( __dirname, "LoginWidget.html" ));
} );

http.createServer(app).listen( PORT, function() {
    console.log( "Express server listening on port " + PORT );
    console.log( "http://localhost:" + PORT );
} );