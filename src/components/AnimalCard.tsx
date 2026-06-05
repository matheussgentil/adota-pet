import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import type { Animal } from "../types/Animal";

type AnimalCardProps = {
  animal?: Animal | null;
};

const imagemPadrao =
  "https://images.unsplash.com/photo-1450778869180-41d0601e046e";

export default function AnimalCard({ animal }: AnimalCardProps) {
  if (!animal) {
    return null;
  }

  const id = animal.id ? String(animal.id) : String(Date.now());
  const nome = animal.nome ? animal.nome : "Animal sem nome";
  const tipo = animal.tipo ? animal.tipo : "Tipo não informado";
  const raca = animal.raca ? animal.raca : "Raça não informada";
  const idade = animal.idade ? animal.idade : "Idade não informada";
  const localizacao = animal.localizacao
    ? animal.localizacao
    : "Localização não informada";
  const imagem = animal.imagem ? animal.imagem : imagemPadrao;
  const descricao = animal.descricao
    ? animal.descricao
    : "Descrição não informada.";
  const telefoneDoador = animal.telefoneDoador ? animal.telefoneDoador : "";

  function abrirDetalhes() {
    router.push({
      pathname: "/detalhes-animal",
      params: {
        id,
        nome,
        tipo,
        raca,
        idade,
        localizacao,
        imagem,
        descricao,
        telefoneDoador,
      },
    });
  }

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imagem }} style={styles.image} resizeMode="contain" />
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>{nome}</Text>

        <Text style={styles.info}>
          {tipo} • {raca}
        </Text>

        <Text style={styles.info}>Idade: {idade}</Text>
        <Text style={styles.info}>Local: {localizacao}</Text>

        <Text style={styles.description}>{descricao}</Text>

        <TouchableOpacity style={styles.button} onPress={abrirDetalhes}>
          <Text style={styles.buttonText}>Tenho interesse</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#FED7AA",
  },
  imageContainer: {
    width: "100%",
    height: 230,
    backgroundColor: "#FFF7ED",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#EA580C",
    marginBottom: 6,
  },
  info: {
    fontSize: 14,
    color: "#57534E",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#44403C",
    marginTop: 8,
    lineHeight: 20,
  },
  button: {
    backgroundColor: "#EA580C",
    padding: 12,
    borderRadius: 10,
    marginTop: 12,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
  },
});