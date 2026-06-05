import { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { router } from "expo-router";
import { useUsuario } from "../context/UserContext";
import { colors } from "../constants/colors";

export default function HeaderMenu() {
  const [menuAberto, setMenuAberto] = useState(false);
  const { usuario, sair } = useUsuario();

  function fecharMenu() {
    setMenuAberto(false);
  }

  function irParaInicio() {
    fecharMenu();
    router.replace("/");
  }

  function irParaAnimais() {
    fecharMenu();
    router.push("/animais");
  }

  function irParaMeusAnimais() {
    fecharMenu();
    router.push("/meus-animais");
  }

  function irParaPerfil() {
    fecharMenu();

    if (usuario) {
      router.push("/perfil");
    } else {
      router.push("/login");
    }
  }

  function sairDaConta() {
    fecharMenu();
    sair();
    router.replace("/");
  }

  return (
    <>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setMenuAberto(true)}
      >
        <Text style={styles.menuButtonText}>Menu</Text>
      </TouchableOpacity>

      <Modal visible={menuAberto} transparent animationType="fade">
        <Pressable style={styles.overlay} onPress={fecharMenu}>
          <View style={styles.menuContainer}>
            <Text style={styles.menuTitle}>Navegação</Text>

            <TouchableOpacity style={styles.optionButton} onPress={irParaInicio}>
              <Text style={styles.optionText}>Página inicial</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionButton} onPress={irParaAnimais}>
              <Text style={styles.optionText}>Animais disponíveis</Text>
            </TouchableOpacity>

            {usuario?.perfil === "doador" && (
              <TouchableOpacity
                style={styles.optionButton}
                onPress={irParaMeusAnimais}
              >
                <Text style={styles.optionText}>Meus animais</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.optionButton} onPress={irParaPerfil}>
              <Text style={styles.optionText}>
                {usuario ? "Meu perfil" : "Fazer login"}
              </Text>
            </TouchableOpacity>

            {usuario && (
              <TouchableOpacity style={styles.logoutButton} onPress={sairDaConta}>
                <Text style={styles.logoutText}>Sair do perfil</Text>
              </TouchableOpacity>
            )}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    backgroundColor: colors.white,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  menuButtonText: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 13,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 70,
    paddingRight: 16,
  },
  menuContainer: {
    width: 240,
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 12,
  },
  optionButton: {
    backgroundColor: colors.primaryLight,
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  optionText: {
    color: colors.primaryDark,
    fontWeight: "bold",
    textAlign: "center",
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: colors.danger,
    padding: 12,
    borderRadius: 10,
    marginTop: 4,
  },
  logoutText: {
    color: colors.danger,
    fontWeight: "bold",
    textAlign: "center",
  },
});