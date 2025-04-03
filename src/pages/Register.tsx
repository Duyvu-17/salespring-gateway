import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, User, Lock, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Separator } from "@radix-ui/react-separator";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const { register, isLoading } = useAuth();

  const validateEmail = (emailToValidate: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailToValidate) {
      return "Email không được để trống";
    }
    if (!emailRegex.test(emailToValidate)) {
      return "Email không hợp lệ";
    }
    return "";
  };

  const validatePassword = (passwordToValidate: string) => {
    if (!passwordToValidate) {
      return "Mật khẩu không được để trống";
    }

    if (passwordToValidate.length < 8) {
      return "Mật khẩu phải có ít nhất 8 ký tự";
    }

    if (!/[A-Z]/.test(passwordToValidate)) {
      return "Mật khẩu phải chứa ít nhất một chữ in hoa";
    }

    if (!/\d/.test(passwordToValidate)) {
      return "Mật khẩu phải chứa ít nhất một chữ số";
    }

    if (!/[@$!%*?&]/.test(passwordToValidate)) {
      return "Mật khẩu phải chứa ít nhất một ký tự đặc biệt (@, $, !, %, *, ?, &)";
    }

    return "";
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({
      email: emailError,
      password: passwordError,
    });

    if (!emailError && !passwordError) {
      try {
        await register(name, email, password);
      } catch (error) {
        console.error("Lỗi đăng ký:", error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 min-h-[70vh] flex items-center justify-center">
    <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Tạo tài khoản</h1>
        <p className="text-muted-foreground mt-2">Đăng ký để bắt đầu sử dụng</p>
      </div>
  
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Họ và tên
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Nguyễn Văn A"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
  
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={handleEmailChange}
            className={errors.email ? "border-destructive" : ""}
            required
          />
          {errors.email && (
            <div className="text-destructive text-sm mt-1 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {errors.email}
            </div>
          )}
        </div>
  
        <div className="space-y-2">
          <Label htmlFor="password" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Mật khẩu
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={handlePasswordChange}
            className={errors.password ? "border-destructive" : ""}
            required
            autoComplete="false"
          />
          {errors.password && (
            <div className="text-destructive text-sm mt-1 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {errors.password}
            </div>
          )}
        </div>
  
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || !!errors.email || !!errors.password}
        >
          {isLoading ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
        </Button>
      </form>
  
      <div className="mt-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>
  
        <div className="mt-4 grid grid-cols-2 gap-4">
          <Button variant="outline" disabled={isLoading} className="w-full">
            <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10 0-5.523-4.477-10-10-10zm0 1.8c4.529 0 8.2 3.671 8.2 8.2 0 4.529-3.671 8.2-8.2 8.2-4.529 0-8.2-3.671-8.2-8.2 0-4.529 3.671-8.2 8.2-8.2zm-2 13.4h4v-1.5h-4v1.5zm2.7-10.9c-2.068 0-3.75 1.682-3.75 3.75h1.5c0-1.243 1.007-2.25 2.25-2.25s2.25 1.007 2.25 2.25c0 0.734-0.357 1.396-0.964 1.926l-1.036 0.824v2.4h1.5v-1.574l0.664-0.536c0.943-0.82 1.536-2.014 1.536-3.34 0-2.068-1.682-3.75-3.75-3.75z" />
            </svg>
            Guest
          </Button>
          <Button variant="outline" disabled={isLoading} className="w-full">
            <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            Google
          </Button>
        </div>
      </div>
  
      <div className="text-center text-sm mt-4">
        Đã có tài khoản?{" "}
        <Link to="/login" className="text-primary hover:underline">
          Đăng nhập ngay
        </Link>
      </div>
    </div>
  </div>
  
  );
};

export default Register;
