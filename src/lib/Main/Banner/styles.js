import styled from "styled-components";

export const BannerContainer = styled.div`
  display: flex;
  width: 100%;
  margin: auto;
  background-color: #f8f9fa;
  background-image: url(${(props) => props.image.src});
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: right top;
  padding: 40px;
  @media (max-width: 990px) {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    text-align: center;
  }
`;

export const BannerContainerLeft = styled.div`
  display: flex;
  width: 50%;
  flex-direction: row;
  margin: auto;

  @media (max-width: 990px) {
    width: 100%;
    margin: auto;
  }
`;

export const ContainerAll = styled.div`
  display: flex;
  width: 80%;
  margin: auto;
  text-align: center;
  /*
  @media (max-width: 990px) {
    width: 100%;
    height: 500px;
    flex-direction: column;
  } */
`;

export const LeftBasement = styled.div`
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 850px;

  @media (max-width: 990px) {
    width: 100%;
    height: 300px;
    margin-top: 500px;
    flex-direction: column;
  } */
`;

export const LeftInsideTextUpper = styled.div`
  /* width: 70%;
  display: flex;
  flex-direction: column; */
`;

export const LeftInsideButton = styled.a`
  background-color: #3dd1e7;
  border: 0 solid #e5e7eb;
  box-sizing: border-box;
  color: #000000;
  display: flex;
  font-family: ui-sans-serif, system-ui, -apple-system, system-ui, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 1rem;
  font-weight: 700;
  justify-content: center;
  line-height: 1.75rem;
  padding: 0.75rem 1.65rem;
  position: relative;
  text-align: center;
  text-decoration: none #000000 solid;
  text-decoration-thickness: auto;
  width: 50%;
  max-width: 460px;
  position: relative;
  cursor: pointer;
  transform: rotate(-2deg);
  user-select: none;
  margin: auto;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:focus {
    outline: 0;
  }
  &::after {
    content: "";
    position: absolute;
    border: 1px solid #000000;
    bottom: 4px;
    left: 4px;
    width: calc(100% - 1px);
    height: calc(100% - 1px);
  }

  &:hover {
    &::after {
      bottom: 2px;
      left: 2px;
    }
  }
  @media (max-width: 990px) {
    padding: 0.75rem 3rem;
    font-size: 1.25rem;
  }
`;

export const TextTitle = styled.h1`
  /* font-size: 55px;
  margin-bottom: 8%; */

  @media (max-width: 990px) {
    font-size: 35px;
  }
`;

export const TextDescription = styled.h2`
  margin-top: 15px;
  margin-bottom: 25px;
  font-size: 17px;
`;
