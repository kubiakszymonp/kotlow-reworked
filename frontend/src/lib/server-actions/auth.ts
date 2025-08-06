'use server';

import { apiClient } from '../api-client';
import { apiCall } from '../api-utils';
import { 
  AuthLocalPostRequest,
  AuthLocalRegisterPostRequest,
  AuthForgotPasswordPostRequest,
  AuthResetPasswordPostRequest,
  AuthChangePasswordPostRequest,
  UsersPermissionsUserRegistration
} from '@/api/generated';

// Login user
export async function loginUser(credentials: {
  identifier: string;
  password: string;
}) {
  const authRequest: AuthLocalPostRequest = {
    identifier: credentials.identifier,
    password: credentials.password,
  };
  
  return apiCall(
    () => apiClient.auth.authLocalPost({ authLocalPostRequest: authRequest })
  );
}

// Register user
export async function registerUser(userData: {
  username: string;
  email: string;
  password: string;
}) {
  const registerRequest: AuthLocalRegisterPostRequest = {
    username: userData.username,
    email: userData.email,
    password: userData.password,
  };
  
  return apiCall(
    () => apiClient.auth.authLocalRegisterPost({ 
      authLocalRegisterPostRequest: registerRequest 
    })
  );
}

// Forgot password
export async function forgotPassword(email: string) {
  const forgotPasswordRequest: AuthForgotPasswordPostRequest = {
    email,
  };
  
  return apiCall(
    () => apiClient.auth.authForgotPasswordPost({ 
      authForgotPasswordPostRequest: forgotPasswordRequest 
    })
  );
}

// Reset password
export async function resetPassword(data: {
  password: string;
  passwordConfirmation: string;
  code: string;
}) {
  const resetPasswordRequest: AuthResetPasswordPostRequest = {
    password: data.password,
    passwordConfirmation: data.passwordConfirmation,
    code: data.code,
  };
  
  return apiCall(
    () => apiClient.auth.authResetPasswordPost({ 
      authResetPasswordPostRequest: resetPasswordRequest 
    })
  );
}

// Change password
export async function changePassword(data: {
  password: string;
  currentPassword: string;
  passwordConfirmation: string;
}) {
  const changePasswordRequest: AuthChangePasswordPostRequest = {
    password: data.password,
    currentPassword: data.currentPassword,
    passwordConfirmation: data.passwordConfirmation,
  };
  
  return apiCall(
    () => apiClient.auth.authChangePasswordPost({ 
      authChangePasswordPostOperationRequest: { 
        authChangePasswordPostRequest: changePasswordRequest 
      }
    })
  );
}

// Email confirmation
export async function confirmEmail(confirmation: string) {
  return apiCall(
    () => apiClient.auth.authEmailConfirmationGet({ confirmation })
  );
}

// Send email confirmation
export async function sendEmailConfirmation(email: string) {
  const emailRequest: AuthForgotPasswordPostRequest = {
    email,
  };
  
  return apiCall(
    () => apiClient.auth.authSendEmailConfirmationPost({ 
      authSendEmailConfirmationPostRequest: emailRequest 
    })
  );
}

// Provider callback
export async function providerCallback(provider: string) {
  return apiCall(
    () => apiClient.auth.authProviderCallbackGet({ provider })
  );
}

// Connect provider
export async function connectProvider(provider: string) {
  return apiCall(
    () => apiClient.auth.connectProviderGet({ provider })
  );
} 