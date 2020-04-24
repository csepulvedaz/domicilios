import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  YellowBox,
  TouchableWithoutFeedback,
  Alert,
  Modal
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { AppLoading } from "expo";
import firebase from "../firebase";
import ShoppingCart from "../components/shoppingCart";
import Menu from "../components/menu";

export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      counter: 0,
      price: 0,
      nameProduct: "",
      bread: "",
      cheese: "",
      additions: ["", "", ""],
      fries: "",
      drinks: "",
      isSelectedOrder: false,
      isSelectedAdditions: false,
      isSelectedAccount: false,
      isSelectedSendOrder: false,
      shoppingCart: [],
      shoppingCartPrice: [],
      order: [],
      multiplier: [],
      isLoading: true,
      name: "",
      orderCounter: 0,
      modalVisible: false,
    };
    YellowBox.ignoreWarnings(["Setting a timer"]);
  }

  componentWillMount() {
    var userId = firebase.auth().currentUser.uid;
    let _this = this;
    firebase
      .database()
      .ref("/users/" + userId)
      .once("value")
      .then(function(snapshot) {
        _this.setState({
          isLoading: false,
          name: snapshot.val() && snapshot.val().name,
          orderCounter: snapshot.val().counter
        });
        Alert.alert("¡Bienvenido!", snapshot.val() && snapshot.val().name);
      });
  }

  updateState = data => {
    this.setState(data);
  };

  updateOrder = (state, total) => {
    var user = firebase.auth().currentUser;
    var adress = state.adress;
    var counter = this.state.orderCounter + 1;
    if (state.pickUp === "Tienda") var adress = "";
    if (user) {
      firebase
        .database()
        .ref("users/" + user.uid)
        .update({
          phone: state.phone,
          adress: state.adress,
          counter: counter
        });
      firebase
        .database()
        .ref("orders/" + counter)
        .set({
          order: this.state.order,
          payment: state.payment,
          pickUp: state.pickUp,
          comments: state.comments,
          subtotal: state.subtotal,
          phone: state.phone,
          adress: adress,
          orderState: false,
          user: user.uid,
          name: this.state.name,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        });
    }
    this.setState({
      total: 0,
      counter: 0,
      price: 0,
      nameProduct: "",
      bread: "",
      cheese: "",
      additions: ["", "", ""],
      fries: "",
      drinks: "",
      isSelectedOrder: false,
      isSelectedAdditions: false,
      isSelectedAccount: false,
      isSelectedSendOrder: false,
      shoppingCart: [],
      shoppingCartPrice: [],
      order: [],
      multiplier: [],
      orderCounter: counter
    });
  };

  onPressSend = (state, total) => {
    if (state.adress === "" && state.pickUp === "Domicilio") {
      Alert.alert("Por favor ingrese dirección.");
      return;
    }
    if (state.phone === "") {
      Alert.alert("Por favor ingrese número celular.");
      return;
    }
    Alert.alert(
      "¿Desea enviar el pedido?",
      "",
      [
        { text: "OK", onPress: () => this.updateOrder(state, total) },
        {
          text: "Cancel",
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  };

  onPressAccount = () => {
    this.setState({ isSelectedAccount: true });
  };

  onPressTotal = price => {
    var products = this.state.shoppingCart;
    var prices = this.state.shoppingCartPrice;
    var order = this.state.order;
    var multiplier = this.state.multiplier;

    order.push([
      this.state.nameProduct,
      this.state.bread,
      this.state.cheese,
      this.state.additions,
      this.state.fries,
      this.state.drinks
    ]);
    multiplier.push(1);
    prices.push(price);
    products.push(
      <View key={this.state.counter} style={styles.containerOrder}>
        <Text
          style={{ fontFamily: "open-sans", fontSize: 14, color: "#211414" }}
        >
          {this.state.nameProduct}:
        </Text>
        <Text
          style={{ fontFamily: "open-sans", fontSize: 12, color: "#8E8E93" }}
        >
          {this.state.bread !== "" && this.state.bread + ", "}
          {this.state.cheese !== "" && this.state.cheese + ", "}
          {this.state.additions[0] !== "" && this.state.additions[0] + ", "}
          {this.state.additions[1] !== "" && this.state.additions[1] + ", "}
          {this.state.additions[2] !== "" && this.state.additions[2] + ", "}
          {this.state.fries !== "" && this.state.fries + ", "}
          {this.state.drinks !== "" && this.state.drinks + "."}
        </Text>
      </View>
    );
    this.setState({
      total: this.state.total + price,
      counter: this.state.counter + 1,
      shoppingCart: products,
      shoppingCartPrice: prices,
      order: order,
      multiplier: multiplier
    });
  };

  render() {
    if (this.state.isLoading) {
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Por favor acepte o rechace el pedido");
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.title}>Nuevo pedido</Text>
              <View>
                <Text style={styles.modalText}>Orden: {this.state.order}</Text>
                <Text style={styles.modalText}>
                  Total: {this.state.subtotal}
                </Text>
                <Text style={styles.modalText}>
                  Recoger en: {this.state.pickUp}
                </Text>
                <Text style={styles.modalText}>
                  Dirección: {this.state.adress}
                </Text>
                <Text style={styles.modalText}>
                  Método de pago: {this.state.payment}
                </Text>
                <Text style={styles.modalText}>
                  Celular: {this.state.phone}
                </Text>
                <Text style={styles.modalText}>
                  Comentarios: {this.state.comments}
                </Text>
              </View>
              <View style={styles.modalButtons}>
                <TouchableWithoutFeedback
                  onPress={this.onPressAccept}
                  underlayColor="white"
                >
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>Aceptar</Text>
                  </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback
                  onPress={this.onPressRejected}
                  underlayColor="white"
                >
                  <View style={styles.buttonRed}>
                    <Text style={styles.buttonText}>Rechazar</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </Modal>
        {!this.state.isSelectedAccount && !this.state.isSelectedSendOrder && (
          <View style={styles.containerImage}>
            <Image
              style={{
                width: Dimensions.get("window").width / 1.5,
                height: Dimensions.get("window").width / 3
              }}
              source={require("../assets/img/logo.png")}
            />
          </View>
        )}
        {!this.state.isSelectedAdditions &&
          !this.state.isSelectedOrder &&
          !this.state.isSelectedAccount &&
          !this.state.isSelectedSendOrder && (
            <View style={styles.shoppingCart}>
              <TouchableWithoutFeedback onPress={this.onPressAccount}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-end"
                  }}
                >
                  <Icon name="user" color="#c0c0c0" size={25} />
                  <Text
                    style={{
                      fontFamily: "open-sans-bold",
                      fontSize: 16,
                      color: "#211414"
                    }}
                  >
                    {" "}
                    Mi Cuenta
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <ShoppingCart
                navigation={this.props.navigation}
                state={this.state}
                updateState={this.updateState.bind(this)}
              />
            </View>
          )}
        <Menu
          state={this.state}
          isSelectedAccount={this.state.isSelectedAccount}
          isSelectedOrder={this.state.isSelectedOrder}
          isSelectedAdditions={this.state.isSelectedAdditions}
          isSelectedSendOrder={this.state.isSelectedSendOrder}
          price={this.state.price}
          shoppingCart={this.state.shoppingCart}
          nameProduct={this.state.nameProduct}
          shoppingCartPrice={this.state.shoppingCartPrice}
          updateState={this.updateState.bind(this)}
          total={this.onPressTotal.bind()}
          send={this.onPressSend.bind(this)}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    flex: 1,
    backgroundColor: "#fafafa",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  containerImage: {
    flex: 1,
    alignItems: "center"
  },
  shoppingCart: {
    width: Dimensions.get("window").width - 40,
    //backgroundColor: '#ccc',
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between"
    //marginTop: -10,
  },
  containerOrder: {
    flex: 6,
    flexDirection: "column",
    justifyContent: "center",
    paddingTop: 15,
    paddingBottom: 15
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  modalContent: {
    width: 300,
    height: 400,
    padding: 15,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    elevation: 2,
    alignItems: "center",
    justifyContent: "space-between"
  },
  modalButtons: {
    width: 300,
    justifyContent: "space-evenly",
    flexDirection: "row"
  },
  button: {
    width: 120,
    borderRadius: 5,
    elevation: 1,
    alignItems: "center",
    backgroundColor: "#23D25B"
  },
  buttonRed: {
    width: 120,
    borderRadius: 5,
    elevation: 1,
    alignItems: "center",
    backgroundColor: "#d22342"
  },
  buttonBlue: {
    width: 120,
    borderRadius: 5,
    elevation: 1,
    alignItems: "center",
    backgroundColor: "#23d2b3"
  },
  buttonText: {
    fontFamily: "open-sans-bold",
    padding: 5,
    fontSize: 18,
    color: "#fff"
  },
  title: {
    fontSize: 20,
    fontFamily: "open-sans-bold"
  },
  modalText: {
    fontSize: 16,
    fontFamily: "open-sans"
  },
  orderText: {
    fontSize: 16,
    fontFamily: "open-sans-bold",
    color: "#fff"
  }
});
