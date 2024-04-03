import {Dimensions,ImageBackground,StyleSheet,Text,TextInput,View} from "react-native";
import React,{useState} from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Redirect } from "expo-router";
import { useAuth } from "@/authContext/authContext";
import Button from "@/components/Button";
import { Stack } from "expo-router";


const OnBoardingScreen = () => {
    const [localUsername, setLocalUsername] = useState('');
  const { setUsername, username } = useAuth();

  const onSignIn = () => {
    setUsername(localUsername);
  };

  if (username) {
    return <Redirect href={'/'} />;
  }

  const { height } = Dimensions.get("window");

  return (
    <View style={{flex: 1}}>
        <Stack.Screen options={{ title: 'Sign in', headerTitleAlign:'center' }} />
        
        <ImageBackground
        source={require("../assets/images/onboarding.jpeg")}
        style={{flex: 1,justifyContent: "flex-end"}}
        >
        <LinearGradient
            style={{height: height / 2.5,paddingHorizontal: 30}}
            colors={[`rgba(0,0,0,0.1)`, "#000"]}
        >
            <View style={{gap:10}}>
                <Text style={styles.onBoardText}>
                    Stay health even if you stay at home
                </Text>

                <Text style={styles.label}>Username</Text>
                <TextInput
                    value={localUsername}
                    onChangeText={setLocalUsername}
                    placeholder="Username"
                    style={styles.input}
                />
                
                <Button onPress={onSignIn}>Get Started</Button>
            </View>

        </LinearGradient>
        </ImageBackground>
    </View>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  onBoardText:{
    fontSize: 35,
    color: "#fff",
    textAlign: "center"
  },
  onBoardText2:{
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 40
  },
  btn:{
    backgroundColor: "#ADF547",
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: "center"
  },
  label: {
    fontWeight: '600',
    fontSize: 20,
    color: 'gray',
    textAlign:'center'
  },
  input: {
    borderWidth: 1,
    borderColor: 'gainsboro',
    padding: 5,
    borderRadius: 5,
    color: 'white',
  },
});