import React from "react";
import styled from "styled-components";
import { Descriptions } from "antd";

const ClothInfo = ({ services }) => {
  const cloth = services["의전용품"];
  const countProvide = (num) => {
    if (num == null) return;
    return num != -1 ? num + "명" : "필요수량 제공";
  };
  return (
    <Descriptions
      title="의전 용품"
      bordered
      column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
    >
      <Descriptions.Item label="전통상복 구성" span={2}>
        {cloth["전통상복"]["전통상복"]}
      </Descriptions.Item>
      <Descriptions.Item label="전통상복 제공인원" span={2}>
        {countProvide(cloth["전통상복"]["인원"])}
      </Descriptions.Item>
      <Descriptions.Item label="남성상복" span={2}>
        {cloth["남성현대식상복"]["상복"]}
      </Descriptions.Item>
      <Descriptions.Item label="남성상복 제공인원" span={2}>
        {countProvide(cloth["남성현대식상복"]["인원"])}
      </Descriptions.Item>
      <Descriptions.Item label="여성상복" span={2}>
        {cloth["여성현대식상복"]["상복"]}
      </Descriptions.Item>
      <Descriptions.Item label="여성상복 제공인원" span={2}>
        {countProvide(cloth["여성현대식상복"]["인원"])}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default ClothInfo;
