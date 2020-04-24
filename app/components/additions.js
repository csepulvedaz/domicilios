import React, { Component } from 'react';
import {
  StyleSheet, Dimensions,
  Text, FlatList,
  View, Alert, BackHandler,
  TouchableHighlight,
} from 'react-native';

import AdditionsItem from './additionsItem';

const data = [{
  title: 'TIPO DE PAN',
  description: ['Pan Blanco', 'Pan Finas Hierbas'],
  price: [0, 0]
},
{
  title: 'QUESO MOZARRELLA',
  description: ['Queso Sencillo', 'Queso Doble'],
  price: [0, 1000]
},
{
  title: 'OTROS ADICIONALES',
  description: ['Salami', 'Tocineta', 'Jamón'],
  price: [1900, 1900, 1900]
},
{
  title: 'PAPAS FRITAS',
  description: ['Papa Francesa 80 gr', 'Papa Francesa 160 gr'],
  price: [1900, 3800]
},
{
  title: 'BEBIDAS',
  description: ['7up', 'Coca Cola', 'Pepsi'],
  price: [1700, 1700, 1700]
},
];

export default class Additions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      total: this.props.price,
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    this.updateState({
      isSelectedAdditions: false,
      price: 0,
      bread: '',
      cheese: '',
      additions: ['', '', ''],
      fries: '',
      drinks: '',
    })
    return true;
  }

  updateState = (data) => {
    this.props.updateParentParentState(data);
  }

  updateParentState = (data) => {
    this.props.updateParentState(data);
  }

  updateTotal = (data) => {
    this.setState((state) => {
      return { total: state.total + data };
    });
  }

  onPress = () => {
    var state = this.props.state;
    var title = this.props.titleProduct;
    var name = this.props.nameProduct;
    if (title === 'Hamburguesas') {
      if (state.bread === '') {
        Alert.alert('¡No ha selecionado el tipo de pan!', 'Por favor seleccione el tipo de pan')
        return;
      }
      if (state.cheese === '') {
        Alert.alert('¡No ha selecionado el tipo de queso!', 'Por favor seleccione el tipo de queso')
        return;
      }
    }
    if (title === 'Combos') {
      if (state.bread === '') {
        Alert.alert('¡No ha selecionado el tipo de pan!', 'Por favor seleccione el tipo de pan')
        return;
      }
      if (state.cheese === '') {
        Alert.alert('¡No ha selecionado el tipo de queso!', 'Por favor seleccione el tipo de queso')
        return;
      }
      if (state.fries === '') {
        Alert.alert('¡No ha selecionado el tipo de papas fritas!', 'Por favor seleccione el tipo de papas fritas')
        return;
      }
      /*if(state.singleCheese === false && state.doubleCheese === false){
        Alert.alert('¡No ha selecionado el tipo de queso!', 'Por favor seleccione el tipo de queso')
        return;
      }*/
    }
    if (name === 'Papa Francesa') {
      if (state.fries === '') {
        Alert.alert('¡No ha selecionado el tipo de papas fritas!', 'Por favor seleccione el tipo de papas fritas')
        return;
      }
    }
    /*if (name === 'Bebidas') {
      if (state.smallFries === false && state.bigFries === false) {
        Alert.alert('¡No ha selecionado el tipo de papas fritas!', 'Por favor seleccione el tipo de papas fritas')
        return;
      }
    }*/
    return (this.updateState({ isSelectedAdditions: false, price: this.state.total }),
      this.props.total(this.state.total))
  }

  renderItem = ({ item }) => <AdditionsItem
    updateState={this.updateState.bind(this)} item={item}
    nameProduct={this.props.nameProduct}
    titleProduct={this.props.titleProduct}
    price={this.props.price}
    updateTotal={this.updateTotal.bind(this)} />

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.product}>{this.props.nameProduct}</Text>
          <Text style={styles.productPrice}>$ {this.state.total}</Text>
        </View>
        <FlatList data={data} renderItem={this.renderItem} keyExtractor={(item, index) => item + index}
          showsVerticalScrollIndicator={false} />
        <View style={styles.containerButtons}>
          <TouchableHighlight onPress={() => {
            this.updateState({
              isSelectedAdditions: false,
              price: 0,
              bread: '',
              cheese: '',
              additions: ['', '', ''],
              fries: '',
              drinks: '',
            })
          }} underlayColor="white">
            <View style={styles.button}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight onPress={this.onPress} underlayColor="white">
            <View style={styles.buttonOrange}>
              <Text style={styles.buttonTextOrange}>Agregar</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -15,
    backgroundColor: '#FFF',
    borderRadius: 3,
    shadowColor: '#ccc',
    shadowOpacity: .2,
    elevation: 2,
  },
  containerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    //borderTopWidth: .5,
    //borderColor: '#c0c0c0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
    borderBottomWidth: .5,
    borderColor: '#c0c0c0',
  },
  product: {
    fontFamily: 'open-sans',
    fontSize: 16,
    color: '#211414',
  },
  productPrice: {
    fontFamily: 'open-sans',
    fontSize: 16,
    //color: '#211414',
    color: '#DE7047',
  },
  button: {
    width: (Dimensions.get('window').width - 40) / 2,
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  buttonOrange: {
    width: (Dimensions.get('window').width - 40) / 2,
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderLeftWidth: .5,
    borderColor: '#c0c0c0',
  },
  buttonText: {
    fontFamily: 'open-sans-bold',
    padding: 15,
    fontSize: 18,
    color: 'gray',
  },
  buttonTextOrange: {
    fontFamily: 'open-sans-bold',
    padding: 15,
    fontSize: 18,
    color: '#DE7047',
  },

})
