import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
`;

export const BannerBlock = styled.div`
  background-image: url(${(props) => props.image.src});
  background-size: cover;
  position: relative;
  background-position: center center;
  color: #fff;
  padding: 20px;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #000;
    opacity: 0.85;
  }
`;

export const BannerContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-content: space-between;
  position: relative;
  z-index: 999;
  height: 100%;
`;

export const Subtitle = styled.h3``;

export const Content = styled.div`
  background-color: #fff;
`;
