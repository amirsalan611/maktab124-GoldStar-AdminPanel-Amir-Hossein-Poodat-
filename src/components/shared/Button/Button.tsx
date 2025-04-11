import styled from "styled-components";

interface Iprops {
  buttonText: string;
  type: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  className?:string
}

const Button = ({ buttonText, onClick, type ,className}: Iprops) => {
  return (
    <StyledWrapper className={className}>
      <button onClick={onClick} type={type}>
        {buttonText}
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    background-color: #f3f7fe;
    color: #3b82f6;
    border: none;
    cursor: pointer;
    border-radius: 8px;
    width: 100px;
    height: 45px;
    transition: 0.3s;
  }

  button:hover {
    background-color: #3b82f6;
    box-shadow: 0 0 0 5px #3b83f65f;
    color: #fff;
  }
`;

export default Button;
