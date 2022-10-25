import styled from "styled-components";

export const OnlyMobile = styled.div`
  @media (max-width: 1024px) {
    display: none;
  }
  @media (max-width: 768px) {
    display: none;
  }
  @media (max-width: 480px) {
    display: block;
  }
`;
