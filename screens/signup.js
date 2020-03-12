import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Button } from 'react-native';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEmail, updatePassword, signup } from '../actions/user'

import Firebase from '../config/firebase_config';

class Signup extends React.Component {

    handleSignUp = () => {
        this.props.signup()
        this.props.navigation.navigate('Login')
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        value={this.props.user.email || '' }
                        onChangeText={email => this.props.updateEmail(email)}
                        placeholder='Email'
                        placeholderTextColor="#666"
                        autoCapitalize='none' />
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        secureTextEntry
                        style={styles.inputText}
                        value={this.props.user.password || ''}
                        placeholder="Password..."
                        placeholderTextColor="#666"
                        onChangeText={password => this.props.updatePassword(password)} />
                </View>
                <TouchableOpacity style={styles.loginBtn} onPress={this.handleSignUp}>
                    <Text style={styles.loginText}>Registrarse</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                    <Text>Cancelar</Text>
                </TouchableOpacity>


            </View>
        );
    }
}

// Redux Definition

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ updateEmail, updatePassword, signup }, dispatch)
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Signup)

// Styles

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#4339CE"
    },
    logoSubtitle: {
        fontSize: 10,
        color: "#666",
        marginBottom: 20
    },
    inputView: {
        width: "80%",
        backgroundColor: "#e1e5eb",
        borderRadius: 5,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
        color: "white"
    },
    forgot: {
        color: "white",
        fontSize: 11
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#4339CE",
        borderRadius: 5,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    loginText: {
        color: "white"
    }
});