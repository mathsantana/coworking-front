import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

import api from "../../services/api";
import { SALAS_COLUMNS } from "../../const";

import Layout from "../../components/Layout";
import CustomTable from "../../components/CustomTable";
import TableHeader from "../../components/TableHeader";
import CreateWorkspace from "../../components/Workspace/CreateWorkspace";
import EditWorkspace from "../../components/Workspace/EditWorkspace";
import { Container, StyledCard } from "./styles";

const WorkspacePage = () => {
  const history = useHistory();
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState({});

  const getAllWorkspace = async () => {
    try {
      const response = await api.get("/workspace");

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteWorkspace = async (record) => {
    try {
      const { id } = record;
      await api.delete(`/workspace/${id}`);

      history.go(0);
    } catch (error) {
      console.log(error.response);
    }
  };

  const postWorkspace = async (record) => {
    try {
      await api.post(`/workspace/`, record);

      history.go(0);
    } catch (error) {
      console.log(error.response);
    }
  };

  const putWorkspace = async (id, record) => {
    try {
      await api.put(`/workspace/${id}`, record);
      setSelectedWorkspace(record);
      history.go(0);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleEdit = (record) => {
    setVisibleEdit(true);
    setSelectedWorkspace(record);
  };

  return (
    <Layout selectedMenuItem="WorkspacePage">
      <Container>
        <StyledCard>
          <TableHeader
            title="Workspaces"
            buttons={[
              [
                "Criar",
                {
                  icon: <PlusOutlined />,
                  onClick: () => setVisibleCreate(true),
                },
              ],
            ]}
          />
          <CustomTable
            loadData={getAllWorkspace}
            columns={SALAS_COLUMNS(deleteWorkspace, handleEdit)}
            rowKey={"id"}
            onRowClick={(record) => {
              history.push(`/workspaces/horario?workspace_id=${record.id}`);
            }}
          ></CustomTable>
        </StyledCard>
      </Container>
      <CreateWorkspace
        visible={visibleCreate}
        onOk={postWorkspace}
        onCancel={() => setVisibleCreate(false)}
      />
      <EditWorkspace
        visible={visibleEdit}
        onOk={putWorkspace}
        onCancel={() => setVisibleEdit(false)}
        record={selectedWorkspace}
      />
    </Layout>
  );
};

export default WorkspacePage;
