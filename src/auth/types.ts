import { ConfirmationResult, User } from 'firebase/auth';

export interface LoginForm1StepValues {
  prefixCode: string;
  phoneNumber: string;
}

export interface LoginForm2StepValues {
  code: string;
}

export interface AuthError {
  code: string;
  message: string;
}

export interface GetSmsCodeResult {
  result?: ConfirmationResult;
  error?: AuthError;
}

export interface SignInWithSmsCodeResult {
  result?: User;
  error?: AuthError;
}
