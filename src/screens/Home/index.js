import React from "react";
import { createStackNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";

import Home from "./Home";
import ProductScreens from "../Product";
import NavigationHeader from "../../components/NavigationHeader";

export default createStackNavigator(
  {
    Home: {
      screen: Home,
      path: "home",

      navigationOptions: ({ navigation }) => ({
        header: (
          <NavigationHeader
            centerTitle="Store Name"
            rightIcons={
              <Icon
                name="bell"
                color="white"
                size={20}
                onPress={() => alert("notifications not implemented yet")}
              />
            }
          />
        )
      })
    },
    ...ProductScreens
  },
  {
    initialRouteName: "Home",
    headerMode: "screen"
  }
);
