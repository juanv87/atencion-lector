import styled from "styled-components";
import { Colors } from "../../styles/Colors";
import { Fonts } from "../../styles/Fonts";

export const ButtonPrimary = styled.button.attrs(({ disabled }) => ({
  disabled: disabled,
}))`
  align-self: end;
  background-color: ${Colors.blue};
  border-radius: 20px;
  border: 1px solid ${Colors.blue};
  color: #fff;
  cursor: pointer;
  font-family: ${Fonts["primary-font"]};
  font-size: 0.9rem;
  font-weight: 500;
  margin-top: 10px;
  padding: 8px 13px;
  text-align: center;
  &:hover {
    background-color: transparent;
    color: ${Colors.blue};
  }
`;
