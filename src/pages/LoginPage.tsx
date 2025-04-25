import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOkto } from "okto-sdk-react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/user-auth";
import { Loader } from "@/components/ui/loader";

interface LoginPageProps {
  setAuthToken: (token: string) => void;
  authToken: string | null;
  handleLogout: () => void;
}

interface AuthResponse {
  auth_token: string;
}

interface AuthError {
  message: string;
}

const LoginPage: React.FC<LoginPageProps> = ({ setAuthToken, authToken, handleLogout }) => {
  const navigate = useNavigate();
  const { authenticate, isLoggedIn } = useOkto();
  const { userDetails } = useAuth();
  const [error, setError] = useState<string>("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      if (userDetails?.hasProfile) {
        navigate('/profile');
      } else {
        navigate('/home');
      }
    }
  }, [isLoggedIn, userDetails, navigate]);

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    setIsAuthenticating(true);
    try {
      const idToken = credentialResponse.credential;
      if (!idToken) {
        setError("No credential received from Google");
        return;
      }

      authenticate(idToken, (authResponse: AuthResponse | null, error: AuthError | null) => {
        if (authResponse?.auth_token) {
          setAuthToken(authResponse.auth_token);
          navigate("/home");
        }
        if (error) {
          setError("Authentication failed: " + error.message);
        }
      });
    } catch (err) {
      setError("Google login failed: " + (err instanceof Error ? err.message : "Unknown error"));
    } finally {
      setIsAuthenticating(false);
    }
  };

  const onLogoutClick = () => {
    handleLogout();
    setError("");
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[70%] h-[50%] rounded-full bg-gradient-to-r from-primary/5 to-accent/5 blur-3xl animate-morph"></div>
        <div className="absolute top-[30%] -right-[10%] w-[60%] h-[40%] rounded-full bg-gradient-to-l from-primary/5 to-accent/5 blur-3xl animate-morph animation-delay-300"></div>
      </div>
      
      <Card className="w-full max-w-md relative z-10 border border-white/10 backdrop-blur-xl bg-white/5 dark:bg-black/5 shadow-xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="relative h-10 w-10 mr-2">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-md"></div>
              <div className="relative glass p-2 rounded-full flex items-center justify-center">
                <ExclamationTriangleIcon className="h-5 w-5 text-primary" />
              </div>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <Separator className="my-4 bg-white/10" />
            <div className="flex flex-col items-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Continue with Google
              </p>
              <div className="w-full flex justify-center">
                {!authToken ? (
                  <div className="google-login-container">
                    {isAuthenticating ? (
                      <Loader variant="spinner" size="md" text="Authenticating..." />
                    ) : (
                      <GoogleLogin
                        onSuccess={handleGoogleLogin}
                        onError={() => setError("Login Failed")}
                        useOneTap={false}
                        theme="filled_black"
                        shape="pill"
                      />
                    )}
                  </div>
                ) : (
                  <button
                    onClick={onLogoutClick}
                    className="btn-modern w-full py-2"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <a href="/terms" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </a>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
