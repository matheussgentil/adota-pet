import { Stack } from "expo-router";
import { AnimalProvider } from "../context/AnimalContext";
import { UserProvider } from "../context/UserContext";
import HeaderMenu from "../components/HeaderMenu";

export default function RootLayout() {
  return (
    <UserProvider>
      <AnimalProvider>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "#EA580C",
            },
            headerTintColor: "#FFFFFF",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerRight: () => <HeaderMenu />,
            contentStyle: {
              backgroundColor: "#FFF7ED",
            },
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: "Adota Pet",
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="login"
            options={{
              title: "Entrar",
            }}
          />

          <Stack.Screen
            name="cadastro"
            options={{
              title: "Criar conta",
            }}
          />

          <Stack.Screen
            name="animais"
            options={{
              title: "Animais disponíveis",
            }}
          />

          <Stack.Screen
            name="cadastrar-animal"
            options={{
              title: "Cadastrar animal",
            }}
          />

          <Stack.Screen
            name="detalhes-animal"
            options={{
              title: "Detalhes do animal",
            }}
          />

          <Stack.Screen
            name="perfil"
            options={{
              title: "Meu perfil",
            }}
          />

          <Stack.Screen
            name="meus-animais"
            options={{
              title: "Meus animais",
            }}
          />
        </Stack>
      </AnimalProvider>
    </UserProvider>
  );
}