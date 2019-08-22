import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

import ProductList from "./ProductList";
import EditProductAttributes from "./EditProductAttributes";
import ViewProduct from "./ViewProduct";
import EditProduct from "./EditProduct";

import NavigationHeader from "../../components/NavigationHeader";

export default {
  ViewProduct: {
    screen: ViewProduct,
    path: "product/:id",
    navigationOptions: ({ navigation }) => ({
      header: (
        <NavigationHeader
          onBackIconPress={() => navigation.goBack()}
          centerTitle={navigation.state.params.name}
          rightIcons={
            <Icon
              name="edit"
              color="white"
              size={20}
              onPress={() =>
                navigation.navigate("EditProduct", {
                  ...navigation.state.params
                })
              }
            />
          }
        />
      )
    })
  },

  EditProduct: {
    screen: EditProduct,
    path: "product/:id/edit",
    navigationOptions: ({ navigation }) => ({
      header: (
        <NavigationHeader
          onBackIconPress={() => navigation.goBack()}
          centerTitle="Edit Product Information"
        />
      )
    })
  },

  EditProductAttributes: {
    screen: EditProductAttributes,
    path: "product/:id/edit/attribute",
    navigationOptions: ({ navigation }) => ({
      header: (
        <NavigationHeader
          onBackIconPress={() => navigation.goBack()}
          centerTitle="Product Attribute"
        />
      )
    })
  },

  ProductList: {
    screen: ProductList,
    path: "products",
    navigationOptions: ({ navigation }) => ({
      header: (
        <NavigationHeader
          onBackIconPress={() => navigation.goBack()}
          centerTitle="Product"
          rightIcons={[
            <Icon
              name="search"
              color="white"
              size={20}
              onPress={() => alert("search products not implemented yet")}
            />,
            <Icon
              name="plus"
              color="white"
              size={20}
              onPress={() => alert("add product not implemented yet")}
            />
          ]}
        />
      )
    })
  }
};
