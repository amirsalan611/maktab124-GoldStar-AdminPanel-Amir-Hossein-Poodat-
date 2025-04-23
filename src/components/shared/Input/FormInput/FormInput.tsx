import styled from "styled-components";
import { ModalLocalization } from "../../../../constants/Localization/Localization";
import { useForm } from "react-hook-form";

interface InputProps {
  label: string;
  name: string;
  type: string;
  className?: string;
}
const InputForm = ({ label, name, type, className }: InputProps) => {
  return (
    <StyledWrapper className={`${className}`}>
      <div className="input-form">
        {type === "textarea" ? (
          <textarea
            key={name}
            className="input w-full h-full min-h-[145px] resize-none"
            required
            name={name}
          />
        ) : (
          <input
            key={name}
            className="input"
            required
            name={name}
            type={type}
          />
        )}
        <label className="textUser">{label}</label>
        {name === "price" && (
          <span className="text-gray-500 text-sm absolute left-20 top-1/2 -translate-y-1/2">
            {ModalLocalization.toman}
          </span>
        )}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .input-form {
    position: relative;
    font-family: Arial, Helvetica, sans-serif;
    width: 100%;
  }

  .input {
    border: solid 1.9px #9e9e9e;
    border-radius: 1.3rem;
    background: none;
    padding: 10px;
    font-size: 1rem;
    color: #000000;
    transition: border 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .textUser {
    position: absolute;
    right: 15px;
    top: -2px;
    color: #666666;
    pointer-events: none;
    transform: translateY(1rem);
    transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .input:focus,
  input:valid {
    outline: none;
    box-shadow: 1px 2px 5px rgba(133, 133, 133, 0.523);
    background-image: linear-gradient(
      to top,
      rgba(182, 182, 182, 0.199),
      rgba(252, 252, 252, 0)
    );
    transition: background 4s ease-in-out;
  }

  .input:focus ~ label,
  input:valid ~ label {
    transform: translateY(-95%) scale(0.95);
    padding: 0 0.2em;
    color: #000000be;
    right: 20px;
  }

  .input:hover {
    border: solid 1.9px #000002;
    transform: scale(1.03);
    box-shadow: 1px 1px 5px rgba(133, 133, 133, 0.523);
    transition: border-color 1s ease-in-out;
  }
`;

export default InputForm;
