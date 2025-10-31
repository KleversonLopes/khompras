import Styles from "@/app/styles/Styles";
import React from "react";
import { View } from "react-native";

interface ContainerProps {
  children: React.ReactNode;
  style?: object;
}

const Container: React.FC<ContainerProps> = ({ children, style }) => {
  return (
    <View style={[ Styles.container, {padding: 3} , style]} >
        {children}
    </View>
  );
};

export default Container;
