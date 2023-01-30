import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: auto;
`;

export const InsideContainer = styled.div`
  display: flex;
  width: 80%;
  padding: 3%;
  text-align: center;
  flex-direction: column;
  margin: auto;
`;

export const ContainerVideo = styled.div`
  width: 60%;
  height: 400px;
  margin: auto;
  margin-top: 5%;

  @media (max-width: 768px) {
    width: 100%;
    height: 300px;
  }
`;
