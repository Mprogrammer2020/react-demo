import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const homeMenus = [
  [
    { title: "Dashboard", iconName: "chart-line", screen: null },
    { title: "Store Setting", iconName: "cog", screen: null }
  ],
  [
    { title: "Products", iconName: "box", screen: "ProductList" },
    { title: "Orders", iconName: "shopping-cart", screen: null }
  ],
  [
    { title: "Finance", iconName: "file-invoice", screen: null },
    { title: "Reports", iconName: "receipt", screen: null }
  ],
  [
    { title: "Disputes", iconName: "hands-helping", screen: null },
    { title: "Help", iconName: "question", screen: null }
  ]
];

const Block = ({ title, iconName, screen, navigation }) => (
  <View style={styles.column}>
    <TouchableOpacity
      onPress={() =>
        screen
          ? navigation.navigate(screen)
          : alert(`${title} screen not implented yet`)
      }
    >
      <View style={{ alignSelf: "center", marginBottom: 10 }}>
        <Icon name={iconName} color="#BDBDBD" size={40} />
      </View>
      <Text>{title}</Text>
    </TouchableOpacity>
  </View>
);

export default class HomeScreen extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        {homeMenus.map(([menu1, menu2], key) => (
          <View key={key} style={styles.row}>
            <Block
              title={menu1.title}
              iconName={menu1.iconName}
              screen={menu1.screen}
              navigation={navigation}
            />
            <Block
              title={menu2.title}
              iconName={menu2.iconName}
              screen={menu2.screen}
              navigation={navigation}
            />
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white"
  },
  column: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: "#E0E0E0"

    // height: "100%",
    // width: "100%",
  }
});
