import React from "react";
import { createStackNavigator } from "react-navigation";

import MyAccount from "./MyAccount";

export default createStackNavigator(
  {
    MyAccount
  },
  {
    initialRouteName: "MyAccount",
    headerMode: "none"
  }
);
