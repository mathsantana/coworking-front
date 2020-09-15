import React, { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

import api from "../../services/api";
import UserContext from "../../services/userContext";
import { MEETING_COLUMNS } from "../../const";

import Layout from "../../components/Layout";
import CustomTable from "../../components/CustomTable";
import TableHeader from "../../components/TableHeader";
import CreateMeeting from "../../components/Meeting/CreateMeeting";
import EditMeeting from "../../components/Meeting/EditMeeting";
import { Container, StyledCard } from "./styles";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ReuniaoPage = () => {
  const history = useHistory();
  const query = useQuery();
  const { user } = useContext(UserContext);
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [selectedReuniao, setSelectedReuniao] = useState({});

  const getAllReuniao = async () => {
    try {
      const roomId = query.get("room_id");
      const response = await api.get(`/meeting?room_id=${roomId}`);

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteReuniao = async (record) => {
    try {
      const { id } = record;
      await api.delete(`/meeting/${id}`);

      history.go(0);
    } catch (error) {
      console.log(error.response);
    }
  };

  const postReuniao = async (record) => {
    try {
      record.roomId = query.get("room_id");
      record.userId = user.id;
      await api.post(`/meeting/`, record);

      history.go(0);
    } catch (error) {
      console.log(error.response);
    }
  };

  const putReuniao = async (id, record) => {
    try {
      await api.put(`/meeting/${id}`, record);
      setSelectedReuniao(record);
      history.go(0);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleEdit = (record) => {
    setVisibleEdit(true);
    setSelectedReuniao(record);
  };

  return (
    <Layout>
      <Container>
        <StyledCard>
          <TableHeader
            title="Reuniões"
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
            loadData={getAllReuniao}
            columns={MEETING_COLUMNS(deleteReuniao, handleEdit)}
            rowKey={"id"}
          ></CustomTable>
        </StyledCard>
      </Container>
      <CreateMeeting
        visible={visibleCreate}
        onOk={postReuniao}
        onCancel={() => setVisibleCreate(false)}
      />
      <EditMeeting
        visible={visibleEdit}
        onOk={putReuniao}
        onCancel={() => setVisibleEdit(false)}
        record={selectedReuniao}
      />
    </Layout>
  );
};

export default ReuniaoPage;
