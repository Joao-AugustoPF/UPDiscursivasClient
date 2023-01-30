import styled from "styled-components";

export const MenuToggle = styled.div`
  display: none;
  @media (max-width: 991px) {
    display: flex;
    margin-top: 20px;
  }
`;

export const MenuImageToggle = styled.div`
  width: 60px;
  height: 60px;
  padding: 5px;
  //margin-top: 5px;
  @media (max-width: 991px) {
  }
`;

export const ToggleAuthOff = styled.div`
  display: none;
  @media (max-width: 991px) {
    display: flex;
    margin-top: 20px;
  }
`;

export const ContainerOusite = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #f8f9fa;
`;

export const LateralMenu = styled.div`
  display: none;
  @media (max-width: 991px) {
    display: block;
  }
`;

export const AuthToggle = styled.div`
  display: flex;
  margin-top: 20px;
  @media (max-width: 991px) {
    display: none;
  }
`;

export const MenuAvatar = styled.div`
  @media (max-width: 991px) {
    display: none;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  list-style: none;
  text-decoration: none;
`;

export const NavMenuList = styled.div`
  display: flex;
  margin-left: 15px;
  @media (max-width: 991px) {
    display: none;
  }
`;
