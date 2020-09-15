import React, { useState, useEffect } from "react";

import { Container, StyledTable } from "./styles";

const CustomTable = ({ loadData, columns, rowKey, refresh, onRowClick }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = (await loadData()) || [];
      setData(data);
    })();
  }, [refresh]);

  return (
    <Container>
      <StyledTable
        bordered
        columns={columns}
        dataSource={data}
        scroll={{ x: "max-content" }}
        rowKey={(record) => record[rowKey]}
        onRow={(record) => {
          return {
            onClick: () => onRowClick && onRowClick(record),
          };
        }}
      />
    </Container>
  );
};

export default CustomTable;
