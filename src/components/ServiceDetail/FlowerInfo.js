import React from "react";
import styled from "styled-components";
import { Descriptions } from "antd";

const FlowerInfo = ({ services }) => {
  const flower = services["제단"];

  return (
    <Descriptions
      title="제단 지원"
      bordered
      column={{ xxl: 4, xl: 4, lg: 4, md: 2, sm: 2, xs: 1 }}
    >
      <Descriptions.Item label="제단 지원금" span={4}>
        {flower["제단지원금"]["금액"]}
      </Descriptions.Item>
      <Descriptions.Item label="꽃바구니 제공" span={4}>
        {flower["꽃바구니"]["꽃바구니"] ? "제공" : "미제공"}
      </Descriptions.Item>
      {flower["꽃바구니"]["꽃바구니"] ? (
        <>
          <Descriptions.Item label="꽃바구니" span={2}>
            {flower["꽃바구니"]["꽃바구니"]}
          </Descriptions.Item>
          <Descriptions.Item label="꽃바구니 갯수" span={4}>
            {flower["꽃바구니"]["갯수"]}
          </Descriptions.Item>
        </>
      ) : null}
      <Descriptions.Item label="헌화용 국화" span={4}>
        {flower["헌화"]["헌화"] ? "제공" : "미제공"}
      </Descriptions.Item>
      {flower["헌화"]["헌화"] ? (
        <>
          <Descriptions.Item label="헌화" span={2}>
            {flower["헌화"]["헌화"]}
          </Descriptions.Item>
          <Descriptions.Item label="헌화 갯수" span={4}>
            {flower["헌화"]["갯수"] + "송이"}
          </Descriptions.Item>
        </>
      ) : null}
    </Descriptions>
  );
};

export default FlowerInfo;
