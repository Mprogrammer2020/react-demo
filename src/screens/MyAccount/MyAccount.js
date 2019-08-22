import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import { MainButton } from "../../components/Button";
import { withAuth } from "../../AuthContext";

class MyAccountScreen extends Component {
  render() {
    const {
      authCtx: { removeToken, profile, loadToken = {} },
      navigation
    } = this.props;
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            margin: 10
          }}
        >{`Welcome to Toryod Seller!`}</Text>
        {profile.image_url && (
          <View style={{ margin: 10 }}>
            <Image
              source={{
                uri: profile.image_url
              }}
              style={{ width: 130, height: 130 }}
            />
          </View>
        )}

        {/* TODO move to profile module */}
        <MainButton
          onPress={async () => {
            await removeToken();
            console.log("remove token finished");
            navigation.navigate("Auth");
          }}
          title="Log Out"
        />
      </View>
    );
  }
}

export default withAuth(MyAccountScreen);
