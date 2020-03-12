import React from 'react'
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateCount, incrementCounter } from '../actions/user'
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
                <Text>Profile Screen</Text>
                <Text>{this.props.user.email}</Text>
                <Text>{this.props.user.count}</Text>
                <Button title='Logout' onPress={this.handleSignout} />
                <TouchableOpacity onPress={() => this.props.incrementCounter()}>
                    <Text >+</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ updateCount, incrementCounter }, dispatch)
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