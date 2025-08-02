import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
// import * as LocalAuthentication from 'expo-local-authentication';
// import * as SecureStore from 'expo-secure-store';
import { RootState } from "../store/store";
import { setUser, setLoading } from "../store/userSlice";
import { authAPI } from "../services/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get("window");

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: RootState) => state.user);
  const [savedUser, setSavedUser] = useState<string | null>(null);

  useEffect(() => {
    checkSavedUser();
  }, []);

  const checkSavedUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const user = JSON.parse(userData);
        setSavedUser(user.name);
        dispatch(setUser({ ...user, isAuthenticated: true }));
      }
    } catch (error) {
      console.error('Error loading saved user:', error);
    }
  };

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    dispatch(setLoading(true));
    try {
      const user = await authAPI.login({ username, password });
      await AsyncStorage.setItem('userData', JSON.stringify(user));
      dispatch(setUser({ ...user, isAuthenticated: true }));
    } catch (error) {
      Alert.alert("Error", "Invalid credentials");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <View style={styles.header}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Switch Bank</Text>
        {savedUser && (
          <Text style={styles.welcomeText}>Welcome back, {savedUser}!</Text>
        )}
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          returnKeyType="next"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            returnKeyType="done"
            onSubmitEditing={handleLogin}
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={styles.eyeIcon}>
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text style={styles.loginButtonText}>
            {isLoading ? "Logging in..." : "Login"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 18,
    color: "#7f8c8d",
  },
  form: {
    width: "100%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },
  eyeButton: {
    padding: 12,
  },
  eyeIcon: {
    fontSize: 20,
  },
  loginButton: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
});

export default LoginScreen;









