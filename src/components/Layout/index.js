import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Popconfirm, Layout as LayoutBox, Menu } from "antd";

import UserContext from "../../services/userContext";

import {
  Container,
  NavBar,
  NavBarBox,
  StyledContent,
  StyledLayout,
  Title,
  Logo,
  LogoutIcon,
  UserIcon,
  IconBox,
} from "./styles";
import logoImage from "../../assets/logo.png";

const { Content, Sider } = LayoutBox;

const Layout = ({ children, selectedMenuItem }) => {
  const history = useHistory();
  const { handleLogout } = useContext(UserContext);

  return (
    <Container>
      <NavBar>
        <NavBarBox>
          <Logo src={logoImage} />
          <Title>Coworking</Title>

          <IconBox>
            <Popconfirm
              title="Tem certeza que deseja sair?"
              okText="Sim"
              cancelText="Não"
              onConfirm={() => {
                handleLogout();
                history.push("login");
              }}
              placement="bottomRight"
            >
              <LogoutIcon />
            </Popconfirm>
          </IconBox>
        </NavBarBox>
      </NavBar>
      <StyledContent>
        <StyledLayout>
          <Sider className="site-layout-background" width={200}>
            <Menu
              mode="inline"
              selectedKeys={[selectedMenuItem]}
              style={{ height: "100%" }}
            >
              <Menu.Item key="SalaPage" onClick={() => history.push("/salas")}>
                Salas
              </Menu.Item>
              <Menu.Item
                key="WorkspacePage"
                onClick={() => history.push("/workspaces")}
              >
                Workspaces
              </Menu.Item>
            </Menu>
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            {children}
          </Content>
        </StyledLayout>
      </StyledContent>
    </Container>
  );
};

export default Layout;
