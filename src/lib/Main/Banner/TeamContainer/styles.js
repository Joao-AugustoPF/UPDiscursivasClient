import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  background-color: #f8f9fa;
  background-image: url(${(props) => props.image.src});
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: right top;
`;

export const InsideContainer = styled.div`
  padding: 3%;
  text-align: center;
  width: 70%;
  margin: auto;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  margin: auto;
  margin-top: 40px;

  @media (max-width: 820px) {
    grid-template-columns: auto;
  }
`;

export const GridItem = styled.div`
  display: inline-grid;
  margin: auto;
  margin-bottom: 100px;
`;

export const BoxProdutorImage = styled.div`
  width: 200px;
  background: gray;
  box-shadow: 0px 2px 15px rgb(0 0 0 / 50%);

  @media (max-width: 960px) {
    width: 200px;
  }
`;

export const ProdutorInfo = styled.div`
  position: absolute;
  background-color: #fff;
  width: 230px;
  padding-top: 10px;
  max-height: 95px;
  overflow: hidden;
  margin-top: 180px;
  box-shadow: 0px 2px 15px rgb(0 0 0 / 10%);
  transition: max-height 0.5s ease-in-out;
  //margin-top: 250px;

  @media (max-width: 960px) {
    margin-top: 180px;
  }
`;

export const ContainerGrid = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 960px) {
    padding: 0;
  }
`;

export const TitleName = styled.p`
  font-weight: bold;
`;

export const TitleFunction = styled.p`
  font-size: small;
`;
