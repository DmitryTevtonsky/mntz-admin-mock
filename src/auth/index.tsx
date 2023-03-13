import {
  ConfirmationResult,
  RecaptchaVerifier,
  User,
  onAuthStateChanged,
  signInWithPhoneNumber,
  signOut,
} from 'firebase/auth';
import React, { useEffect } from 'react';

import { Loader } from 'core/components';
import { axiosMain } from 'libs/axios-initialization';

import { AuthError, GetSmsCodeResult, SignInWithSmsCodeResult } from './types';
import { fbAuth } from './firebase';

interface AuthContextType {
  user: User | null;
  getSmsCode: (phoneNumber: string, verifier: RecaptchaVerifier) => Promise<GetSmsCodeResult>;
  signInWithSmsCode: (confirmationResult: ConfirmationResult, code: string) => Promise<SignInWithSmsCodeResult>;
  signout: (callback: VoidFunction) => void;
}

const AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [authLoading, setAuthLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const onAuthStateChangedUnsubscribe = onAuthStateChanged(fbAuth, (userInfo) => {
      if (userInfo) {
        const setAuthHeader = async () => {
          const accessToken = await userInfo.getIdToken();

          axiosMain.defaults.headers.common.Authorization = accessToken;
          setUser(userInfo);
          setAuthLoading(false);
        };

        setAuthHeader();
      } else {
        axiosMain.defaults.headers.common.Authorization = '';
        setUser(null);
        setAuthLoading(false);
      }
    });

    return () => {
      onAuthStateChangedUnsubscribe();
    };
  }, []);

  const getSmsCode = async (phoneNumber: string, verifier: RecaptchaVerifier) => {
    try {
      const confirmationResult = await signInWithPhoneNumber(fbAuth, phoneNumber, verifier);

      return { result: confirmationResult };
    } catch (error) {
      return { error: error as AuthError };
    }
  };

  const signInWithSmsCode = async (confirmationResult: ConfirmationResult, code: string) => {
    try {
      const { user: userInfo } = await confirmationResult.confirm(code);

      return { result: userInfo };
    } catch (error) {
      return { error: error as AuthError };
    }
  };

  const signout = async () => {
    try {
      await signOut(fbAuth);
    } catch (error) {
      console.log(error);
    }
  };

  const value = { user, getSmsCode, signInWithSmsCode, signout };

  if (authLoading) return <Loader />;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export { default as Protector } from './protector';
export { default as Login } from './login';
