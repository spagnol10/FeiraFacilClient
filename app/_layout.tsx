import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* <CartProvider> */}
        <Stack>

          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="ForgotPassword" options={{ headerShown: false }} />
          <Stack.Screen name="RegisterScreen" options={{ headerShown: false }} />
          <Stack.Screen name="ResetPassword" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="PagamentoScreen" options={{ headerShown: false }} />
          <Stack.Screen name="VendaRealizadaScreen" options={{ headerShown: false }} />
        </Stack>
      {/* </CartProvider> */}
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
