import React from "react";
import styled from "styled-components";
import { Descriptions } from "antd";
import { CloseCircleTwoTone, CheckCircleTwoTone } from "@ant-design/icons";

const GoinInfo = ({ services }) => {
  return (
    <Descriptions
      title="고인 용품"
      bordered
      column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
    >
      <Descriptions.Item label="관" span={2}>
        {services["고인용품"]["관"]}
      </Descriptions.Item>
      <Descriptions.Item label="유골함" span={2}>
        {services["고인용품"]["유골함"]}
      </Descriptions.Item>
      <Descriptions.Item label="수의" span={2}>
        {services["고인용품"]["수의"]}
      </Descriptions.Item>
      {services["고인용품"]["기타"].length > 0 ? (
        <Descriptions.Item label="기타" span={4}>
          {services["고인용품"]["기타"]}
        </Descriptions.Item>
      ) : null}
    </Descriptions>
  );
};

export default GoinInfo;