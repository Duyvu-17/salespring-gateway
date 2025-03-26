import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, User, Lock, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

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
      password: passwordError 
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

        <form onSubmit={handleSubmit} className="space-y-6">
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

        <div className="text-center text-sm">
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