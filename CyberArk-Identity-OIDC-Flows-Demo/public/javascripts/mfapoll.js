
const xhr = new XMLHttpRequest();
function pollOOBstatus(tenantFqdn, sessionId, mechanismId, actionType) {
    console.log("retrieving PollOObstatus");
    if(actionType == 'StartTextOob' || actionType == 'StartOob') {
        const timeout = 300000,//2 min
        method = "POST",
        url = window.location.origin+'/auth/pollOOB';
        var data = {
            TenantId: tenantFqdn,
            SessionId: sessionId,
            MechanismId: mechanismId,
            Action: "StartOOB"
        };
        xhr.open(method, url, true);
        xhr.timeout = timeout;
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
        xhr.setRequestHeader('Accept', 'application/json;charset=UTF-8')
        xhr.onreadystatechange = function () {
          if(xhr.readyState === XMLHttpRequest.DONE) {
                var status = xhr.status;
                if (status === 0 || (status >= 200 && status < 400)) {
                  // The request has been completed successfully
                  var response = JSON.parse(xhr.responseText);
                    if(response.success == true) {
                        var query = '/auth/RedirectToNextState?state='+response.result;
                        if(response.Auth) {
                            query=query+"&Auth="+response.Auth;
                        }
                        window.location.href = query;
                    }
                    else {
                        window.location.href = '/error?error='+response.result;
                    }
                }
            }
        };
        xhr.ontimeout = function (e) {
            window.location.href = '/auth/error?error=Request Timed Out&error_description='+e;
                 // XMLHttpRequest timed out. 
             };
        xhr.onabort = function (e) {
                console.log('Aborted Polling!!');
            };

    xhr.send(JSON.stringify(data));
    }
}

function abortPoll() {
    if(xhr.readyState != XMLHttpRequest.UNSENT) {
      console.log("Aborting Polling!!");
        xhr.abort();
    }
    return true;
}
