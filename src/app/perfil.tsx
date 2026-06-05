import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useUsuario } from "../context/UserContext";
import { colors } from "../constants/colors";

export default function PerfilScreen() {
  const { usuario, alterarPerfil, sair } = useUsuario();

  function sairDaConta() {
    sair();
    router.replace("/");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu perfil</Text>

      {usuario ? (
        <View style={styles.card}>
          <Text style={styles.label}>Nome</Text>
          <Text style={styles.value}>{usuario.nome}</Text>

          <Text style={styles.label}>E-mail</Text>
          <Text style={styles.value}>{usuario.email}</Text>

          <Text style={styles.label}>Telefone</Text>
          <Text style={styles.value}>
            {usuario.telefone || "Telefone não informado"}
          </Text>

          <Text style={styles.label}>Perfil atual</Text>
          <Text style={styles.value}>
            {usuario.perfil === "doador" ? "Doador" : "Adotante"}
          </Text>

          <Text style={styles.sectionTitle}>Alterar tipo de perfil</Text>

          <View style={styles.profileContainer}>
            <TouchableOpacity
              style={[
                styles.profileButton,
                usuario.perfil === "doador" && styles.profileButtonSelected,
              ]}
              onPress={() => alterarPerfil("doador")}
            >
              <Text
                style={[
                  styles.profileText,
                  usuario.perfil === "doador" && styles.profileTextSelected,
                ]}
              >
                Doador
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.profileButton,
                usuario.perfil === "adotante" && styles.profileButtonSelected,
              ]}
              onPress={() => alterarPerfil("adotante")}
            >
              <Text
                style={[
                  styles.profileText,
                  usuario.perfil === "adotante" && styles.profileTextSelected,
                ]}
              >
                Adotante
              </Text>
            </TouchableOpacity>
          </View>

          {usuario.perfil === "doador" && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/meus-animais")}
            >
              <Text style={styles.buttonText}>Ver meus animais</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/animais")}
          >
            <Text style={styles.buttonText}>Ver animais disponíveis</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={sairDaConta}>
            <Text style={styles.logoutButtonText}>Sair da conta</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.emptyText}>
            Nenhum usuário logado no momento.
          </Text>

          <TouchableOpacity style={styles.button} onPress={() => router.push("/login")}>
            <Text style={styles.buttonText}>Fazer login</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 20,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    fontSize: 14,
    color: colors.muted,
    fontWeight: "600",
    marginTop: 8,
  },
  value: {
    fontSize: 17,
    color: colors.text,
    marginTop: 4,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 12,
  },
  profileContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  profileButton: {
    flex: 1,
    backgroundColor: colors.primaryLight,
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  profileButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  profileText: {
    color: colors.primary,
    fontWeight: "bold",
    textAlign: "center",
  },
  profileTextSelected: {
    color: colors.white,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: {
    color: colors.white,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: colors.danger,
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
  },
  logoutButtonText: {
    color: colors.danger,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textLight,
    marginBottom: 20,
    lineHeight: 22,
  },
});