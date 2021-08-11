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