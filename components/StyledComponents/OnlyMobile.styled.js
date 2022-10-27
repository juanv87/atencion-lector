import styled from "styled-components";

export const OnlyMobile = styled.div`
  && {
    display: none;
  }
  @media (max-width: 480px) {
    && {
      display: block;
    }
  }
`;
