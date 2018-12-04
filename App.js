import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ListView,
  Alert,
  Button,
  Image,
  FlatList,
  Platform
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import MakeItRain from "react-native-make-it-rain";
import { Icon } from 'react-native-elements';
import MapView, { Marker, AnimatedRegion, Polyline } from "react-native-maps";
import haversine from "haversine";
import Map from "./map";


class Home extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#8B008B"
    }
  }


  render() {
    return (
      <View style={styles.home}>
        <MakeItRain numMoneys={20} moneyDimensions={{width: 100, height: 50}}/>
        <Text style={{ color: 'white', fontSize: 30, fontFamily: 'Courier New' }}>Welcome to</Text>
        <Text style={{ color: 'white', fontSize: 40, fontFamily: 'Courier New' }}>Donathon</Text>
        <View style={{ height: '30%', marginTop: 50, display: 'flex', flexDirection: 'column'}}>
          <TouchableOpacity onPress={ () => this.props.navigation.navigate('Login') } style={[styles.button, {backgroundColor: "#A9A9A9", width: 150, borderRadius: 20}]}>
            <Text style={styles.buttonLabel}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, {backgroundColor: '#696969', width: 150, borderRadius: 20}]} onPress={ () => this.props.navigation.navigate('Register') }>
            <Text style={styles.buttonLabel}>Register</Text>
          </TouchableOpacity>
          </View>
          <View style={{ display:'flex', alignItems: 'center', width: '100%', height: 150, marginTop: 5 }}>
            <Image source={require('./img/walking.png')} style={{flex: 1, width: '100%', height: '100%', resizeMode: 'contain'}}/>
          </View>
      </View>
    );
  }
}

class Login extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#DDA0DD"
    }
  }

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    }
  }

  login() {
    fetch('https://donathon-backend.herokuapp.com/login', {
      method: 'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    .then(response => {
    //  console.log(response);
      if (response.url === 'https://donathon-backend.herokuapp.com/feed') {
        this.props.navigation.navigate('Feed');
      } else {
        this.props.navigation.navigate('Home');
      }
    })
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#DDA0DD'}}>
        <Text style={[styles.textBig, {marginTop: 20, fontFamily: 'Courier New'}]}>Login</Text>
        <TextInput
          style={{height:30, width:250,backgroundColor:'white', margin:5, textAlign:'center', borderRadius: 15}}
          placeholder='Enter your username'
          onChangeText={(text)=>this.setState({username:text})}
        />
        <TextInput
          style={{height:30, width:250,backgroundColor:'white', margin:5, textAlign:'center', borderRadius: 15}}
          secureTextEntry={true}
          placeholder='Enter your password'
          onChangeText={(text)=>this.setState({password:text})}
        />
        <TouchableOpacity onPress={this.login.bind(this)} style={styles.button, {height: 35, alignItems: 'center', justifyContent: 'center', padding: 4, marginTop: 17, backgroundColor: '#A9A9A9', width: '40%', borderRadius: 360}}>
          <Text style={styles.buttonLabel}>Login</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

class Register extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#DDA0DD"
    }
  }
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      password2: ''
    }
  }

  register() {
    if (this.state.password != this.state.password2) {
      alert("Passwords do not match.")
    } else {
      fetch('https://donathon-backend.herokuapp.com/register', {
        method: 'POST',
        headers:{
        "Content-Type":"application/json"
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        })
      })
      .then((response) => {
        if (response.status === 200) {
          this.props.navigation.navigate('Home');
        }
      })
    }

  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#DDA0DD'}}>
        <Text style={[styles.textBig, {marginBottom: 20, fontFamily: 'Courier New'}]}>New User Registration</Text>
        <TextInput
          style={{height:30, width:250,backgroundColor:'white', margin:5, textAlign:'center', borderRadius: 15}}
          placeholder='Enter your username'
          onChangeText={(text)=>this.setState({username:text})}
        />
        <TextInput
          style={{height:30, width:250,backgroundColor:'white', margin:5, textAlign:'center', borderRadius: 15}}
          secureTextEntry={true}
          placeholder='Enter your password'
          onChangeText={(text)=>this.setState({password:text})}
        />
        <TextInput
          style={{height:30, width:250,backgroundColor:'white', margin:5, textAlign:'center', borderRadius: 15}}
          secureTextEntry={true}
          placeholder='Re-enter your password'
          onChangeText={(text)=>this.setState({password2:text})}
        />
        <TouchableOpacity onPress={this.register.bind(this)} style={styles.button, {height: 35, alignItems: 'center', justifyContent: 'center', padding: 4, marginTop: 17, backgroundColor: '#A9A9A9', width: '40%', borderRadius: 360}}>
          <Text style={styles.buttonLabel}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

class Feed extends React.Component {

  static navigationOptions  = (props) => ({
    headerStyle: {
      backgroundColor: '#DCDCDC',
    },
    headerRight:
      <TouchableOpacity onPress={()=>{
      fetch('https://donathon-backend.herokuapp.com/logout', {
        method: 'GET',
      })
      .then(response => {
        if (response.status === 200) {
          props.navigation.navigate('Home');
        } else {
          alert('could not log out')
        }
      })

      }}>
        <Text style={{marginRight: 10}}>Logout</Text>
      </TouchableOpacity>
    });

  donate() {
    fetch('https://donathon-backend.herokuapp.com/donate', {
      
    })
  }


  render() {
    return (
      <View style={{flex: 1, height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => this.buy()}>
          <Text style={{fontSize: 30}}>Donate</Text>
        </TouchableOpacity>

      </View>
    )
  }
}


export default StackNavigator({
  Home: {
    screen: Home
  },
  Login: {
    screen: Login
  },
  Register: {
    screen: Register
  },
  Feed: {
    screen: Feed
  }
}, {initialRouteName: 'Feed'})

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: '#8B008B',
    alignItems: 'center',
    paddingTop: 20
  },
  button: {
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5
  },
  buttonLabel: {
    textAlign: 'center',
    fontSize: 22,
    color: 'white',
    fontFamily: 'Courier New'
  },
  textBig: {
    fontSize: 36,
    textAlign: 'center',
    margin: 10,
    color:'white'
  },
});
