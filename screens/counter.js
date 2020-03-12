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
                    <Text style={styles.counterNum}>{this.props.user.count}</Text>
                    <Text style={styles.counterText}>Contador</Text>
                    <TouchableOpacity style={styles.incrementBtn} onPress={() => this.props.incrementCounter()}>
                        <Text style={styles.incrementText}>+</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footerContainer}>
                    <TouchableOpacity style={styles.signOutBtn} onPress={() => this.handleSignout()}>
                        <Text style={styles.signOutText}>Cerrar Sesión</Text>
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
        flex:1,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "stretch",
        alignContent: "center"
    },
    counterContainer: {
        flex: 2,
        backgroundColor: '#4451EC',
        paddingLeft:"10vw",
        paddingVertical:40
    },
    footerContainer: {
        flex: 1,
        alignSelf:"stretch",
        alignItems: "center",
        backgroundColor: 'white'
    },
    signOutBtn: {
        width: "80%",
        backgroundColor: "#4339CE",
        borderRadius: 5,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    signOutText: {
        color: "white"
    },
    incrementBtn: {
        width: "25vmin",
        height: "20vmin",
        backgroundColor: "white",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    incrementText: {
        color: "#4339CE",
        fontSize: 70,
    },
    counterText: {
        color: "white",
        fontSize: 25,
    },
    counterNum:{
        color: "white",
        fontSize: 60,  
    }
})