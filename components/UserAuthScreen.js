// UserAuthScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Image,Alert } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseApp } from '../firebaseConfig';
import userIcon from '../assets/user.png'; 
import { Ionicons } from '@expo/vector-icons'; 

const UserAuthScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const auth = getAuth(firebaseApp);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAuthentication = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Please enter a valid email address.');
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        alert('User signed in successfully!');
        navigation.replace('Home'); 
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('User created successfully!');
        navigation.replace('Home'); 
      }
    } catch (error) {
      alert(error.message); 
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image 
        source={userIcon} 
        style={styles.icon}
      />
      <Text style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity style={styles.iconContainer} onPress={() => setShowPassword(!showPassword)}>
          <Ionicons 
            name={showPassword ? 'eye-off' : 'eye'} 
            size={24} 
            color="#3498db" 
          />
        </TouchableOpacity>
      </View>
      <Button title={isLogin ? 'Sign In' : 'Sign Up'} onPress={handleAuthentication} color="#3498db" />
      <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Need an account? Register' : 'Already have an account? Sign In'}
      </Text>
    </ScrollView>
  );
};

export default UserAuthScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FAFAFA',
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 25,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 25,
  },
  input: {
    height: 50,
    width: '85%',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    marginBottom: 20,
  },
  passwordContainer: {
    position: 'relative',
    width: '85%',
    marginBottom: 20,
  },
  passwordInput: {
    height: 50,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    paddingRight: 50, // Space for the icon
  },
  iconContainer: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  toggleText: {
    color: '#3498db',
    marginTop: 20,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});
