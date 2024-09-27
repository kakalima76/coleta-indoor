import React, { createContext, useContext, useState, ReactNode } from "react";
import { Coordenadas, IRoteiro, NotificationPayload } from "../interfaces";
import { Notification } from "../../node_modules/expo-notifications/src/Notifications.types";

// Definindo o tipo do contexto
interface TelemetriaContextType {
  token: string;
  trechoColeta: Coordenadas | null;
  payload: any;
  user: string | null;
  uid: string | null;
  roteiro: IRoteiro | undefined;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setTrechoColeta: React.Dispatch<React.SetStateAction<Coordenadas | null>>;
  setPayload: React.Dispatch<React.SetStateAction<any>>;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
  setUid: React.Dispatch<React.SetStateAction<string | null>>;
  setRoteiro: React.Dispatch<React.SetStateAction<IRoteiro | undefined>>;
}

// Inicializando o contexto com valores padrão
const defaultContext: TelemetriaContextType = {
  token: "",
  trechoColeta: null,
  payload: null,
  setToken: () => {},
  setTrechoColeta: () => {},
  setPayload: () => {},
  user: null,
  setUser: () => {},
  uid: null,
  setUid: () => {},
  roteiro: undefined,
  setRoteiro: () => {}
};

export const TelemetriaContext =
  createContext<TelemetriaContextType>(defaultContext);

interface TelemetriaProviderProps {
  children: ReactNode;
}

export const TelemetriaProvider: React.FC<TelemetriaProviderProps> = ({
  children,
}) => {
  const [token, setToken] = useState<string>("");
  const [trechoColeta, setTrechoColeta] = useState<Coordenadas | null>(null);
  const [payload, setPayload] = useState<any>(null);
  const [user, setUser] = useState<string | null>(null);
  const [uid, setUid] = useState<string | null>(null);
  const [roteiro, setRoteiro] = useState<IRoteiro | undefined>(undefined)

  return (
    <TelemetriaContext.Provider
      value={{
        token,
        setToken,
        trechoColeta,
        setTrechoColeta,
        payload,
        setPayload,
        user,
        setUser,
        uid,
        setUid,
        roteiro,
        setRoteiro
      }}
    >
      {children}
    </TelemetriaContext.Provider>
  );
};
