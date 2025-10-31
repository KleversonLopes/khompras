import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider 
      value={DefaultTheme}
      //value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <Stack>
        <Stack.Screen 
          name="pages/home/Home" 
          options={{ title: 'khompras' }} 
        />

        <Stack.Screen 
          name="pages/compra/Detalhes" 
          options={{ title: 'Detalhes' }} 
        />

        <Stack.Screen 
          name="pages/compra/Compra" 
          options={{ title: 'Nova Compra' }} 
        />

        <Stack.Screen 
          name="pages/historico/Historico" 
          options={{ title: 'Histórico de Compras' }} 
        />

        <Stack.Screen 
          name="pages/tools/Tools" 
          options={{ title: 'Ferramentas' }} 
        />

        <Stack.Screen 
          name="pages/sobre/Sobre" 
          options={{ title: 'Sobre o App' }} 
        />

        <Stack.Screen 
          name="pages/bottomSheet/bottomSheet" 
          options={{ title: 'Bottom Sheet' }} 
        />

      </Stack>
      {/*<StatusBar barStyle={"default"}/>*/}
    </ThemeProvider>
  );
}
