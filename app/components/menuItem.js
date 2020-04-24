import React from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet, AppRegistry, Image } from 'react-native';
import PropTypes from 'prop-types';
import Icon from "react-native-vector-icons/FontAwesome";

const propTypes = {
    item: PropTypes.object
}

export default class MenuItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isSelectedItem: false,
        };
    }

    updateState(data) {
        this.props.updateParentState(data);
    }

    updateParentState(data) {
        this.props.updateParentParentState(data);
    }

    onPress = () => {
        this.setState((prevState, prevProps) => ({
            isSelectedItem: !prevState.isSelectedItem,
        }))
    }

    onPressFather = (name, price, title) => {
        this.updateParentState({ isSelectedAdditions: true })
        this.updateState({ nameProduct: name })
        this.updateState({ price: price })
        this.updateParentState({ nameProduct: name })
        this.updateState({ titleProduct: title })
    }

    renderDetails = (title) => {
        var details = [];
        var description = this.props.item.description;
        var price = this.props.item.price;

        for (let i = 0; description[i] != null; i++) {
            details.push(
                <TouchableWithoutFeedback key={i} onPress={() =>
                    this.onPressFather(description[i], price[i], title)} >
                    <View style={styles.descriptionContainer}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            {(title === 'Hamburguesas') &&
                                <Image
                                    style={{ width: 60, height: 60 }}
                                    source={require('../assets/img/burguer.png')}
                                />
                            }
                            {(title === 'Perros') &&
                                <Image
                                    style={{ width: 80, height: 60 }}
                                    source={require('../assets/img/hotdog.png')}
                                />
                            }
                            {(title === 'Chorizos') &&
                                <Image
                                    style={{ width: 80, height: 60 }}
                                    source={require('../assets/img/granjero.png')}
                                />
                            }
                            <View style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
                                <Text style={styles.description}>{description[i]}</Text>
                                {description[i] !== 'Papa Francesa' && description[i] !== 'Bebidas' &&
                                    <Text style={styles.description}>$ {price[i]}</Text>}
                            </View>
                        </View>
                        <Icon
                            name={'plus'}
                            color="#6E6E6E"
                            size={10} />
                    </View>
                </TouchableWithoutFeedback>
            )
        }
        return (
            details
        )
    }

    onChangeArrow = (isSelectedItem) => {
        if (isSelectedItem) {
            return (<Icon
                name={'chevron-up'}
                color="#211414"
                size={10} />
            )
        } else {
            return (<Icon
                name={'chevron-down'}
                color="#211414"
                size={10} />
            )
        }
    }

    render() {
        const { isSelectedItem } = this.state;
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={this.onPress}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{this.props.item.title}</Text>
                        {this.onChangeArrow(isSelectedItem)}
                    </View>
                </TouchableWithoutFeedback>
                {isSelectedItem && this.renderDetails(this.props.item.title)}
            </View>
        );
    }
}

MenuItem.propTypes = propTypes;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 4,
        marginBottom: 4,
        marginLeft: 20,
        marginRight: 20,
    },
    titleContainer: {
        padding: 15,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 3,
        shadowColor: '#ccc',
        shadowOpacity: .2,
        elevation: 2,
    },
    descriptionContainer: {
        marginLeft: 14,
        marginTop: 8,
        padding: 15,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 3,
        shadowColor: '#ccc',
        shadowOpacity: .2,
        elevation: 2,
    },
    description: {
        fontFamily: 'open-sans', 
        fontSize: 14,
        color: 'gray',
        marginLeft: 10,
    },
    title: {
        flex: 1,
        fontFamily: 'open-sans', 
        fontSize: 14,
    },
});


AppRegistry.registerComponent('MenuItem', () => MenuItem);