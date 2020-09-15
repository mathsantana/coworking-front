import React, { useEffect } from "react";
import { Modal, Form, Input, DatePicker } from "antd";
import moment from "moment";

const EditWorkspace = ({ visible, onOk, onCancel, record }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    record.startDate = moment(record.startDate);
    record.endDate = moment(record.endDate);
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
      title="Editar Reunião"
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
      <Form form={form} vallayout="vertical" name="form">
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

export default EditWorkspace;
