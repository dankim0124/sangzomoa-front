import React from "react";
import styled from "styled-components";
import { Descriptions } from "antd";

const VihecleInfo = ({ services }) => {
  const vihecle = services["차량"];
  const countProvide = (num) => {
    if (num == null) return;
    return num != -1 ? "왕복 " + num + "km" : "필요범위 제공";
  };
  return (
    <Descriptions
      title="차량 제공"
      bordered
      column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
    >
      <Descriptions.Item label="리무진 제공" span={2}>
        {vihecle["리무진"]["지원"] ? "지원" : "지원안함"}
      </Descriptions.Item>
      <Descriptions.Item label="리무진 이동거리" span={2}>
        {countProvide(vihecle["리무진"]["이동거리"])}
      </Descriptions.Item>

      {vihecle["리무진"]["차종"] ? (
        <Descriptions.Item label="리무진 차종" span={2}>
          {vihecle["리무진"]["차종"]}
        </Descriptions.Item>
      ) : null}
      {vihecle["리무진"]["선택"] ? (
        <Descriptions.Item label="선택 여부" span={2}>
          {vihecle["리무진"]["선택"]}
        </Descriptions.Item>
      ) : null}

      <Descriptions.Item label="유족버스 제공" span={2}>
        {vihecle["버스"]["지원"] ? "지원" : "지원안함"}
      </Descriptions.Item>
      <Descriptions.Item label="버스 이동거리" span={2}>
        {countProvide(vihecle["버스"]["이동거리"])}
      </Descriptions.Item>

      {vihecle["버스"]["차종"] ? (
        <Descriptions.Item label="버스 차종" span={2}>
          {vihecle["버스"]["차종"]}
        </Descriptions.Item>
      ) : null}
      {vihecle["버스"]["선택"] ? (
        <Descriptions.Item label="선택 여부" span={2}>
          {vihecle["버스"]["선택"]}
        </Descriptions.Item>
      ) : null}

      <Descriptions.Item label="앰뷸런스 제공" span={2}>
        {vihecle["앰뷸런스"]["지원"] ? "지원" : "지원안함"}
      </Descriptions.Item>
      <Descriptions.Item label="앰뷸런스 이동거리" span={2}>
        {vihecle["앰뷸런스"]["지원범위"]}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default VihecleInfo;
