// Local definition of AuthType to avoid importing from okto-sdk-react
// This matches the enum we defined in our type declaration
export const AuthTypeValues = {
  EMAIL: "EMAIL" as const,
  PHONE: "PHONE" as const,
  GOOGLE: "GOOGLE" as const
};

// Type to be used in TypeScript
export type AuthTypeValue = typeof AuthTypeValues[keyof typeof AuthTypeValues]; 