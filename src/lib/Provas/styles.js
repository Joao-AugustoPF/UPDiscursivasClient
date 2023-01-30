import styled from "styled-components";

export const WrapMenu = styled.div`
  display: flex;
  width: 100%;
  padding: 1.5rem;
  justify-content: center;
  align-items: center;
  @media (max-width: 470px) {
    display: flex;
    flex-direction: column;
  }
`;
