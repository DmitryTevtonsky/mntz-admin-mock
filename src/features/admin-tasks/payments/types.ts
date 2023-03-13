/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Payment {
  id: number;
  amount: string;
  creatorId: number;
  createdAt: string;
  paymentMethodCredentials: PaymentCredentials;
  paymentMethodType: string;
  state: string;
}

export type Placements = Record<string, string[]>;

export enum PaymentsStatusEnum {
  pending = 'pending',
  completed = 'completed',
  rejected = 'rejected',
}

export enum RejectionReasonCodeEnum {
  POOR_QUALITY = 'POOR_QUALITY',
  INAPPROPRIATE = 'INAPPROPRIATE',
  COPYRIGHT_VIOLATION = 'COPYRIGHT_VIOLATION',
}

export interface UpdatePaymentsState {
  id: number;
  state: 'rejected' | 'completed';
  rejectionReasonCode?: RejectionReasonCodeEnum;
}

export interface PaymentCredentials {
  card_number: string;
  holder_name: string;
}
