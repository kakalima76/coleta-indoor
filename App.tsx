import "react-native-gesture-handler";
import React, { useContext, useEffect, useRef } from "react";
import { TelemetriaContext, TelemetriaProvider } from "./src/contextos";
import DrawerRoutes from "./src/rotas";
import { createDrawerNavigator } from "@react-navigation/drawer";
import * as Notifications from "expo-notifications";
import { NavigationContainer } from "@react-navigation/native";

// Configura o comportamento das notificações
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();
  const context = useContext(TelemetriaContext);

  if (!context) {
    throw new Error("App must be used within a TelemetriaProvider");
  }

  const { setPayload, payload } = context;

  // Função para verificar e solicitar permissões de notificação
  async function requestNotificationPermissions() {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
      const { status: newStatus } =
        await Notifications.requestPermissionsAsync();
      if (newStatus !== "granted") {
        alert("Permissão de notificações não concedida");
        return;
      }
    }
  }

  useEffect(() => {
    // Solicita permissões de notificação ao carregar o app
    requestNotificationPermissions();

    // Listener para notificação recebida enquanto o app está em primeiro plano
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        alert(`Notificação recebida: ${notification}`);
        setPayload(notification);
      });

    // Listener para quando o usuário interagir com a notificação
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        alert(`Interação com a notificação: ${response}`);
      });

    return () => {
      // Remove os listeners ao desmontar o componente
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return <DrawerRoutes />;
}
