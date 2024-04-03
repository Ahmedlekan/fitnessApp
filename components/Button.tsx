import {StyleProp,StyleSheet,Text,TextStyle,TouchableOpacity,View,ViewStyle,
} from "react-native";
import React, { ReactNode } from "react";
   
interface Props {
style?: StyleProp<ViewStyle>;
children: ReactNode;
onPress?: () => void;
}
  
const Button = ({ style, children, onPress }: Props) => {
return (
    <TouchableOpacity
    onPress={onPress}
    style={[styles.btn,style,]}
    >
    <Text>
        {children}
    </Text>
    </TouchableOpacity>
);
};

export default Button;

const styles = StyleSheet.create({
btn:{
    backgroundColor: "#ADF547",
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center"
    }
});