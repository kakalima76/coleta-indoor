import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Cadastro from "../paginas/Cadastro";
import Sucesso from "../paginas/Sucesso";
import Confirmar from "../paginas/Confirmacao";
import { TelemetriaContext, TelemetriaProvider } from "../contextos";
import Home from "../paginas/Home";
import { useContext, useEffect, useRef } from "react";
import Login from "../paginas/Login";
import Registrar from "../paginas/Registro";
import Verificar from "../paginas/Verificar";
import RoteiroDetalhes from "../paginas/Roteiro";


const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  const context = useContext(TelemetriaContext);

  if (!context) {
    throw new Error("Button must be used within a TelemetriaProvider");
  }

  const { setPayload } = context;

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
          <Drawer.Screen name="registro" component={Registrar} options={{ headerShown: false }}/>
          <Drawer.Screen name="verificar" component={Verificar} options={{ headerShown: false }}/>
          <Drawer.Screen name="roteiro" component={RoteiroDetalhes} options={{ headerShown: false }}/>
        </Drawer.Navigator>
      </NavigationContainer>
    </TelemetriaProvider>
  );
}
