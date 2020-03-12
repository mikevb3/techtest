import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Button } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEmail, updatePassword, login, getUser } from '../actions/user'
import Firebase from '../config/firebase_config'

class Login extends React.Component {
    handleLogin = () => {
        this.props.login()
        this.props.navigation.navigate('Counter')
    }

    componentDidMount = () => {
        Firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.getUser(user.uid)
                if (this.props.user != null) {
                    this.props.navigation.navigate('Counter')
                }
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.logo}>We are Lernit</Text>
                <Text style={styles.logoSubtitle}>Mejora tu experiencia de aprendizaje.</Text>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        value={this.props.user.email || '' }
                        onChangeText={email => this.props.updateEmail(email)}
                        placeholder='Correo electrónico'
                        placeholderTextColor="#666"
                        autoCapitalize='none' />
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        secureTextEntry
                        style={styles.inputText}
                        value={this.props.user.password || ''}
                        placeholder="Contraseña..."
                        placeholderTextColor="#666"
                        onChangeText={password => this.props.updatePassword(password)} />
                </View>
                <TouchableOpacity style={styles.loginBtn} onPress={() => this.props.login()}>
                    <Text style={styles.loginText}>Iniciar Sesión</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.loginBtn} onPress={() => this.props.navigation.navigate('Signup')}>
                    <Text style={styles.loginText}>Registrarse</Text>
                </TouchableOpacity>


            </View>
        );
    }
}

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
    logoSubtitle:{
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


const mapDispatchToProps = dispatch => {
    return bindActionCreators({ updateEmail, updatePassword, login, getUser }, dispatch)
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)