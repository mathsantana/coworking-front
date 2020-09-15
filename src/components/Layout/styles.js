import styled from "styled-components";
import { Layout, Breadcrumb } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

export const Container = styled.div`
  min-height: 100vh;
`;

export const NavBar = styled(Header)`
  display: flex;
  flex-direction: row;
  background-color: #eb8d1d;
  padding: 2px 5px;
`;

export const NavBarBox = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: flex-start;
  padding: 0 10px;
`;

export const IconBox = styled.div`
  position: absolute;
  right: 10px;
`;

export const StyledContent = styled(Content)`
  background-color: #f0f0f0;
  display: flex;
  min-height: 100vh;
  position: relative;
  flex-direction: column;
`;

export const StyledFooter = styled(Footer)`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
`;

export const Title = styled.h2`
  color: white;
  width: max-content;
  font-size: minmax(1vw, 30px);
`;

export const Logo = styled.img`
  margin: 5px 20px 10px 0;
  height: 80%;
`;

export const LogoutIcon = styled(LogoutOutlined)`
  color: white;
  font-size: 20px;
  margin: 5px;
`;

export const UserIcon = styled(UserOutlined)`
  color: white;
  font-size: 20px;
  margin: 5px;
`;

export const StyledBreadcrumb = styled(Breadcrumb)`
  align-self: flex-start;
  margin: 10px;
`;

export const StyledLayout = styled(Layout)``;
