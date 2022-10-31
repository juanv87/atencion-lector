import styled from "styled-components";

const handleColorType = (color) => {
  switch (color) {
    case "primary":
      return "color: #03a9f3; background: #000;";
    case "danger":
      return "color: #fff; background: #f56342;";
    case "success":
      return "color: #fff; background: #2a9d8f;";
    default:
      return "color: #000; background: #eee;";
  }
};

export const Toast = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 15px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 100;
  ${(props) => handleColorType(props.color)}
  transition: all 0.3s ease-in-out;
  box-shadow: 0px -5px 20px rgb(0 0 0 / 20%);
`;
