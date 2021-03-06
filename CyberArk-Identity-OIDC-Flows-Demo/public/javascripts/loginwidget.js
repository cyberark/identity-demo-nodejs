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

//Use successHandler and failureHandler if we need to receive a callback to separate function
var resourceUrlPath = null;
function successHandler(data) {
  window.location.href = resourceUrlPath + "?Auth=" + data.Auth;
}

function failureHandler(data) {
  window.location.href =
    "/error?error=" +
    data.Result.Summary +
    "&error_description=" +
    data.Summary;
}

function initializeLoginWidget(apiFqdn, widgetId, appKey) {
  document.addEventListener("DOMContentLoaded", function () {
    LaunchLoginView({
      containerSelector: ".cyberark-login",
      apiFqdn: apiFqdn,
      widgetId: widgetId,
      appKey: appKey
    });
  });
}
