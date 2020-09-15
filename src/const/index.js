import React from "react";
import moment from "moment";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";

import CustomButton from "../components/CustomButton";

export const SALAS_COLUMNS = (handleRemove, handleEdit) => [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Nome",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Ações",
    key: "actions",
    render: (record) => (
      <>
        <CustomButton
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
        />
        <CustomButton
          icon={<CloseOutlined />}
          onClick={() => handleRemove(record)}
        />
      </>
    ),
  },
];

export const WORKSPACE_COLUMNS = (handleRemove, handleEdit) => [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Nome",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Ações",
    key: "actions",
    render: (record) => (
      <>
        <CustomButton
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
        />
        <CustomButton
          icon={<CloseOutlined />}
          onClick={() => handleRemove(record)}
        />
      </>
    ),
  },
];

export const MEETING_COLUMNS = (handleRemove, handleEdit) => [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Descrição",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Data de início",
    dataIndex: "startDate",
    key: "startDate",
    render: (text) => moment(text).format("DD/MM/YYYY H:mm:ss"),
  },
  {
    title: "Data de término",
    dataIndex: "endDate",
    key: "endDate",
    render: (text) => moment(text).format("DD/MM/YYYY H:mm:ss"),
  },
  {
    title: "Dono",
    dataIndex: ["host", "email"],
    key: "host",
  },
  {
    title: "Ações",
    key: "actions",
    render: (record) => (
      <>
        <CustomButton
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
        />
        <CustomButton
          icon={<CloseOutlined />}
          onClick={() => handleRemove(record)}
        />
      </>
    ),
  },
];

export const WORKSPACE_USER_COLUMNS = (handleRemove, handleEdit) => [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Data de início",
    dataIndex: "startDate",
    key: "startDate",
    render: (text) => moment(text).format("DD/MM/YYYY H:mm:ss"),
  },
  {
    title: "Data de término",
    dataIndex: "endDate",
    key: "endDate",
    render: (text) => moment(text).format("DD/MM/YYYY H:mm:ss"),
  },
  {
    title: "Usuário",
    dataIndex: ["users", "email"],
    key: "user",
  },
  {
    title: "Ações",
    key: "actions",
    render: (record) => (
      <>
        <CustomButton
          icon={<CloseOutlined />}
          onClick={() => handleRemove(record)}
        />
      </>
    ),
  },
];
