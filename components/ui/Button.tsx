import { useThemeContext } from "@/lib/hooks/useThemeContext";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const Button = () => {
  const theme = useThemeContext();

  function selectTheme() {
    switch (theme.theme) {
      case "default":
        return "bg-blue-500";
      case "dark":
        return "bg-gray-800";
      case "hallowen":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  }

  return (
    <TouchableOpacity className={selectTheme()}>
      <Text>Hola Mundo</Text>
    </TouchableOpacity>
  );
};

export default Button;