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

const xhr = new XMLHttpRequest();
function pollOOBstatus(tenantId, sessionId, mechanismId, actionType) {
  console.log("retrieving PollOObstatus");
  if (actionType == "StartTextOob" || actionType == "StartOob") {
    const timeout = 300000, //2 min
      method = "POST",
      url = window.location.origin + "/auth/pollOOB";
    var data = {
      TenantId: tenantId,
      SessionId: sessionId,
      MechanismId: mechanismId,
      Action: "StartOOB",
    };
    xhr.open(method, url, true);
    xhr.timeout = timeout;
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.setRequestHeader("Accept", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        var status = xhr.status;
        if (status === 0 || (status >= 200 && status < 400)) {
          // The request has been completed successfully
          var response = JSON.parse(xhr.responseText);
          if (response.success == true) {
            var query = "/auth/RedirectToNextState?state=" + response.result;
            if (response.Auth) {
              query = query + "&Auth=" + response.Auth;
            }
            window.location.href = query;
          } else {
            window.location.href = "/error?error=" + response.result;
          }
        }
      }
    };
    xhr.ontimeout = function (e) {
      window.location.href =
        "/auth/error?error=Request Timed Out&error_description=" + e;
      // XMLHttpRequest timed out.
    };
    xhr.onabort = function (e) {
      console.log("Aborted Polling!!");
    };

    xhr.send(JSON.stringify(data));
  }
}

function abortPoll() {
  if (xhr.readyState != XMLHttpRequest.UNSENT) {
    console.log("Aborting Polling!!");
    xhr.abort();
  }
  return true;
}
