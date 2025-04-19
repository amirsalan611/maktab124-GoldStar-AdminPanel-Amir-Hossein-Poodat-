import { useState } from "react";
import Input from "../../components/shared/Input/Input";
import { logInLocalization } from "../../constants/Localization/Localization";
import Button from "../../components/shared/Button/Button";
import { LoginAdmin } from "../../services/auth/handleLogin/handleLogin";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import logIn from "../../assets/images/login.svg";
import logIn2 from "../../assets/images/login2.svg";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
    incorrect: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: !formData.email,
        password: !formData.password,
      }));
      return;
    }

    try {
      const result = await LoginAdmin(formData.email, formData.password);
      console.log(result.data);
      if (result.status === 200) {
        const user = result.data.data.user;

        if (user.role === "ADMIN") {
          localStorage.setItem("token", result.data.token.accessToken);
          localStorage.setItem("adminData", JSON.stringify(user));
          toast.success(logInLocalization.success);
          navigate("/panel");
        } else {
          toast.error(logInLocalization.notAdmin);
        }
      }
    } catch (error: any) {
      if (error?.status === 401) {
        setErrors({ ...errors, incorrect: true });
      }
      toast.error(logInLocalization.error);
    }
  };

  return (
    <div className="flex flex-col items-center bg-slate-50 justify-center h-screen ">
      <div className="w-[30%] flex flex-col shadow-xl bg-slate-200 px-16 pb-10 rounded-xl relative">
        <p className="m-auto p-10 text-2xl">{logInLocalization.login}</p>
        <div className="w-[250px] absolute left-[-110px] top-[-110px]">
          <img src={logIn} alt="loginGif" />
        </div>
        <div className="w-[200px] absolute right-[-100px] bottom-[-100px]">
          <img src={logIn2} alt="loginGif" />
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col z-20">
          <Input
            label={logInLocalization.email}
            inputType={"text"}
            name="email"
            value={formData.email}
            onchange={handleChange}
            error={errors.email}
          />
          <Input
            label={logInLocalization.password}
            inputType={"password"}
            name="password"
            value={formData.password}
            onchange={handleChange}
            error={errors.password}
          />
          {errors.incorrect && (
            <p className="self-center text-red-500 p-2">
              {logInLocalization.incorrect}
            </p>
          )}
          <Button
            buttonText={logInLocalization.submit}
            type="submit"
            className="self-center"
            buttonClassName="px-5 py-3"
          />
        </form>
      </div>
    </div>
  );
}
