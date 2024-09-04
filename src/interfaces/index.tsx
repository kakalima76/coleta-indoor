export interface Coordenadas {
  afastamento: number;
  bairro: string;
  dias: string;
  distancia: number;
  fim: string;
  fim_previsto: string;
  gerencia: string;
  hora_data_veiculo: string;
  id: string;
  inicio: string;
  inicio_previsto: string;
  lado: string;
  lat_veiculo: string;
  latlngInicial: string;
  lng_veiculo: string;
  logradouro: string;
  opcao: string;
  polilinha: string;
  roteiro: string;
  status: boolean;
  turno: string;
  uid: string;
}

export interface Items {
  label: string;
  key: string;
}

export interface ISubscritionExpoNotification {
  roteiroId: string;
  token: string;
}

export interface NotificationPayload<T = any> {
  date: number;
  request: {
    content: {
      autoDismiss?: boolean;
      badge?: number | null;
      body?: string;
      data?: T;
      sound?: string | null;
      sticky?: boolean;
      subtitle?: string | null;
      title?: string | null;
    };
    identifier: string;
    trigger: {
      channelId?: string | null;
      remoteMessage?: Record<string, any> | null;
      type: "push" | "timeInterval" | "location" | "calendar" | "local";
    };
  };
}
