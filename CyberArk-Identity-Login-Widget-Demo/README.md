# Login Widget Demo
**Status**: Community

The Login Widget Demo is available with a Community Certification Level.
Naming and API's are still subject to *breaking* changes.

![Certification Level Community](https://camo.githubusercontent.com/fc39ec5a52592c929ecd6e7ff4e3d1b7d5a4856c512a5486a5c24a00db6bcf6d/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f43657274696669636174696f6e2532304c6576656c2d436f6d6d756e6974792d3238413734353f6c696e6b3d68747470733a2f2f6769746875622e636f6d2f637962657261726b2f636f6d6d756e6974792f626c6f622f6d61737465722f436f6e6a75722f636f6e76656e74696f6e732f63657274696669636174696f6e2d6c6576656c732e6d64)

Sample node.js web application to demonstrate the usage of CyberArk Identity Login Widget


# Contents
<!-- MarkdownTOC -->
- [Login Widget Demo](#login-widget-demo)
- [Contents](#contents)
- [Setup](#setup)
	- [Prerequisite](#prerequisite)
	- [Web App Configuration](#web-app-configuration)
		- [Tenant Details in Code](#tenant-details-in-code)
		- [Integration Steps with CyberArk Identity Server](#integration-steps-with-cyberark-identity-server)
	- [Start Web Application](#start-web-application)
	- [Code Maintainers](#code-maintainers)
	- [License](#license)
<a id="web-app-setup"></a>
# Setup
<a id="prerequisites-to-understand-web-application"></a>
## Prerequisite

* NodeJS (https://nodejs.org/en/download/)
<a id="setup-web-application"></a>
## Web App Configuration
<a id="tenant-details-setup"></a>
### Tenant Details in Code
* Replace <TENANT_API_FQDN> in 'LoginWidget.html' with your tenant FQDN (Example : When the tenant url is 'https://abc0123.my.idaptive.app' then TENANT_API_FQDN will be 'abc0123.my.idaptive.app')
* Replace <TENANT_URL> in 'server.js' with actual tenant url (Example: 'https://abc0123.my.idaptive.app')

<a id="integration-steps-with-cyberark-identity-server"></a>
### Integration Steps with CyberArk Identity Server
* Login into the CyberArk Identity Admin Portal.
* Navigate to Settings -> Authentication -> Security Settings.
* In **API security section**, add **localhost** to make it as a trusted domain.
   -  <img src="./media/DNS_setting.PNG" style="width:2.0625in;height:2.64583in" />

<a id="start-web-application"></a>
## Start Web Application
Open Command Prompt in working directory and execute the below command to start the application

```console
npm install
node server.js
```
Open http://localhost:5000 in the browser to interact with CyberArk Identity Login Widget

## Code Maintainers

CyberArk Identity Team

<a id="license"></a>
## License

This project is licensed under Apache License 2.0 - see [`LICENSE`](../LICENSE) for more details.

Copyright (c) 2021 CyberArk Software Ltd. All rights reserved.
