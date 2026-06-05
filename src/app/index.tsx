import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { router } from "expo-router";
import { colors } from "../constants/colors";
import { useUsuario } from "../context/UserContext";

export default function HomeScreen() {
  const { usuario } = useUsuario();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.logo}>🐾</Text>

      <Text style={styles.title}>Adota Pet</Text>

      <Text style={styles.subtitle}>
        Conectando pessoas que desejam doar e adotar animais domésticos de forma
        simples, rápida e segura.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Como funciona?</Text>

        <Text style={styles.cardText}>
          Doador: cadastra animais disponíveis para adoção com foto, idade, raça,
          localização e telefone para contato.
        </Text>

        <Text style={styles.cardText}>
          Adotante: visualiza os animais disponíveis e entra em contato direto
          com o doador pelo WhatsApp.
        </Text>
      </View>

      {usuario ? (
        <View style={styles.userBox}>
          <Text style={styles.userText}>Logado como: {usuario.nome}</Text>

          <Text style={styles.userProfile}>
            Perfil: {usuario.perfil === "doador" ? "Doador" : "Adotante"}
          </Text>
        </View>
      ) : (
        <Text style={styles.guestText}>
          Acesse sua conta ou crie um cadastro para usar todos os recursos.
        </Text>
      )}

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => router.push("/animais")}
      >
        <Text style={styles.primaryButtonText}>Ver animais disponíveis</Text>
      </TouchableOpacity>

      {!usuario && (
        <>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push("/login")}
          >
            <Text style={styles.secondaryButtonText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push("/cadastro")}
          >
            <Text style={styles.secondaryButtonText}>Criar conta</Text>
          </TouchableOpacity>
        </>
      )}

      {usuario?.perfil === "doador" && (
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push("/meus-animais")}
        >
          <Text style={styles.secondaryButtonText}>Meus animais cadastrados</Text>
        </TouchableOpacity>
      )}

      {usuario && (
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => router.push("/perfil")}
        >
          <Text style={styles.linkText}>Ir para meu perfil</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 24,
    paddingBottom: 40,
    justifyContent: "center",
  },
  logo: {
    fontSize: 64,
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 18,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    marginBottom: 10,
  },
  userBox: {
    backgroundColor: colors.primaryLight,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    marginBottom: 18,
  },
  userText: {
    fontSize: 15,
    color: colors.primaryDark,
    fontWeight: "bold",
  },
  userProfile: {
    fontSize: 14,
    color: colors.primaryDark,
    marginTop: 4,
  },
  guestText: {
    fontSize: 14,
    color: colors.muted,
    textAlign: "center",
    marginBottom: 18,
    lineHeight: 20,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  secondaryButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  linkButton: {
    padding: 12,
  },
  linkText: {
    color: colors.primary,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
  },
});