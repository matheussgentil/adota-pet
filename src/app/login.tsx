import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { useUsuario } from "../context/UserContext";
import type { PerfilUsuario } from "../context/UserContext";

export default function LoginScreen() {
  const { loginUsuario } = useUsuario();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [perfil, setPerfil] = useState<PerfilUsuario>("adotante");

  function realizarLogin() {
    if (!email || !senha) {
      Alert.alert("Atenção", "Informe e-mail e senha.");
      return;
    }

    loginUsuario(email, perfil);

    router.replace("/animais");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <Text style={styles.label}>Entrar como</Text>

      <View style={styles.profileContainer}>
        <TouchableOpacity
          style={[
            styles.profileButton,
            perfil === "doador" && styles.profileButtonSelected,
          ]}
          onPress={() => setPerfil("doador")}
        >
          <Text
            style={[
              styles.profileText,
              perfil === "doador" && styles.profileTextSelected,
            ]}
          >
            Doador
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.profileButton,
            perfil === "adotante" && styles.profileButtonSelected,
          ]}
          onPress={() => setPerfil("adotante")}
        >
          <Text
            style={[
              styles.profileText,
              perfil === "adotante" && styles.profileTextSelected,
            ]}
          >
            Adotante
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={realizarLogin}>
        <Text style={styles.buttonText}>Acessar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/cadastro")}>
        <Text style={styles.link}>Ainda não tenho conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#FFF7ED",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#EA580C",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#FED7AA",
  },
  label: {
    fontSize: 16,
    color: "#44403C",
    fontWeight: "600",
    marginBottom: 8,
  },
  profileContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  profileButton: {
    flex: 1,
    backgroundColor: "#FFEDD5",
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FDBA74",
  },
  profileButtonSelected: {
    backgroundColor: "#EA580C",
    borderColor: "#EA580C",
  },
  profileText: {
    color: "#EA580C",
    fontWeight: "bold",
    textAlign: "center",
  },
  profileTextSelected: {
    color: "#FFFFFF",
  },
  button: {
    backgroundColor: "#EA580C",
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  link: {
    textAlign: "center",
    color: "#EA580C",
    marginTop: 20,
    fontWeight: "600",
  },
});