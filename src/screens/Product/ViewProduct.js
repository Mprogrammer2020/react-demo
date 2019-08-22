import React from "react";
import { Text, View } from "react-native";

export default class ViewProduct extends React.Component {
  render() {
    const product = this.props.navigation.state.params || {};
    return (
      <View
        style={{
          flex: 1,
          alignItems: "flex-start",
          justifyContent: "center",
          paddingLeft: 10
        }}
      >
        <Text>{`Product ${
          this.props.navigation.state.params.name
        } Screen`}</Text>
        <Text>
          Category:
          {product.internal_category && product.internal_category.length
            ? product.internal_category
                .map(category => category.name)
                .join(", ")
            : null}
        </Text>
        <Text>ProductCode: {product.internal_sku}</Text>
        <Text>
          Keywords:
          {product.keywords && product.keywords.length
            ? product.keywords.map(kw => kw.name).join(", ")
            : null}
        </Text>
        <Text>Model Number: {product.model}</Text>
        <Text>Brand Name: {product.merchant.company_info.company_name}</Text>
        <Text>
          Single Price: {product.price ? product.price.display_price : null}
        </Text>
        <Text>Min Order: {product.pricing.min_order_qty}</Text>
      </View>
    );
  }
}
