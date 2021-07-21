# Login Widget Demo
**Status**: Community

The Login Widget Demo is available with a Community Certification Level.
Naming and API's are still subject to *breaking* changes.

![Certification Level Community](https://camo.githubusercontent.com/fc39ec5a52592c929ecd6e7ff4e3d1b7d5a4856c512a5486a5c24a00db6bcf6d/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f43657274696669636174696f6e2532304c6576656c2d436f6d6d756e6974792d3238413734353f6c696e6b3d68747470733a2f2f6769746875622e636f6d2f637962657261726b2f636f6d6d756e6974792f626c6f622f6d61737465722f436f6e6a75722f636f6e76656e74696f6e732f63657274696669636174696f6e2d6c6576656c732e6d64)

Sample node.js web application to demonstrate the usage of CyberArk Identity Login Widget


# Contents
<!-- MarkdownTOC -->
- [Setup](#web-app-setup)
    - [Prerequisite](#prerequisites-to-understand-web-application)
	- [Web App Configuration](#setup-web-application)
		- [Tenant Details in Code](#tenant-details-setup)
		- [Integration Steps with CyberArk Identity Server](#integration-steps-with-cyberark-identity-server)
	- [Start Web Application](#start-web-application)
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
* Replace <TENANT_API_FQDN> in 'LoginWidget.html' with your tenant FQDN (Example : if ur tenant url is 'https://abc0123.my.idaptive.app' then FQDN is 'abc0123.my.idaptive.app')
* Replace <TENANT_URL> in 'server.js' with your tenant url

<a id="integration-steps-with-cyberark-identity-server"></a>
### Integration Steps with CyberArk Identity Server
* Login into the CyberArk Identity Admin Portal 
   -  <img src="./media/DNS_setting.PNG" style="width:2.0625in;height:2.64583in" />

<a id="start-web-application"></a>
## Start Web Application(Commands to start the application)
Open Command Prompt in working directory

```console
npm install
node serve.js
```
Open http://localhost:5000 in the browser to interact with Cyberark Identity Login Widget

## Code Maintainers

Cyberark Identity Team

<a id="license"></a>
## License

This project is licensed under Apache - see [`LICENSE`](LICENSE) for more details.
