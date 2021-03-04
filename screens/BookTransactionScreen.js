import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Permissions from "expo-permissions";

export default class TransactionScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermissions: null,
      scanned: false,
      scanData: "",
      buttonState: "normal",
      scannedBookId: "",
      scannedStudentId: "",
    };
  }

  getCameraPermissions = async (id) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermissions: status === "granted",
      buttonState: id,
      scanned: false,
    });
  };

  handleBarCodeScan = async ({ type, data }) => {
    const { buttonState } = this.state;
    console.log("hi");
    if (buttonState === "BookId") {
      this.setState({
        scanned: true,
        scannedBookId: data,
        buttonState: "normal",
      });
    } else if (buttonState === "StudentId") {
      this.setState({
        scanned: true,
        scannedStudentId: data,
        buttonState: "normal",
      });
    }
  };

  render() {
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;
    if (buttonState !== "normal" && hasCameraPermissions) {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScan}
          style={StyleSheet.absoluteFillObject}
        />
      );
    } else if (buttonState === "normal") {
      return (
        <View style={styles.Container}>
          <View>
            <Image
              source={require("../assets/booklogo.jpg")}
              style={{ width: 200, height: 200 }}
            />
            <Text style={{ textAlign: "center", fontSize: 20 }}>Willy</Text>
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputBox}
              placeholder="BookId"
              value={this.state.scannedBookId}
            ></TextInput>
            <Text>{this.state.scannedBookId}</Text>
            <TouchableOpacity
              style={styles.ScanButton}
              onPress={this.getCameraPermissions("BookId")}
            >
              <Text style={styles.buttonText}>Scan</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputBox}
              placeholder="StudentId"
              value={this.state.scannedStudentId}
            ></TextInput>
            <TouchableOpacity
              style={styles.ScanButton}
              onPress={this.getCameraPermissions("StudentId")}
            >
              <Text style={styles.buttonText}>Scan</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  displayText: {
    fontSize: 15,
    textDecorationLine: "underline",
  },

  buttonText: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 10,
  },

  inputView: {
    flexDirection: "row",
    margin: 20,
  },

  inputBox: {
    width: 200,
    height: 4,
    borderWidth: 1.5,
    borderRightWidth: 0,
    fontSize: 20,
  },

  ScanButton: {
    backgroundColor: "#2196f3",
    padding: 10,
    margin: 10,
  },
});
