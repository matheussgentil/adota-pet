import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

const imagemPadrao =
  "https://images.unsplash.com/photo-1450778869180-41d0601e046e";

export default function DetalhesAnimalScreen() {
  const params = useLocalSearchParams<{
    nome?: string;
    tipo?: string;
    raca?: string;
    idade?: string;
    localizacao?: string;
    imagem?: string;
    descricao?: string;
    telefoneDoador?: string;
  }>();

  const nome = params.nome || "Animal sem nome";
  const tipo = params.tipo || "Tipo não informado";
  const raca = params.raca || "Raça não informada";
  const idade = params.idade || "Idade não informada";
  const localizacao = params.localizacao || "Localização não informada";
  const imagem = params.imagem || imagemPadrao;
  const descricao = params.descricao || "Descrição não informada.";
  const telefoneDoador = params.telefoneDoador || "";

  function limparTelefone(telefone: string) {
    return telefone.replace(/\D/g, "");
  }

  function montarTelefoneWhatsApp(telefone: string) {
    const telefoneLimpo = limparTelefone(telefone);

    if (telefoneLimpo.startsWith("55")) {
      return telefoneLimpo;
    }

    return `55${telefoneLimpo}`;
  }

  async function entrarEmContato() {
    if (!telefoneDoador) {
      Alert.alert(
        "Contato indisponível",
        "O doador não informou telefone para contato."
      );
      return;
    }

    const telefoneWhatsApp = montarTelefoneWhatsApp(telefoneDoador);

    const mensagem = `Olá! Tenho interesse em adotar ${nome}. Vi o animal no app Adota Pet.`;

    const url = `https://wa.me/${telefoneWhatsApp}?text=${encodeURIComponent(
      mensagem
    )}`;

    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert(
        "Erro",
        "Não foi possível abrir o WhatsApp neste dispositivo."
      );
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imagem }} style={styles.image} resizeMode="contain" />
      </View>

      <View style={styles.card}>
        <Text style={styles.name}>{nome}</Text>

        <Text style={styles.info}>
          {tipo} • {raca}
        </Text>

        <View style={styles.section}>
          <Text style={styles.label}>Idade</Text>
          <Text style={styles.text}>{idade}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Localização</Text>
          <Text style={styles.text}>{localizacao}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Descrição</Text>
          <Text style={styles.text}>{descricao}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Contato do doador</Text>
          <Text style={styles.text}>
            {telefoneDoador || "Telefone não informado"}
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={entrarEmContato}>
          <Text style={styles.buttonText}>Entrar em contato pelo WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7ED",
  },
  content: {
    paddingBottom: 32,
  },
  imageContainer: {
    width: "100%",
    height: 340,
    backgroundColor: "#FFF7ED",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#FED7AA",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  card: {
    backgroundColor: "#FFFFFF",
    margin: 20,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FED7AA",
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#EA580C",
    marginBottom: 6,
  },
  info: {
    fontSize: 16,
    color: "#57534E",
    marginBottom: 18,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#44403C",
    marginBottom: 4,
  },
  text: {
    fontSize: 15,
    color: "#57534E",
    lineHeight: 22,
  },
  button: {
    backgroundColor: "#22C55E",
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