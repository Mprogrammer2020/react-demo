import React from "react";
import { ScrollView, Text, View } from "react-native";

import ProductAttributeModal from "./ProductAttributeModal";
import { Divider } from "../../components/Divider";
import { ForwardButton } from "../../components/Button";

export default class EditProductAttributes extends React.Component {
  state = {
    productVariantSelectModalVisible: false,

    attributeCodeToEdit: null, // attribute code to edit
    attributeToEdit: {}, // attribute information to edit include all the available option values
    selectedValues: new Set([]) // the attribute values already selected, id Set
  };

  openSelectAttributeModel(selectedAttrCode) {
    const availableAttributes =
      this.props.navigation.state.params.availableAttributes || [];
    const selectedAttributes =
      this.props.navigation.state.params.selectedAttributes || [];

    // attribute information include all the available option values
    const attributeToEdit = availableAttributes.find(
      attr => attr.code === selectedAttrCode
    );
    if (
      !attributeToEdit ||
      !attributeToEdit.code ||
      !attributeToEdit.values ||
      !attributeToEdit.values.length
    ) {
      return alert("this attribute has not options");
    }

    // the options the user already selected
    const selectedAttribute = selectedAttributes.find(
      attr => attr.attribute_code === selectedAttrCode
    );
    const selectedValues =
      selectedAttribute &&
      selectedAttribute.values &&
      selectedAttribute.values.length
        ? selectedAttribute.values.map(value => value.id)
        : [];

    this.setState({
      attributeCodeToEdit: attributeToEdit.code,
      productVariantSelectModalVisible: true,
      attributeToEdit,
      selectedValues: new Set(selectedValues)
    });
  }

  render() {
    const {
      isVariant,
      availableAttributes = []
    } = this.props.navigation.state.params;

    return (
      <ScrollView
        style={{
          flex: 1,
          paddingLeft: 10,
          backgroundColor: "white"
        }}
      >
        {availableAttributes.map((attr, key) => (
          <ForwardButton
            key={`${attr.code}_${key}`}
            title={attr.name}
            onPress={() => this.openSelectAttributeModel(attr.code)}
          />
        ))}

        {/* Custom Attribute */}
        {!isVariant ? (
          <View>
            <Divider borderColor="#E0E0E0" orientation="center" height={8} />
            <Text>Other Attribute</Text>
          </View>
        ) : null}

        {this.state.productVariantSelectModalVisible && (
          <ProductAttributeModal
            visible={this.state.productVariantSelectModalVisible}
            onSave={() => {
              this.setState({ productVariantSelectModalVisible: false });
              console.log("product variant select modal saved.");
            }}
            onModalClose={() =>
              this.setState({ productVariantSelectModalVisible: false })
            }
            attributeToEdit={this.state.attributeToEdit}
            selectedValues={this.state.selectedValues}
          />
        )}
      </ScrollView>
    );
  }
}
