import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Cadastro from "../paginas/Cadastro";
import Sucesso from "../paginas/Sucesso";
import Confirmar from "../paginas/Confirmacao";
import { TelemetriaContext, TelemetriaProvider } from "../contextos";
import Home from "../paginas/Home";
import * as Notifications from "expo-notifications";
import { useContext, useEffect, useRef } from "react";
import Login from "../paginas/Login";

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();
  const context = useContext(TelemetriaContext);

  if (!context) {
    throw new Error("Button must be used within a TelemetriaProvider");
  }

  const { setPayload } = context;

  useEffect(() => {
    // Listener para notificação recebida enquanto o app está em primeiro plano
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification: any) => {
        console.log("Notificação recebida:", notification);
      });

    // Listener para quando o usuário interagir com a notificação
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response: any) => {
        console.log("Interação com a notificação:", response);
        setPayload(response);
        // Trate a navegação ou outras interações aqui
      });

    return () => {
      // Remove os listeners ao desmontar o componente
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <TelemetriaProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="login">
          <Drawer.Screen
            name="login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Drawer.Screen name="cadastro" component={Cadastro} />
          <Drawer.Screen name="confirmar" component={Confirmar} />
          <Drawer.Screen name="sucesso" component={Sucesso} />
          <Drawer.Screen name="home" component={Home} />
        </Drawer.Navigator>
      </NavigationContainer>
    </TelemetriaProvider>
  );
}
