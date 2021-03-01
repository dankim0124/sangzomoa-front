import React from "react";
import styled from "styled-components";
import { Table } from "antd";

import Text from "../../../Materials/Text";
import { isMobile } from "../../../Materials/logic/MobileMiddleWare";

const columns = [
  {
    title: "품명",
    dataIndex: "품명",
    key: "품명",
  },
  {
    title: "규격",
    dataIndex: "규격",
    key: "규격",
  },
  {
    title: "금액",
    dataIndex: "금액",
    key: "금액",
  },
];

const ServiceTable = ({ title, column, data }) => {
  return (
    <ServicesSection>
      <Text size="normal">{title}</Text>
      <CustomTable
        dataSource={data}
        columns={columns}
        defaultExpandAllRows={true}
        colSpan={3}
        pagination={{ pageSize: 4 }}
      ></CustomTable>
    </ServicesSection>
  );
};

const ServicesSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin-top: ${isMobile ? "20px" : "40px"};
`;

const CustomTable = styled(Table)`
  margin-top: ${isMobile ? "10px" : "20px"};
`;

export default ServiceTable;
