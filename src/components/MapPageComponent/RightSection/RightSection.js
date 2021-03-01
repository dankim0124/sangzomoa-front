/*global kakao */
import React, { useState, useEffect } from "react";
import styled from "styled-components";

import DescriptionSection from "./Description";
import { isMobile } from "../../../Materials/logic/MobileMiddleWare";

const RightSection = ({ kakaoRef ,clickedCompany }) => {
  const { map, geocoder } = kakaoRef.current;
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    console.log(clickedCompany)
  },[clickedCompany]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const loc = searchWord;
    console.log(loc);
    if (!loc) {
      return;
    }
    geocoder.addressSearch(loc, function (result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        console.log("succeess");
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        map.setCenter(coords);
      } else {
        alert("주소검색에 실패했습니다. 올바른 주소를 입력해주세요.");
      }
    });
  };

  const handleKeyUp = (e) => {
    if (window.event.keyCode == 13) {
      handleSubmit(e);
    }
  };

  return (
    <Container>
      <CenterContents>
        <CenterLocationInput>
          <LocationSearchInput
            searchWord={searchWord}
            setSearchWord={setSearchWord}
            handleSubmit={handleSubmit}
            handleKeyUp={handleKeyUp}
          />
        </CenterLocationInput>

        <DescriptionSection clickedCompany={clickedCompany}/>
        
      </CenterContents>
    </Container>
  );
};

const LocationSearchInput = ({ handleSubmit, searchWord, setSearchWord, handleKeyUp }) => {
  return (
    <LocationInputWrapper>
      <LocationInputForm
        placeholder="지역을 입력해 주세요. 예) 도봉구"
        value={searchWord}
        onChange={(e) => setSearchWord(e.target.value)}
        onKeyUp={(e) => handleKeyUp(e)}
      />
      <SearchIcon className="fas fa-search" onClick={(e) => handleSubmit(e)} />
    </LocationInputWrapper>
  );
};

const Container = isMobile
  ? styled.div`
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-contents: center;

      margin-top: 35px;
    `
  : styled.div`
      width: 614px;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;

      margin-top: 48px;

      @media (max-width: 1440px) {
        width: 500px;
      }
    `;

const CenterContents = styled.div`
  width: 80%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const LocationInputWrapper = styled.div`
  width: 100%;

  display: felx;
  justify-content: space-between;
  align-items: center;

  border-radius: 26px;
  border: solid 1px #679cbd;
  background-color: #ffffff;

  margin-right: 5px;
  padding: 11px 18px 13px 28px;
`;

const LocationInputForm = styled.input`
  height: 100%;
  width: 80%;

  outline: none;
  float: left;

  border: 0px;
  color: #5c94ba;
`;

const SearchIcon = styled.i`
  margin-right: 15px;
  color: #5c94ba;
  cursor: pointer;
`;

const CenterLocationInput = isMobile
  ? styled.div`
      display: flex;
      justify-content: center;
      width: 100%;
    `
  : styled.div`
      width: 100%;
      min-width: 400px;

      display: flex;
      justify-content: center;
    `;
export default RightSection;
