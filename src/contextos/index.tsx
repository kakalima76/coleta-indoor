import React, { createContext, useContext, useState, ReactNode } from "react";
import { Coordenadas, NotificationPayload } from "../interfaces";
import { Notification } from "../../node_modules/expo-notifications/src/Notifications.types";

// Definindo o tipo do contexto
interface TelemetriaContextType {
  token: string;
  trechoColeta: Coordenadas | null;
  payload: any;
  user: string | null;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setTrechoColeta: React.Dispatch<React.SetStateAction<Coordenadas | null>>;
  setPayload: React.Dispatch<React.SetStateAction<any>>;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
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
      }}
    >
      {children}
    </TelemetriaContext.Provider>
  );
};
