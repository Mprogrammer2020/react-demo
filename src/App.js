import React from "react";
import codePush from "react-native-code-push";
import Navigations from "./Navigations";
import AuthProvider from "./AuthContext";

// By default, CodePush will check for updates on every app start.
// If an update is available, it will be silently downloaded,
// and installed the next time the app is restarted
// (either explicitly by the end user or by the OS),
// which ensures the least invasive experience for your end users.
// If an available update is mandatory, then it will be installed immediately,
// ensuring that the end user gets it as soon as possible.

// using ON_APP_RESUME.
// If you would like your app to discover updates more quickly,
// you can also choose to sync up with the CodePush server every time the app resumes from the background.
const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME
};

export default codePush(codePushOptions)(() => (
  <AuthProvider>
    <Navigations />
  </AuthProvider>
));
