import styled from "styled-components";
import { inputLocalization } from "../../../constants/Localization/Localization";
import { useState } from "react";
import { FiEyeOff } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";



interface IProps {
  label: string;
  inputType: string;
  name: string;
  value: string;
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
}

const Input = ({ label, inputType, name, value, onchange, error }: IProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = inputType === "password";

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <StyledWrapper>
      <div className="inputGroup w-full mb-4 relative">
        <input
          type={isPassword ? (showPassword ? "text" : "password") : inputType}
          autoComplete="off"
          name={name}
          value={value}
          onChange={onchange}
        />
        <label htmlFor={name}>{label}</label>

        {isPassword && (
          <span className="toggle-password" onClick={handleTogglePassword}>
            {showPassword ? <FiEyeOff size={18} /> : <IoEyeOutline size={18} />}
          </span>
        )}

        {error && (
          <p className="text-red-500 p-2 mb-2">{inputLocalization.text}</p>
        )}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .inputGroup {
    font-family: "Segoe UI", sans-serif;
    position: relative;
  }

  .inputGroup input {
    font-size: 100%;
    padding: 0.8em 2.5em 0.8em 0.8em; // فضای سمت راست برای آیکون
    outline: none;
    border: 2px solid rgb(200, 200, 200);
    background-color: transparent;
    border-radius: 20px;
    width: 100%;
  }

  .inputGroup label {
    font-size: 100%;
    position: absolute;
    right: 0;
    padding: 0.8em;
    margin-left: 0.5em;
    pointer-events: none;
    transition: all 0.3s ease;
    color: rgb(100, 100, 100);
  }

  .inputGroup :is(input:focus, input:valid) ~ label {
    transform: translateY(-50%) scale(0.9);
    margin: 0em;
    margin-left: 1.3em;
    padding: 0.4em;
    background-color: #e2e8f0;
  }

  .inputGroup :is(input:focus, input:valid) {
    border-color: rgb(150, 150, 200);
  }

  .toggle-password {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    cursor: pointer;
    color: #666;
  }
`;

export default Input;
