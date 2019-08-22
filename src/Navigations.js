import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";

// auth and loading
import AuthStack from "./screens/User";
import AuthLoading from "./screens/AuthLoading";

// tabs
import Home from "./screens/Home";
import Messenger from "./screens/Messenger";
import MyAccount from "./screens/MyAccount";
import Order from "./screens/Order";

const focusdColor = "red";
const unfocusdColor = "grey";

const AppMainTab = createBottomTabNavigator({
  HOME: {
    screen: Home,
    path: "/home",
    title: "HOME",
    navigationOptions: {
      tabBarIcon: ({ focused }) => {
        return (
          <Icon
            name={"home"}
            size={25}
            color={focused ? focusdColor : unfocusdColor}
          />
        );
      }
    }
  },
  MESSGENGER: {
    screen: Messenger,
    path: "/messengers",
    title: "MESSGENGER",
    navigationOptions: {
      tabBarIcon: ({ focused }) => {
        return (
          <Icon
            name={"comment"}
            size={25}
            color={focused ? focusdColor : unfocusdColor}
          />
        );
      },
      tabBarLabel: "MESSENGER"
    }
  },
  ORDER: {
    screen: Order,
    path: "/orders",
    navigationOptions: {
      tabBarIcon: ({ focused }) => {
        return (
          <Icon
            name={"shopping-cart"}
            size={25}
            color={focused ? focusdColor : unfocusdColor}
          />
        );
      }
    }
  },
  "MY ACCOUNT": {
    screen: MyAccount,
    path: "/profile",
    navigationOptions: {
      tabBarIcon: ({ focused }) => {
        return (
          <Icon
            name={"user"}
            size={25}
            color={focused ? focusdColor : unfocusdColor}
          />
        );
      }
    }
  }
});

export default createSwitchNavigator(
  {
    AuthLoading,
    App: AppMainTab,
    Auth: AuthStack
  },
  {
    initialRouteName: "AuthLoading"
  }
);
