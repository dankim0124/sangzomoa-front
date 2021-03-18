import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import styled from "styled-components";

import { useAuthState } from "../lib/authLib";
import NavDivider from "../Materials/NavDivider";
import Header from "../components/MyPage/Header";
import InfoBox from "../components/MyPage/InfoBox";
import CompareList from "../components/MyPage/CompareList";

const MyPage = () => {
  const context = useAuthState();
  const [userInfo, setUserInfo] = useState();
 

  useEffect(() => {
    loadUserInfo();
  }, []);

  useEffect(() => {
    console.log("useEffect userInfo ", userInfo);
  }, [userInfo]);

  const loadUserInfo = async () => {
    const result = await API.post("sanzo_backend", "/querySKBeginsWith", {
      body: {
        PK: "user",
        SK: context.user,
      },
    });

    console.log("result : ",result);
    setUserInfo(result.Items[0]);
  };

  return (
    <>
      <NavDivider />
      <MyPageContainer>
        <Header email={context.user} />
        <InfoBox userInfo={userInfo} />
        {userInfo ? (
          <CompareList
            compareList={userInfo.selected["비교하기"]["상조상품"]}
          />
        ) : null}
      </MyPageContainer>
    </>
  );
};

const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  height: 100%;
  margin-top: 80px;
`;

export default MyPage;
