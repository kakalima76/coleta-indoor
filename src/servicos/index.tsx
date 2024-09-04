import axios, { AxiosRequestConfig } from "axios";
import { v4 as uuidv4 } from "uuid";
import { ISubscritionExpoNotification } from "../interfaces";

// Interface que define o serviço de subscrição
export interface ISubscriptionService {
  add(subscription: ISubscritionExpoNotification, email: string): Promise<void>;
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
  async add(
    subscription: ISubscritionExpoNotification,
    email: string
  ): Promise<void> {
    const obj: { [key: string]: ISubscritionExpoNotification } = {};
    const uuid = encodeEmailToNumericCode(email);
    obj[uuid] = subscription;
    console.log(email);

    // Configuração da requisição Axios para enviar o patch ao Firebase
    const config: AxiosRequestConfig = {
      method: "patch",
      url: "https://igor-e1982-default-rtdb.firebaseio.com/subscriptions.json",
      data: obj,
    };

    try {
      await axios(config);
      console.log("Subscription added successfully");
    } catch (err: any) {
      console.error("Failed to add subscription:", err.message);
    }
  }
}
