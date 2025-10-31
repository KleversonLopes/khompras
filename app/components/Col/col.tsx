import Styles from "@/app/styles/Styles";
import React from "react";
import { View } from "react-native";

interface ColProps {
  children: React.ReactNode;
  style?: object;
}

const Col: React.FC<ColProps> = ({ children, style }) => {
  return (
    <View 
        style={[ Styles.col, {padding: 10}, style ]}
    >
        {children}
    </View>
  );
};

export default Col;
