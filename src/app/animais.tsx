import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import AnimalCard from "../components/AnimalCard";
import { useAnimais } from "../context/AnimalContext";
import { useUsuario } from "../context/UserContext";
import { colors } from "../constants/colors";
import type { Animal } from "../types/Animal";

export default function AnimaisScreen() {
  const { animais } = useAnimais();
  const { usuario } = useUsuario();

  const isDoador = usuario?.perfil === "doador";

  const animaisValidos: Animal[] = animais.filter((animal) => {
    return animal && animal.id && animal.nome;
  });

  function irParaPerfil() {
    router.push("/perfil");
  }

  function irParaCadastroAnimal() {
    router.push("/cadastrar-animal");
  }

  function irParaMeusAnimais() {
    router.push("/meus-animais");
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.title}>Animais para adoção</Text>

          <Text style={styles.profileText}>
            Perfil atual: {usuario ? usuario.perfil : "visitante"}
          </Text>
        </View>

        <TouchableOpacity style={styles.profileButton} onPress={irParaPerfil}>
          <Text style={styles.profileButtonText}>Perfil</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>
        Veja os animais cadastrados por doadores e demonstre interesse na adoção.
      </Text>

      {isDoador ? (
        <>
          <TouchableOpacity style={styles.addButton} onPress={irParaCadastroAnimal}>
            <Text style={styles.addButtonText}>Cadastrar animal</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={irParaMeusAnimais}>
            <Text style={styles.secondaryButtonText}>Ver meus animais</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.noticeBox}>
          <Text style={styles.noticeText}>
            Apenas usuários com perfil de doador podem cadastrar animais.
          </Text>
        </View>
      )}

      <FlatList
        data={animaisValidos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <AnimalCard animal={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum animal cadastrado ainda.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "center",
    marginBottom: 8,
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.primary,
  },
  profileText: {
    fontSize: 13,
    color: colors.muted,
    marginTop: 4,
    textTransform: "capitalize",
  },
  profileButton: {
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  profileButtonText: {
    color: colors.primary,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 15,
    color: colors.textLight,
    marginBottom: 16,
    lineHeight: 22,
  },
  addButton: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  addButtonText: {
    color: colors.white,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
  secondaryButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
  },
  secondaryButtonText: {
    color: colors.primary,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
  noticeBox: {
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
  },
  noticeText: {
    color: colors.primaryDark,
    fontSize: 14,
    lineHeight: 20,
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyText: {
    textAlign: "center",
    color: colors.textLight,
    marginTop: 32,
    fontSize: 16,
  },
});