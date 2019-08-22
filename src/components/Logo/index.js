import React from "react";
import { View, Image } from "react-native";

/**
 * Toryod Logo
 */
export default () => (
  <View>
    <Image source={require("./logo.png")} style={{ height: 60, width: 180 }} />
  </View>
);
