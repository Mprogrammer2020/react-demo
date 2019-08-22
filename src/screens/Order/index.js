import React from "react";
import { createStackNavigator } from "react-navigation";

import OrderList from "./OrderList";

export default createStackNavigator(
  {
    OrderList
  },
  {
    initialRouteName: "OrderList",
    headerMode: "none"
  }
);
