import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";

const EditRoom = ({ visible, onOk, onCancel, record }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(record);
  }, [record]);

  const rulesRequired = (fieldName) => [
    {
      required: true,
      message: `o campo ${fieldName} é obrigatório!`,
    },
  ];

  return (
    <Modal
      visible={visible}
      title="Editar Sala"
      okText="Editar"
      cancelText="Cancelar"
      onCancel={() => onCancel()}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onOk(record.id, values);
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

export default EditRoom;
