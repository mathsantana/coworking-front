import React from "react";
import { Modal, Form, Input } from "antd";

const CreateRoom = ({ visible, onOk, onCancel }) => {
  const [form] = Form.useForm();

  const rulesRequired = (fieldName) => [
    {
      required: true,
      message: `o campo ${fieldName} é obrigatório!`,
    },
  ];

  return (
    <Modal
      visible={visible}
      title="Criar Sala"
      okText="Criar"
      cancelText="Cancelar"
      onCancel={() => onCancel()}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onOk(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form">
        <Form.Item
          key="name"
          name="name"
          label="Nome"
          rules={rulesRequired("Nome")}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateRoom;
