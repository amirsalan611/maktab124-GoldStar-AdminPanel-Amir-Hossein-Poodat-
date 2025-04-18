import styled from "styled-components";

interface Iprops {
  buttonText: string;
  type: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  className?: string;
  buttonClassName?:string
}

const Button = ({
  buttonText,
  onClick,
  type,
  className,
  buttonClassName,
}: Iprops) => {
  return (
    <StyledWrapper className={className}>
      <button
        onClick={onClick}
        type={type}
        className={`${buttonClassName} bg-[#f3f7fe] text-[#3b82f6] cursor-pointer rounded-lg w-[100px] hover:bg-[#3b82f6] hover:text-white`}
      >
        {buttonText}
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    transition: 0.3s;
  }

  button:hover {
    box-shadow: 0 0 0 5px #3b83f65f;
  }
`;

export default Button;
