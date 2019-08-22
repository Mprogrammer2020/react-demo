import "react-native";
import React from "react";
import AuthLoading from "../screens/AuthLoading";

import renderer from "react-test-renderer";

it("<AuthLoading /> should render correctly", () => {
  const tree = renderer.create(<AuthLoading />).toJSON();
  expect(tree).toMatchSnapshot();
});
