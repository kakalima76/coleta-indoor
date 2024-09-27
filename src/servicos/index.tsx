import axios, { AxiosRequestConfig } from "axios";
import { v4 as uuidv4 } from "uuid";
import { IRoteiro, ISubscritionExpoNotification } from "../interfaces";

// Interface que define o serviço de subscrição
export interface ISubscriptionService {
  add(subscription: ISubscritionExpoNotification, email: string): Promise<void>;
  get(uid: string): Promise<IRoteiro | undefined>
}

// Serviço principal de subscrição que recebe um serviço de implementação
export class SubscriptionService {
  private service: ISubscriptionService;

  constructor(service: ISubscriptionService) {
    this.service = service;
  }

  async add(
    subscription: ISubscritionExpoNotification,
    email: string
  ): Promise<void> {
    // Chama o método 'add' do serviço passado
    await this.service.add(subscription, email);
  }

  async get(uid: string): Promise<IRoteiro | undefined>{
    return await this.service.get(uid)
  }
}

function encodeEmailToNumericCode(email: string): string {
  let sum = 0;
  for (let i = 0; i < email.length; i++) {
    sum += email.charCodeAt(i);
  }

  const numericCode = sum % 100000000000;

  return numericCode.toString().padStart(12, "0");
}

// Implementação do serviço usando o Firebase Realtime Database
export class RealTimeDatabaseSubscriptionService
  implements ISubscriptionService
{
  async get(uid: string): Promise<IRoteiro | undefined> {
    const url = `https://igor-e1982-default-rtdb.firebaseio.com/subscriptions/${uid}.json`

    try {
      const response = await axios.get(url);
      console.log(response.data);
      if(response.data){
        const {roteiroId} = response.data;
        console.log(roteiroId);
        const url = `https://igor-e1982-default-rtdb.firebaseio.com/coordenadas/${roteiroId}.json`
        try{
          const response = await axios.get(url);
          console.log(response.data);
          return response.data;
        }catch(e){
          console.log(e);
        }

      }else{
        console.log("sem cadastro")
      }
      return response.data;
    } catch (error) {
      console.error("Erro:", error);
    }
  }


  async add(
    subscription: ISubscritionExpoNotification,
    email: string
  ): Promise<void> {
    const obj: { [key: string]: ISubscritionExpoNotification } = {};
    obj[subscription.uid || ""] = subscription;

    // Configuração da requisição Axios para enviar o patch ao Firebase
    const config: AxiosRequestConfig = {
      method: "patch",
      url: "https://igor-e1982-default-rtdb.firebaseio.com/subscriptions.json",
      data: obj,
    };

    try {
      await axios(config);
      alert("Inscrição realizada com sucesso.");
    } catch (err: any) {
      console.error("Failed to add subscription:", err.message);
    }
  }
}
