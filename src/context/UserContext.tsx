import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export type PerfilUsuario = "doador" | "adotante";

interface Usuario {
  nome: string;
  email: string;
  perfil: PerfilUsuario;
  telefone?: string;
}

interface UserContextData {
  usuario: Usuario | null;
  cadastrarUsuario: (usuario: Usuario) => void;
  loginUsuario: (email: string, perfil: PerfilUsuario) => void;
  alterarPerfil: (perfil: PerfilUsuario) => void;
  sair: () => void;
}

interface UserProviderProps {
  children: ReactNode;
}

const USUARIO_STORAGE_KEY = "@adota-pet:usuario";

const UserContext = createContext<UserContextData | undefined>(undefined);

export function UserProvider({ children }: UserProviderProps) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregouDados, setCarregouDados] = useState(false);

  useEffect(() => {
    async function carregarUsuario() {
      try {
        const usuarioSalvo = await AsyncStorage.getItem(USUARIO_STORAGE_KEY);

        if (usuarioSalvo) {
          setUsuario(JSON.parse(usuarioSalvo));
        }
      } catch (error) {
        console.log("Erro ao carregar usuário:", error);
      } finally {
        setCarregouDados(true);
      }
    }

    carregarUsuario();
  }, []);

  useEffect(() => {
    async function salvarUsuario() {
      try {
        if (!carregouDados) {
          return;
        }

        if (usuario) {
          await AsyncStorage.setItem(
            USUARIO_STORAGE_KEY,
            JSON.stringify(usuario)
          );
        } else {
          await AsyncStorage.removeItem(USUARIO_STORAGE_KEY);
        }
      } catch (error) {
        console.log("Erro ao salvar usuário:", error);
      }
    }

    salvarUsuario();
  }, [usuario, carregouDados]);

  function cadastrarUsuario(novoUsuario: Usuario) {
    setUsuario(novoUsuario);
  }

  function loginUsuario(email: string, perfil: PerfilUsuario) {
    setUsuario({
      nome: "Usuário",
      email,
      perfil,
      telefone: "",
    });
  }

  function alterarPerfil(perfil: PerfilUsuario) {
    if (!usuario) {
      return;
    }

    setUsuario({
      ...usuario,
      perfil,
    });
  }

  function sair() {
    setUsuario(null);
  }

  return (
    <UserContext.Provider
      value={{
        usuario,
        cadastrarUsuario,
        loginUsuario,
        alterarPerfil,
        sair,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUsuario() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUsuario deve ser usado dentro de UserProvider");
  }

  return context;
}