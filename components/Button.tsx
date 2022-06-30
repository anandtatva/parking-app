import React from "react";
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, ViewStyle } from "react-native";
import Colors from "../constants/Colors";

interface ButtonProps extends TouchableOpacityProps {
    name: string;
    testId?: string;
    onPress: () => void;
    rootStyle?: ViewStyle;
}

export { ButtonProps }
export default function Button({ testId, onPress, name, rootStyle = {}, ...rest }: ButtonProps) {

    return (
        <TouchableOpacity testID={testId} onPress={onPress} style={[styles.container, rootStyle]} {...rest}>
            <Text style={styles.nameTxt}>{name}</Text>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 8,
        paddingVertical: 10,
        backgroundColor: Colors.dark.background,
    },
    nameTxt: {
        textAlign: "center",
        color: Colors.dark.text

    }
})