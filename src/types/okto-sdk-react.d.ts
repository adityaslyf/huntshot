import { ReactNode } from 'react';
import { BuildType } from 'okto-sdk-react';

// Augment the existing module
declare module 'okto-sdk-react' {
  // Add the missing AuthType enum
  export enum AuthType {
    EMAIL = "EMAIL",
    PHONE = "PHONE",
    GOOGLE = "GOOGLE"
  }
  
  // Extend the OktoContextType interface
  export interface OktoContextType {
    isLoggedIn: boolean;
    authenticate: (idToken: string, callback: (result: any, error: any) => void) => void;
    authenticateWithUserId: (userId: string, jwtToken: string, callback: (result: any, error: any) => void) => void;
    logOut: () => void;
    getUserDetails: () => Promise<any>;
    getPortfolio: () => Promise<any>;
    getSupportedNetworks: () => Promise<any>;
    getSupportedTokens: () => Promise<any>;
    getWallets: () => Promise<any>;
    // Add any other methods you're using that are missing
  }

  // Declare the provider props interface
  export interface OktoProviderProps {
    children: ReactNode;
    apiKey: string;
    buildType: BuildType;
    gAuthCb?: () => Promise<string>;
    primaryAuth?: string;
    brandData?: {
      title: string;
      subtitle: string;
      iconUrl: string;
    };
  }

  // Re-declare the OktoProvider component with the updated props
  export const OktoProvider: (props: OktoProviderProps) => JSX.Element;
  
  // Re-declare the useOkto hook with non-null assertion
  export function useOkto(): OktoContextType;
} 