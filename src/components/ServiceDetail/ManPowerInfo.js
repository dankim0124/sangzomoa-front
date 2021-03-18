import React from "react";
import styled from "styled-components";
import { Descriptions } from "antd";

const ManPowerInfo = ({ services }) => {
  const manPower = services["인력"];

  return (
    <Descriptions
      title="지원 인력"
      bordered
      column={{ xxl: 4, xl: 4, lg: 4, md: 2, sm: 2, xs: 2 }}
    >
      <Descriptions.Item label="장례지도사" span={4}>
        {manPower["장례지도사"]["인원"] ? "지원" : "-"}
      </Descriptions.Item>
      <Descriptions.Item label="장례지도사 인원" span={2}>
        {manPower["장례지도사"]["인원"] + "명"}
      </Descriptions.Item>
      <Descriptions.Item label="장례지도사 근무일" span={2}>
        {manPower["장례지도사"]["근무일"] + "일"}
      </Descriptions.Item>

      <Descriptions.Item label="도우미" span={4}>
        {manPower["도우미"]["인원"] ? "지원" : "-"}
      </Descriptions.Item>
      <Descriptions.Item label="인원" span={2}>
        {manPower["도우미"]["인원"] + "명"}
      </Descriptions.Item>
      <Descriptions.Item label="근무일" span={2}>
        {manPower["도우미"]["근무일"] + "일"}
      </Descriptions.Item>
      <Descriptions.Item label="근무시간" span={2}>
        {manPower["도우미"]["근무시간"] + "시간"}
      </Descriptions.Item>

      {manPower["입관보조"]["인원"] != null ? (
        <>
          <Descriptions.Item label="입관보조 인원" span={2}>
            {manPower["입관보조"]["인원"]}
          </Descriptions.Item>
        </>
      ) : null}
      {manPower["운구인력"]["인원"] != null ? (
        <>
          <Descriptions.Item label="운구인력 인원" span={2}>
            {manPower["운구인력"]["인원"]}
          </Descriptions.Item>
        </>
      ) : null}
    </Descriptions>
  );
};

export default ManPowerInfo;
