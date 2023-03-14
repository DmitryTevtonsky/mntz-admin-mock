import 'libs/i18n';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import { AuthProvider, Login, Protector } from 'auth';
import { Core } from 'core';
import { ErrorBoundary } from 'core/components';
import { store } from 'store';

const rootElement = document.getElementById('root');

if (!rootElement) throw new Error('No root element detected!');

const root = ReactDOM.createRoot(rootElement);

root.render(
  <ErrorBoundary showComponentStack>
    <Suspense fallback={null}>
      <AuthProvider>
        <Provider store={store}>
          <BrowserRouter basename="/mntz-admin-mock">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/*"
                element={
                  <Protector>
                    <Core />
                  </Protector>
                }
              />
            </Routes>
          </BrowserRouter>
        </Provider>
      </AuthProvider>
    </Suspense>
  </ErrorBoundary>
);
