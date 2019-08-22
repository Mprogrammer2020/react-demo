import React from "react";
import { createStackNavigator } from "react-navigation";

import ChatList from "./ChatList";

export default createStackNavigator(
  {
    ChatList
  },
  {
    initialRouteName: "ChatList",
    headerMode: "none"
  }
);
