import React, { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

import api from "../../services/api";
import UserContext from "../../services/userContext";
import { WORKSPACE_USER_COLUMNS } from "../../const";

import Layout from "../../components/Layout";
import CustomTable from "../../components/CustomTable";
import TableHeader from "../../components/TableHeader";
import CreateWorkspaceUser from "../../components/WorkspaceUser/CreateWorkspaceUser";
import EditWorkspaceUser from "../../components/WorkspaceUser/EditWorkspaceUser";
import { Container, StyledCard } from "./styles";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const WorkspaceUserPage = () => {
  const history = useHistory();
  const query = useQuery();
  const { user } = useContext(UserContext);
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [selectedWorkspaceHorario, setWorkspaceHorario] = useState({});

  const getAllWorkspaceHorario = async () => {
    try {
      const workspaceId = query.get("workspace_id");
      const response = await api.get(`/workspace/${workspaceId}/schedule`);

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteWorkspaceHorario = async (record) => {
    try {
      const { id } = record;
      await api.delete(`/workspace/schedule/${id}`);

      history.go(0);
    } catch (error) {
      console.log(error.response);
    }
  };

  const postWorkspaceHorario = async (record) => {
    try {
      const workspaceId = query.get("workspace_id");
      record.userId = user.id;
      await api.post(`/workspace/${workspaceId}/schedule`, record);

      history.go(0);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleEdit = (record) => {
    setVisibleEdit(true);
    setWorkspaceHorario(record);
  };

  return (
    <Layout>
      <Container>
        <StyledCard>
          <TableHeader
            title="Horários Workspaces"
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
            loadData={getAllWorkspaceHorario}
            columns={WORKSPACE_USER_COLUMNS(deleteWorkspaceHorario, handleEdit)}
            rowKey={"id"}
          ></CustomTable>
        </StyledCard>
      </Container>
      <CreateWorkspaceUser
        visible={visibleCreate}
        onOk={postWorkspaceHorario}
        onCancel={() => setVisibleCreate(false)}
      />
    </Layout>
  );
};

export default WorkspaceUserPage;
