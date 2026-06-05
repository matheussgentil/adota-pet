import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Animal } from "../types/Animal";
import { animais as animaisIniciais } from "../data/animais";

type NovoAnimal = Omit<Animal, "id">;

interface AnimalContextData {
  animais: Animal[];
  cadastrarAnimal: (animal: NovoAnimal) => void;
  removerAnimal: (id: number) => void;
}

interface AnimalProviderProps {
  children: ReactNode;
}

const ANIMAIS_STORAGE_KEY = "@adota-pet:animais";

const AnimalContext = createContext<AnimalContextData | undefined>(undefined);

function validarAnimal(animal: unknown): animal is Animal {
  if (!animal || typeof animal !== "object") {
    return false;
  }

  const item = animal as Animal;

  return (
    typeof item.id === "number" &&
    typeof item.nome === "string" &&
    typeof item.tipo === "string" &&
    typeof item.raca === "string" &&
    typeof item.idade === "string" &&
    typeof item.localizacao === "string" &&
    typeof item.imagem === "string" &&
    typeof item.descricao === "string"
  );
}

export function AnimalProvider({ children }: AnimalProviderProps) {
  const [animais, setAnimais] = useState<Animal[]>(animaisIniciais);
  const [carregouDados, setCarregouDados] = useState(false);

  useEffect(() => {
    async function carregarAnimais() {
      try {
        const animaisSalvos = await AsyncStorage.getItem(ANIMAIS_STORAGE_KEY);

        if (animaisSalvos) {
          const dados = JSON.parse(animaisSalvos);

          if (Array.isArray(dados)) {
            const animaisValidos = dados.filter(validarAnimal);
            setAnimais(animaisValidos);
          }
        }
      } catch (error) {
        console.log("Erro ao carregar animais:", error);
        setAnimais(animaisIniciais);
      } finally {
        setCarregouDados(true);
      }
    }

    carregarAnimais();
  }, []);

  useEffect(() => {
    async function salvarAnimais() {
      try {
        if (carregouDados) {
          await AsyncStorage.setItem(
            ANIMAIS_STORAGE_KEY,
            JSON.stringify(animais)
          );
        }
      } catch (error) {
        console.log("Erro ao salvar animais:", error);
      }
    }

    salvarAnimais();
  }, [animais, carregouDados]);

  function cadastrarAnimal(novoAnimal: NovoAnimal) {
    const animal: Animal = {
      id: Date.now(),
      nome: novoAnimal.nome,
      tipo: novoAnimal.tipo,
      raca: novoAnimal.raca,
      idade: novoAnimal.idade,
      localizacao: novoAnimal.localizacao,
      imagem:
        novoAnimal.imagem ||
        "https://images.unsplash.com/photo-1450778869180-41d0601e046e",
      descricao: novoAnimal.descricao,
      donoEmail: novoAnimal.donoEmail,
      telefoneDoador: novoAnimal.telefoneDoador,
    };

    setAnimais((listaAtual) => [animal, ...listaAtual]);
  }

  function removerAnimal(id: number) {
    setAnimais((listaAtual) =>
      listaAtual.filter((animal) => animal.id !== id)
    );
  }

  return (
    <AnimalContext.Provider
      value={{
        animais,
        cadastrarAnimal,
        removerAnimal,
      }}
    >
      {children}
    </AnimalContext.Provider>
  );
}

export function useAnimais() {
  const context = useContext(AnimalContext);

  if (!context) {
    throw new Error("useAnimais deve ser usado dentro de AnimalProvider");
  }

  return context;
}