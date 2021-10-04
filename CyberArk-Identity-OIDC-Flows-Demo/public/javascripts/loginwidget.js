//Use successHandler and failureHandler if we need to receive a callback to separate function
var resourceUrlPath = null;
    function successHandler(data) {
        window.location.href = resourceUrlPath+'?Auth='+data.Auth;
      }
    
      function failureHandler(data) {
        window.location.href = '/error?error='+data.Result.Summary+'&error_description='+data.Summary;
      }

    function initializeLoginWidget(tenantFqdn, resource_url_path, appKey) {
        resourceUrlPath = resource_url_path;
        document.addEventListener('DOMContentLoaded', function () {
            LaunchLoginView({
                "success": "loginSuccess",
                "containerSelector": ".idaptive-login",
                "initialTitle": "Login",
                "defaultTitle": "Authentication",
                "allowSocialLogin": true,
                "allowRememberMe": true,
                "allowRegister": true,
                "allowForgotUsername": false,
                "apiFqdn": tenantFqdn,
                ...(appKey && {"appKey": appKey}),
                ...(!appKey && {"success": successHandler}),
                ...(!appKey && {"failure": failureHandler})
            });
        });
    }
