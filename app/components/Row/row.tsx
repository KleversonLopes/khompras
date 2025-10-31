import Styles from "@/app/styles/Styles";
import React from "react";
import { View } from "react-native";

interface RowProps {
  children: React.ReactNode;
  style?: object;
}

const Row: React.FC<RowProps> = ({ children, style }) => {
    return (
        <View style={[ Styles.row, {padding: 5}, style ]}>
            {children}
        </View>
    );
};

export default Row;
