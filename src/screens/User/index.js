import React from "react";
import { createStackNavigator } from "react-navigation";

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SignUpSuccess from "./SignUpSuccess";

import NavigationHeader from "../../components/NavigationHeader";

export default createStackNavigator(
  {
    SignIn: {
      screen: SignIn,
      home: "signin",
      navigationOptions: ({ navigation }) => ({
        header: <NavigationHeader centerTitle="Sign In" />
      })
    },
    SignUp: {
      screen: SignUp,
      home: "signup",
      navigationOptions: ({ navigation }) => ({
        header: (
          <NavigationHeader
            onBackIconPress={() => navigation.goBack()}
            centerTitle="Register"
          />
        )
      })
    },
    SignUpSuccess: {
      screen: SignUpSuccess,
      home: "signup-success",
      navigationOptions: ({ navigation }) => ({
        header: (
          <NavigationHeader
            onBackIconPress={() => navigation.goBack()}
            centerTitle="Register"
          />
        )
      })
    }
  },
  {
    initialRouteName: "SignIn"
  }
);
