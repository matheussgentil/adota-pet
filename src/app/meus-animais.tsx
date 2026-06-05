import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";
import AnimalCard from "../components/AnimalCard";
import { useAnimais } from "../context/AnimalContext";
import { useUsuario } from "../context/UserContext";
import { colors } from "../constants/colors";
import type { Animal } from "../types/Animal";

export default function MeusAnimaisScreen() {
  const { animais, removerAnimal } = useAnimais();
  const { usuario } = useUsuario();

  const meusAnimais: Animal[] = animais.filter((animal) => {
    return animal && animal.id && animal.donoEmail === usuario?.email;
  });

  function irParaLogin() {
    router.push("/login");
  }

  function irParaPerfil() {
    router.push("/perfil");
  }

  function irParaCadastroAnimal() {
    router.push("/cadastrar-animal");
  }

  function removerAnimalCadastrado(id: number, nome: string) {
    removerAnimal(id);

    Alert.alert("Animal removido", `${nome} foi removido da lista de adoção.`);
  }

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Meus animais</Text>

        <View style={styles.noticeBox}>
          <Text style={styles.noticeText}>
            Faça login para visualizar seus animais cadastrados.
          </Text>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={irParaLogin}>
          <Text style={styles.addButtonText}>Fazer login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (usuario.perfil !== "doador") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Meus animais</Text>

        <View style={styles.noticeBox}>
          <Text style={styles.noticeText}>
            Essa área é destinada apenas aos usuários com perfil de doador.
          </Text>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={irParaPerfil}>
          <Text style={styles.addButtonText}>Alterar perfil</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus animais</Text>

      <Text style={styles.subtitle}>
        Aqui aparecem apenas os animais cadastrados por você.
      </Text>

      <TouchableOpacity style={styles.addButton} onPress={irParaCadastroAnimal}>
        <Text style={styles.addButtonText}>Cadastrar novo animal</Text>
      </TouchableOpacity>

      <FlatList
        data={meusAnimais}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View>
            <AnimalCard animal={item} />

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() =>
                removerAnimalCadastrado(item.id, item.nome || "Animal")
              }
            >
              <Text style={styles.deleteButtonText}>Remover animal</Text>
            </TouchableOpacity>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Você ainda não cadastrou nenhum animal.
          </Text>
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 8,
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
    marginBottom: 20,
  },
  addButtonText: {
    color: colors.white,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: colors.danger,
    padding: 12,
    borderRadius: 10,
    marginTop: -8,
    marginBottom: 20,
    backgroundColor: colors.white,
  },
  deleteButtonText: {
    color: colors.danger,
    textAlign: "center",
    fontWeight: "bold",
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