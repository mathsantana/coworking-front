import React from "react";
import { Modal, Form, Input, DatePicker } from "antd";

const CreateMeeting = ({ visible, onOk, onCancel }) => {
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
      title="Criar Reunião"
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
        <Form.Item key="description" name="description" label="Descrição">
          <Input />
        </Form.Item>
        <Form.Item
          key="startDate"
          name="startDate"
          label="Data de início"
          rules={rulesRequired("Data de início")}
        >
          <DatePicker
            format="DD/MM/YYYY HH:mm:ss"
            showTime={{ format: "HH:mm:ss" }}
          />
        </Form.Item>
        <Form.Item
          key="endDate"
          name="endDate"
          label="Data de término"
          rules={rulesRequired("Data de término")}
        >
          <DatePicker
            format="DD/MM/YYYY HH:mm:ss"
            showTime={{ format: "HH:mm:ss" }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateMeeting;
