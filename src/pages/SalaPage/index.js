import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

import api from "../../services/api";
import { SALAS_COLUMNS } from "../../const";

import Layout from "../../components/Layout";
import CustomTable from "../../components/CustomTable";
import TableHeader from "../../components/TableHeader";
import CreateRoom from "../../components/Room/CreateRoom";
import EditRoom from "../../components/Room/EditRoom";
import { Container, StyledCard } from "./styles";

const SalaPage = () => {
  const history = useHistory();
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [selectedSala, setSelectedSala] = useState({});

  const getAllSala = async () => {
    try {
      const response = await api.get("/room");

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSala = async (record) => {
    try {
      const { id } = record;
      await api.delete(`/room/${id}`);

      history.go(0);
    } catch (error) {
      console.log(error.response);
    }
  };

  const postSala = async (record) => {
    try {
      await api.post(`/room/`, record);

      history.go(0);
    } catch (error) {
      console.log(error.response);
    }
  };

  const putSala = async (id, record) => {
    try {
      await api.put(`/room/${id}`, record);
      setSelectedSala(record);
      history.go(0);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleEdit = (record) => {
    setVisibleEdit(true);
    setSelectedSala(record);
  };

  return (
    <Layout selectedMenuItem="SalaPage">
      <Container>
        <StyledCard>
          <TableHeader
            title="Salas"
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
            loadData={getAllSala}
            columns={SALAS_COLUMNS(deleteSala, handleEdit)}
            rowKey={"id"}
            onRowClick={(record) => {
              history.push(`/reuniao?room_id=${record.id}`);
            }}
          ></CustomTable>
        </StyledCard>
      </Container>
      <CreateRoom
        visible={visibleCreate}
        onOk={postSala}
        onCancel={() => setVisibleCreate(false)}
      />
      <EditRoom
        visible={visibleEdit}
        onOk={putSala}
        onCancel={() => setVisibleEdit(false)}
        record={selectedSala}
      />
    </Layout>
  );
};

export default SalaPage;
