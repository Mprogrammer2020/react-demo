import React from "react";
import { Text, ScrollView } from "react-native";
import { ClassicTextInput } from "../../components/TextInput";

import { getProductAttributesById } from "../../api/product";
import { ForwardButton } from "../../components/Button";

export default class EditProduct extends React.Component {
  constructor(props) {
    super(props);
    const product = this.props.navigation.state.params || {};
    this.state = {
      availableAttributes: [],
      selectedAttributes: product.product_attributes || []
    };
  }

  componentDidMount() {
    this.loadProductAttributes().catch(err =>
      console.log("load data err", err)
    );
  }

  async loadProductAttributes() {
    const product = this.props.navigation.state.params || {};
    const resData = (await getProductAttributesById(product.id)).data;
    this.setState({
      availableAttributes: resData.data.attributes
    });
  }

  render() {
    const product = this.props.navigation.state.params || {};
    return (
      <ScrollView
        style={{
          flex: 1,
          paddingLeft: 10,
          backgroundColor: "white"
        }}
      >
        <Text>Product Name</Text>
        <ClassicTextInput>{product.name}</ClassicTextInput>
        <Text>ProductCode: {}</Text>
        <ClassicTextInput>{product.internal_sku}</ClassicTextInput>
        <Text>Model Number</Text>
        <ClassicTextInput>{product.model}</ClassicTextInput>
        <Text>Brand Name</Text>
        <ClassicTextInput>
          {product.merchant.company_info.company_name}
        </ClassicTextInput>
        <Text>Description</Text>
        <ClassicTextInput>{product.description}</ClassicTextInput>

        {/* <Button
          rightIcon={{ name: "angle-right", type: "font-awesome" }}
          title="Variant Product"
          onPress={() =>
            this.props.navigation.navigate("EditProductAttributes", {
              isVariant: true,
              availableAttributes: this.state.availableAttributes
            })
          }
        /> */}
        <ForwardButton
          title="Variant Product"
          onPress={() =>
            this.props.navigation.navigate("EditProductAttributes", {
              isVariant: true,
              availableAttributes: this.state.availableAttributes,
              selectedAttributes: this.state.selectedAttributes
            })
          }
        />
      </ScrollView>
    );
  }
}
