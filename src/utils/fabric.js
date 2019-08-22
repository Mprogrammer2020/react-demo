import * as Fabric from "react-native-fabric";
import { Platform } from "react-native";

const { Crashlytics } = Fabric;

export const sendCrash = (name, email, id, error) => {
  Crashlytics.setUserName(name);
  Crashlytics.setUserEmail(email);
  Crashlytics.setUserIdentifier(id);

  // Crashlytics.setBool("has_posted", true);
  // Crashlytics.setString("organization", "Acme. Corp");

  // Forces a native crash for testing
  Crashlytics.crash();

  // if (Platform.OS === "ios") {
  //   // Record a non-fatal JS error only on iOS
  //   Crashlytics.recordError("something went wrong!");
  // } else {
  //   // Record a non-fatal JS error only on Android
  //   Crashlytics.logException("something went wrong!");
  // }
};

// export const sendCrash = (name, email, id, error) => {
//   Crashlytics.setUserName("megaman");

//   Crashlytics.setUserEmail("user@email.com");

//   Crashlytics.setUserIdentifier("1234");

//   Crashlytics.setBool("has_posted", true);

//   Crashlytics.setString("organization", "Acme. Corp");

//   // Forces a native crash for testing
//   Crashlytics.crash();

//   // Due to differences in primitive types between iOS and Android I've exposed a setNumber function vs. setInt, setFloat, setDouble, setLong, etc
//   Crashlytics.setNumber("post_count", 5);

//   // Record a non-fatal JS error only on Android
//   Crashlytics.logException("");

//   // Record a non-fatal JS error only on iOS
//   Crashlytics.recordError("something went wrong!");
// };
