import React from 'react'
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateCount, incrementCounter, getUser } from '../actions/user'
import Firebase from '../config/firebase_config'

class Counter extends React.Component {
    handleSignout = () => {
        Firebase.auth().signOut()
        this.props.navigation.navigate('Login')
    }

    componentDidMount = () => {
        Firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.getUser(user.uid)
                if (this.props.user == null) {
                    this.props.navigation.navigate('Login')
                }
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.counterContainer}>
                    <Text>Profile Screen</Text>
                    <Text>{this.props.user.email}</Text>
                    <Text>{this.props.user.count}</Text>
                    <TouchableOpacity style={styles.loginBtn} onPress={() => this.props.incrementCounter()}>
                        <Text style={styles.loginText}>+</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.loginBtn} onPress={() => this.handleSignout()}>
                        <Text style={styles.loginText}>Cerrar Sesión</Text>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ updateCount, incrementCounter, getUser }, dispatch)
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter)

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    counterContainer: {
        flex: 2,
        backgroundColor: '#4451EC'
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
})