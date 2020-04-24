import React from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Icon from "react-native-vector-icons/FontAwesome";

const propTypes = {
    item: PropTypes.object
}

export default class AdditionsItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bread: '',
            cheese: '',
            additions: ['', '', ''],
            fries: '',
            drinks: '',
        };
    }

    componentWillUnmount = () => {
        this.props.updateState({
            bread: this.state.bread,
            cheese: this.state.cheese,
            additions: this.state.additions,
            fries: this.state.fries,
            drinks: this.state.drinks,
        });
    }

    updateTotal = (data) => {
        this.props.updateTotal(data);
    }

    onPress = (description, price) => {
        var additions = this.state.additions
        if (description === 'Pan Blanco') {
            if (this.state.bread === 'Pan Blanco') {
                this.updateTotal(-price)
                this.props.updateState({ bread: '' })
                return this.setState({ bread: '' })
            } else {
                this.updateTotal(price)
                this.props.updateState({ bread: description })
                return this.setState({ bread: description })
            }
        }
        if (description === 'Pan Finas Hierbas') {
            if (this.state.bread === 'Pan Finas Hierbas') {
                this.updateTotal(-price)
                this.props.updateState({ bread: '' })
                return this.setState({ bread: '' })
            } else {
                this.updateTotal(price)
                this.props.updateState({ bread: description })
                return this.setState({ bread: description })
            }
        }
        if (description === 'Queso Sencillo') {
            if (this.state.cheese === 'Queso Sencillo' || this.state.cheese === 'Queso Doble') {
                if (this.state.cheese === 'Queso Sencillo') {
                    this.updateTotal(-price)
                    this.props.updateState({ cheese: '' })
                    return this.setState({ cheese: '' })
                }
                if (this.state.cheese === 'Queso Doble') {
                    this.updateTotal(-1000)
                    this.props.updateState({ cheese: 'Queso Sencillo' })
                    return this.setState({ cheese: 'Queso Sencillo' })
                }
            } else {
                this.updateTotal(price)
                this.props.updateState({ cheese: description })
                return this.setState({ cheese: description })
            }
        }
        if (description === 'Queso Doble') {
            if (this.state.cheese === 'Queso Doble' || this.state.cheese === 'Queso Sencillo') {
                if (this.state.cheese === 'Queso Doble') {
                    this.updateTotal(-price)
                    this.props.updateState({ cheese: '' })
                    return this.setState({ cheese: '' })
                }
                if (this.state.cheese === 'Queso Sencillo') {
                    this.updateTotal(1000)
                    this.props.updateState({ cheese: 'Queso Doble' })
                    return this.setState({ cheese: 'Queso Doble' })
                }
            } else {
                this.updateTotal(price)
                this.props.updateState({ cheese: description })
                return this.setState({ cheese: description })
            }
        }
        if (description === 'Salami') {
            if (this.state.additions[0] === 'Salami') {
                this.updateTotal(-price)
                additions[0] = ''
                this.props.updateState({ additions: additions })
                return this.setState({ additions: additions })
            } else {
                this.updateTotal(price)
                additions[0] = description
                this.props.updateState({ additions: additions })
                return this.setState({ additions: additions })
            }
        }
        if (description === 'Tocineta') {
            if (this.state.additions[1] === 'Tocineta') {
                this.updateTotal(-price)
                additions[1] = ''
                this.props.updateState({ additions: additions })
                return this.setState({ additions: additions })
            } else {
                this.updateTotal(price)
                additions[1] = description
                this.props.updateState({ additions: additions })
                return this.setState({ additions: additions })
            }
        }
        if (description === 'Jamón') {
            if (this.state.additions[2] === 'Jamón') {
                this.updateTotal(-price)
                additions[2] = ''
                this.props.updateState({ additions: additions })
                return this.setState({ additions: additions })
            } else {
                this.updateTotal(price)
                additions[2] = description
                this.props.updateState({ additions: additions })
                return this.setState({ additions: additions })
            }
        }
        if (description === 'Papa Francesa 80 gr') {
            if (this.state.fries === 'Papa Francesa 80 gr' || this.state.fries === 'Papa Francesa 160 gr') {
                if (this.state.fries === 'Papa Francesa 80 gr') {
                    this.updateTotal(-price)
                    this.props.updateState({ fries: '' })
                    return this.setState({ fries: '' })
                }
                if (this.state.fries === 'Papa Francesa 160 gr') {
                    this.updateTotal(-1900)
                    this.props.updateState({ fries: 'Papa Francesa 80 gr' })
                    return this.setState({ fries: 'Papa Francesa 80 gr' })
                }
            } else {
                this.updateTotal(price)
                this.props.updateState({ fries: description })
                return this.setState({ fries: description })
            }
        }
        if (description === 'Papa Francesa 160 gr') {
            if (this.state.fries === 'Papa Francesa 160 gr' || this.state.fries === 'Papa Francesa 80 gr') {
                if (this.state.fries === 'Papa Francesa 160 gr') {
                    this.updateTotal(-price)
                    this.props.updateState({ fries: '' })
                    return this.setState({ fries: '' })
                }
                if (this.state.fries === 'Papa Francesa 80 gr') {
                    this.updateTotal(1900)
                    this.props.updateState({ fries: 'Papa Francesa 160 gr' })
                    return this.setState({ fries: 'Papa Francesa 160 gr' })
                }
            } else {
                this.updateTotal(price)
                this.props.updateState({ fries: description })
                return this.setState({ fries: description })
            }
        }
        if (description === '7up') {
            if (this.state.drinks === '7up' || this.state.drinks === 'Coca Cola' || this.state.drinks === 'Pepsi') {
                if (this.state.drinks === '7up') {
                    this.updateTotal(-price)
                    this.props.updateState({ drinks: '' })
                    return this.setState({ drinks: '' })
                } else {
                    //this.updateTotal(-price)
                    this.props.updateState({ drinks: '7up' })
                    return this.setState({ drinks: '7up' })
                }
            } else {
                this.updateTotal(price)
                this.props.updateState({ drinks: description })
                return this.setState({ drinks: description })
            }
        }
        if (description === 'Coca Cola') {
            if (this.state.drinks === '7up' || this.state.drinks === 'Coca Cola' || this.state.drinks === 'Pepsi') {
                if (this.state.drinks === 'Coca Cola') {
                    this.updateTotal(-price)
                    this.props.updateState({ drinks: '' })
                    return this.setState({ drinks: '' })
                } else {
                    //this.updateTotal(-price)
                    this.props.updateState({ drinks: 'Coca Cola' })
                    return this.setState({ drinks: 'Coca Cola' })
                }
            } else {
                this.updateTotal(price)
                this.props.updateState({ drinks: description })
                return this.setState({ drinks: description })
            }
        }
        if (description === 'Pepsi') {
            if (this.state.drinks === '7up' || this.state.drinks === 'Coca Cola' || this.state.drinks === 'Pepsi') {
                if (this.state.drinks === 'Pepsi') {
                    this.updateTotal(-price)
                    this.props.updateState({ drinks: '' })
                    return this.setState({ drinks: '' })
                } else {
                    //this.updateTotal(-price)
                    this.props.updateState({ drinks: 'pepsi' })
                    return this.setState({ drinks: 'Pepsi' })
                }
            } else {
                this.updateTotal(price)
                this.props.updateState({ drinks: description })
                return this.setState({ drinks: description })
            }
        }
    }

    renderTitle = (name, title, product) => {

        var condition = false;

        if (title === 'Hamburguesas' && (name === 'TIPO DE PAN' || name === 'QUESO MOZARRELLA')) condition = true;
        if (title === 'Acompañamientos' && (name === 'PAPAS FRITAS' || name === 'BEBIDAS')) condition = true;
        if (title === 'Combos' && (name === 'TIPO DE PAN' || name === 'QUESO MOZARRELLA' ||
            name === 'PAPAS FRITAS' || name === 'BEBIDAS')) condition = true;
        if ((title === 'Perros' || product === 'Combo Perro Caliente')
            && name === 'TIPO DE PAN') return;
        if (title === 'Chorizos') {
            if (name === 'TIPO DE PAN' || name === 'QUESO MOZARRELLA') return;
            if (product === 'Chorizo con Arepa' && name === 'OTROS ADICIONALES') return;
        }
        if (title === 'Pinchos' &&
            (name === 'TIPO DE PAN' || name === 'QUESO MOZARRELLA' || name === 'OTROS ADICIONALES')) return;
        if (title === 'Bolitas' &&
            (name === 'TIPO DE PAN' || name === 'PAPAS FRITAS' || name === 'QUESO MOZARRELLA')) return;
        if (title === 'Acompañamientos' && (name === 'TIPO DE PAN' ||
            name === 'QUESO MOZARRELLA' || name === 'OTROS ADICIONALES')) return;
        if (product === 'Papa Francesa' && name === 'BEBIDAS') return;
        if (product === 'Bebidas' && name === 'PAPAS FRITAS') return;
        return (
            <View style={styles.header}>
                <Text style={styles.sectionHeader}>{name}</Text>
                {condition && <Text style={styles.sectionHeaderCondition}> (Obligatorio)</Text>}
            </View>
        )
    }

    renderDetails = (name, title, product) => {
        var details = [];
        var icon = <Icon name={'check-square-o'} color="#6E6E6E" size={16} />
        var icon_square = <Icon name={'square-o'} color="#6E6E6E" size={16} />
        var description = this.props.item.description;
        var price = this.props.item.price;

        for (let i = 0; description[i] != null; i++) {
            if ((title === 'Perros' || product === 'Combo Perro Caliente')
                && name === 'TIPO DE PAN') continue;
            if (title === 'Chorizos') {
                if (name === 'TIPO DE PAN' || name === 'QUESO MOZARRELLA') continue;
                if (product === 'Chorizo con Arepa' && name === 'OTROS ADICIONALES') continue;
            }
            if (title === 'Pinchos' &&
                (name === 'TIPO DE PAN' || name === 'QUESO MOZARRELLA' || name === 'OTROS ADICIONALES')) continue;
            if (title === 'Bolitas' &&
                (name === 'TIPO DE PAN' || name === 'PAPAS FRITAS' || name === 'QUESO MOZARRELLA')) continue;
            if (title === 'Acompañamientos' && (name === 'TIPO DE PAN' ||
                name === 'QUESO MOZARRELLA' || name === 'OTROS ADICIONALES')) continue;
            if (product === 'Papa Francesa' && name === 'BEBIDAS') continue;
            if (product === 'Bebidas' && name === 'PAPAS FRITAS') continue;
            details.push(
                <TouchableWithoutFeedback key={i} onPress={() => this.onPress(description[i], price[i])}>
                    <View style={styles.itemContainer}>
                        <View style={{ flex: 1, alignItems: 'flex-start' }}>
                            {this.state.bread === 'Pan Blanco' && description[i] === 'Pan Blanco' && icon}
                            {(this.state.bread === '' || this.state.bread === 'Pan Finas Hierbas')
                                && description[i] === 'Pan Blanco' && icon_square}
                            {this.state.bread === 'Pan Finas Hierbas' && description[i] === 'Pan Finas Hierbas' && icon}
                            {(this.state.bread === '' || this.state.bread === 'Pan Blanco') 
                                && description[i] === 'Pan Finas Hierbas' && icon_square}
                            {this.state.cheese === 'Queso Sencillo' && description[i] === 'Queso Sencillo' && icon}
                            {(this.state.cheese === '' || this.state.cheese === 'Queso Doble')
                                && description[i] === 'Queso Sencillo' && icon_square}
                            {this.state.cheese === 'Queso Doble' && description[i] === 'Queso Doble' && icon}
                            {(this.state.cheese === '' || this.state.cheese === 'Queso Sencillo') 
                                && description[i] === 'Queso Doble' && icon_square}
                            {this.state.additions[0] === 'Salami' && description[i] === 'Salami' && icon}
                            {this.state.additions[0] === '' && description[i] === 'Salami' && icon_square}
                            {this.state.additions[1] === 'Tocineta' && description[i] === 'Tocineta' && icon}
                            {this.state.additions[1] === '' && description[i] === 'Tocineta' && icon_square}
                            {this.state.additions[2] === 'Jamón' && description[i] === 'Jamón' && icon}
                            {this.state.additions[2] === '' && description[i] === 'Jamón' && icon_square}
                            {this.state.fries === 'Papa Francesa 80 gr' && description[i] === 'Papa Francesa 80 gr' && icon}
                            {(this.state.fries === '' || this.state.fries === 'Papa Francesa 160 gr') 
                                && description[i] === 'Papa Francesa 80 gr' && icon_square}
                            {this.state.fries === 'Papa Francesa 160 gr' && description[i] === 'Papa Francesa 160 gr' && icon}
                            {(this.state.fries === '' || this.state.fries === 'Papa Francesa 80 gr')  
                                && description[i] === 'Papa Francesa 160 gr' && icon_square}
                            {this.state.drinks === '7up' && description[i] === '7up' && icon}
                            {(this.state.drinks === '' || this.state.drinks === 'Coca Cola' || this.state.drinks === 'Pepsi') 
                                && description[i] === '7up' && icon_square}
                            {this.state.drinks === 'Coca Cola' && description[i] === 'Coca Cola' && icon}
                            {(this.state.drinks === '' || this.state.drinks === '7up' || this.state.drinks === 'Pepsi') 
                                && description[i] === 'Coca Cola' && icon_square}
                            {this.state.drinks === 'Pepsi' && description[i] === 'Pepsi' && icon}
                            {(this.state.drinks === '' || this.state.drinks === 'Coca Cola' || this.state.drinks === '7up')
                                && description[i] === 'Pepsi' && icon_square}
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 9 }}>
                            <Text style={styles.item}>{description[i]}</Text>
                            <Text style={styles.item}>$ {price[i]}</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
        return (
            details
        )
    }

    render() {
        return (
            <View style={styles.Container}>
                {this.renderTitle(this.props.item.title, this.props.titleProduct, this.props.nameProduct)}
                {this.renderDetails(this.props.item.title, this.props.titleProduct, this.props.nameProduct)}
            </View>
        );
    }
}

AdditionsItem.propTypes = propTypes;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 15,
        paddingLeft: 20,
        paddingRight: 15,
        paddingBottom: 15,
        backgroundColor: '#FAFAFA',
    },
    sectionHeader: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
        color: '#211414',
    },
    sectionHeaderCondition: {
        fontFamily: 'open-sans',
        fontSize: 12,
        color: '#211414',
    },
    item: {
        fontFamily: 'open-sans',
        fontSize: 12,
        color: '#8E8E93',
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        paddingLeft: 25,
        paddingRight: 25,
    },
});
