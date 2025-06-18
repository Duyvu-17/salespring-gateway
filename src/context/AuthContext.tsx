import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { auth, googleProvider } from "@/config/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { authService } from "@/services/auth.service";
import type { User } from "@/types/auth";

// Define types for our authentication context
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
};

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  forgotPassword: async () => {},
  resetPassword: async () => {},
  loginWithGoogle: async () => {},
});

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Lỗi khi khởi tạo xác thực:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const userData = await authService.login(email, password);
      setUser(userData);
      toast({
        title: "Đăng nhập thành công",
        description: "Chào mừng bạn quay trở lại!",
      });
      navigate("/");
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      toast({
        title: "Đăng nhập thất bại",
        description:
          error instanceof Error
            ? error.message
            : "Email hoặc mật khẩu không chính xác",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const userData = await authService.register(username, email, password);
      setUser(userData);
      toast({
        title: "Đăng ký thành công",
        description: "Chào mừng bạn đến với Salespring!",
      });
      navigate("/login");
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      toast({
        title: "Đăng ký thất bại",
        description:
          error instanceof Error
            ? error.message
            : "Có lỗi xảy ra khi đăng ký tài khoản",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
      toast({
        title: "Đăng xuất thành công",
        description: "Hẹn gặp lại bạn!",
      });
      navigate("/");
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
      toast({
        title: "Đăng xuất thất bại",
        description: "Có lỗi xảy ra khi đăng xuất",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      // TODO: Implement forgot password
      toast({
        title: "Email đã được gửi",
        description: "Vui lòng kiểm tra hộp thư của bạn",
      });
    } catch (error) {
      console.error("Lỗi quên mật khẩu:", error);
      toast({
        title: "Lỗi",
        description: "Không thể gửi email. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    setIsLoading(true);
    try {
      // TODO: Implement reset password
      toast({
        title: "Thành công",
        description: "Mật khẩu đã được đặt lại",
      });
      navigate("/login");
    } catch (error) {
      console.error("Lỗi đặt lại mật khẩu:", error);
      toast({
        title: "Lỗi",
        description: "Không thể đặt lại mật khẩu. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);

      if (!credential) {
        throw new Error("Failed to get credential from Google sign in");
      }

      // Get the Google ID token
      const idToken = await result.user.getIdToken();

      // Send token to backend
      const userData = await authService.loginWithGoogle(idToken);
      setUser(userData);

      toast({
        title: "Đăng nhập thành công",
        description: "Chào mừng bạn quay trở lại!",
      });

      navigate("/");
    } catch (error) {
      console.error("Lỗi đăng nhập với Google:", error);
      toast({
        title: "Đăng nhập thất bại",
        description: "Có lỗi xảy ra khi đăng nhập với Google",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
        loginWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
