import React, { useState, useEffect } from "react";
import { Descriptions } from "antd";

const InfoBox = ({ userInfo }) => {
  useEffect(() => {
    console.log(userInfo);
  });
  if (userInfo) {
    return (
      <Descriptions title="User Info">
        <Descriptions.Item label="이메일">{userInfo.email}</Descriptions.Item>
        <Descriptions.Item label="상조상품 비교">
          {userInfo.selected["비교하기"]["상조상품"].length} 개
        </Descriptions.Item>
        <Descriptions.Item label="장례식장 비교">
          {userInfo.selected["비교하기"]["장례식장"]
            ? userInfo.selected["비교하기"]["장례식장"]
            : "0"}{" "}
          개
        </Descriptions.Item>

        <Descriptions.Item label="구매 예정 금액">100000원</Descriptions.Item>
      </Descriptions>
    );
  } else {
    return <h1>정보를 불러올 수 없음</h1>;
  }
};

export default InfoBox;
