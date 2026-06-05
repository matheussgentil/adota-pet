import { useState } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { useAnimais } from "../context/AnimalContext";
import { useUsuario } from "../context/UserContext";
import type { TipoAnimal } from "../types/Animal";

export default function CadastrarAnimalScreen() {
  const { cadastrarAnimal } = useAnimais();
  const { usuario } = useUsuario();

  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState<TipoAnimal>("Cachorro");
  const [raca, setRaca] = useState("");
  const [idade, setIdade] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [imagem, setImagem] = useState("");
  const [descricao, setDescricao] = useState("");
  const [telefoneDoador, setTelefoneDoador] = useState(usuario?.telefone || "");

  function salvarAnimal() {
    if (!usuario) {
      Alert.alert("Atenção", "Faça login para cadastrar um animal.");
      router.push("/login");
      return;
    }

    if (usuario.perfil !== "doador") {
      Alert.alert(
        "Acesso negado",
        "Apenas usuários com perfil de doador podem cadastrar animais."
      );
      router.push("/animais");
      return;
    }

    if (!nome || !raca || !idade || !localizacao || !descricao || !telefoneDoador) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios.");
      return;
    }

    cadastrarAnimal({
      nome,
      tipo,
      raca,
      idade,
      localizacao,
      imagem:
        imagem ||
        "https://images.unsplash.com/photo-1450778869180-41d0601e046e",
      descricao,
      donoEmail: usuario.email,
      telefoneDoador,
    });

    Alert.alert("Sucesso", "Animal cadastrado com sucesso!");

    router.push("/meus-animais");
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Cadastrar animal</Text>

      <Text style={styles.subtitle}>
        Preencha as informações do animal que ficará disponível para adoção.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do animal"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>Tipo do animal</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          style={[
            styles.typeButton,
            tipo === "Cachorro" && styles.typeButtonSelected,
          ]}
          onPress={() => setTipo("Cachorro")}
        >
          <Text
            style={[
              styles.typeButtonText,
              tipo === "Cachorro" && styles.typeButtonTextSelected,
            ]}
          >
            Cachorro
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.typeButton,
            tipo === "Gato" && styles.typeButtonSelected,
          ]}
          onPress={() => setTipo("Gato")}
        >
          <Text
            style={[
              styles.typeButtonText,
              tipo === "Gato" && styles.typeButtonTextSelected,
            ]}
          >
            Gato
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <TextInput
        style={styles.input}
        placeholder="Raça"
        value={raca}
        onChangeText={setRaca}
      />

      <TextInput
        style={styles.input}
        placeholder="Idade"
        value={idade}
        onChangeText={setIdade}
      />

      <TextInput
        style={styles.input}
        placeholder="Local de residência"
        value={localizacao}
        onChangeText={setLocalizacao}
      />

      <TextInput
        style={styles.input}
        placeholder="Telefone do doador"
        keyboardType="phone-pad"
        value={telefoneDoador}
        onChangeText={setTelefoneDoador}
      />

      <TextInput
        style={styles.input}
        placeholder="URL da foto do animal"
        value={imagem}
        onChangeText={setImagem}
        autoCapitalize="none"
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descrição do animal"
        value={descricao}
        onChangeText={setDescricao}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={salvarAnimal}>
        <Text style={styles.buttonText}>Salvar animal</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7ED",
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#EA580C",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#57534E",
    marginBottom: 20,
    lineHeight: 22,
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
  typeButton: {
    minWidth: 140,
    backgroundColor: "#FFEDD5",
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FDBA74",
    marginRight: 12,
    marginBottom: 12,
  },
  typeButtonSelected: {
    backgroundColor: "#EA580C",
    borderColor: "#EA580C",
  },
  typeButtonText: {
    color: "#EA580C",
    fontWeight: "bold",
    textAlign: "center",
  },
  typeButtonTextSelected: {
    color: "#FFFFFF",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
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
});