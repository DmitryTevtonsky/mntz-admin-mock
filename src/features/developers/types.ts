export interface Developer {
  id: number;
  companyName: string;
  appsCount: number;
  balance: number;
  installsCount: number;
}

export interface DeveloperInfo {
  id?: number | string;
  companyName: string;
  email: string;
  login: string;
  phone: string;
  balance: string;
  password: string | null;
}

export interface Payment {
  amount: string;
}

export interface AddDeveloperPaymentPayload {
  id: string;
  amount: string;
}
