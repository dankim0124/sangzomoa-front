import React from "react";
import styled from "styled-components";
import { Descriptions } from "antd";
import { CloseCircleTwoTone, CheckCircleTwoTone } from "@ant-design/icons";

const BasicInfo = ({ companyName, productName, price, mubinso }) => {
  return (
    <Descriptions
      title="기본 정보"
      bordered
      column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
    >
      <Descriptions.Item label="회사" span={4}>
        {companyName}
      </Descriptions.Item>
      <Descriptions.Item label="상품" span={4}>
        {productName}
      </Descriptions.Item>
      <Descriptions.Item label="가격" span={4}>
        {price}
      </Descriptions.Item>
      <Descriptions.Item label="무빈소 상품" span={4}>
        {mubinso ? <checkCircleTwoTone /> : <CloseCircleTwoTone />}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default BasicInfo;
