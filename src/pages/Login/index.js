import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Input, Button, Alert, Modal, Form } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

import logo from "../../assets/logo.png";

import api from "../../services/api";
import UserContext from "../../services/userContext";
import { Container, Box } from "./styles";

const Login = () => {
  const history = useHistory();
  const [loginForm] = Form.useForm();
  const [signUpForm] = Form.useForm();
  const [loading, setLoading] = useState("");
  const [showError, setShowError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const { loginProcedure } = useContext(UserContext);

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await api.post("/user/authenticate", values);

      const { token, user } = response.data;

      loginProcedure(token, user);
      history.push("/salas");
    } catch (error) {
      setShowError(error.response ? error.response.data.error : error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (values) => {
    setLoading(true);
    try {
      const response = await api.post("/user", values);

      const { token, user } = response.data;

      loginProcedure(token, user);
    } catch (error) {
      setShowError(
        error.response ? error.response.data.message : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const closeError = () => {
    setShowError("");
  };

  const rules = (fieldName) => {
    return [
      !(fieldName === "Senha") || {
        type: "string",
        min: 8,
        message: "A senha deve ter no mínimo 8 caracteres",
      },
      !(fieldName === "Email") || {
        type: "email",
        message: "Deve ser um email",
      },
      { required: true, message: `O campo '${fieldName}' é obrigatório!` },
    ];
  };

  return (
    <Container>
      <img src={logo}></img>
      <Box>
        <Form form={loginForm} layout="vertical" name="form">
          <Form.Item key={"email"} name={"email"} rules={rules("Email")}>
            <Input
              id="email"
              size="large"
              placeholder="User"
              prefix={<UserOutlined />}
            />
          </Form.Item>
          <Form.Item key={"password"} name={"password"} rules={rules("Senha")}>
            <Input
              id="password"
              size="large"
              placeholder="Senha"
              type="password"
              prefix={<KeyOutlined />}
            />
          </Form.Item>
        </Form>
        <Button
          style={{ marginTop: 10, marginBottom: 30 }}
          type="primary"
          loading={loading}
          onClick={() => {
            loginForm
              .validateFields()
              .then((values) => {
                handleLogin(values);
              })
              .catch((info) => {
                console.log("Validate Failed:", info);
              });
          }}
        >
          Entrar
        </Button>

        <a onClick={() => setModalVisible(true)}>Cadastrar Usuário</a>

        {!showError || (
          <Alert
            style={{ marginTop: 20 }}
            message="Erro no Login"
            description={showError}
            type="error"
            closable
            onClose={closeError}
          />
        )}
      </Box>
      <Modal
        visible={modalVisible}
        title={"Cadastro de Usuário"}
        okText={"Cadastrar"}
        cancelText="Cancelar"
        confirmLoading={loading}
        onCancel={() => setModalVisible(false)}
        onOk={() => {
          signUpForm
            .validateFields()
            .then((values) => {
              handleSignUp(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form form={signUpForm} layout="vertical" name="form">
          <Form.Item
            key={"firstName"}
            name={"firstName"}
            rules={rules("Nome")}
            label={"Nome"}
          >
            <Input />
          </Form.Item>
          <Form.Item
            key={"lastName"}
            name={"lastName"}
            rules={rules("Sobrenome")}
            label={"Sobrenome"}
          >
            <Input />
          </Form.Item>
          <Form.Item
            key={"email"}
            name={"email"}
            rules={rules("Email")}
            label={"Email"}
          >
            <Input />
          </Form.Item>
          <Form.Item
            key={"password"}
            name={"password"}
            rules={rules("Senha")}
            label={"Senha"}
          >
            <Input type="password" />
          </Form.Item>
        </Form>
        {!showError || (
          <Alert
            style={{ marginTop: 20 }}
            message="Erro no Cadastro"
            description={showError}
            type="error"
            closable
            onClose={closeError}
          />
        )}
      </Modal>
    </Container>
  );
};

Login.propTypes = {
  value: PropTypes.object,
};

export default Login;
