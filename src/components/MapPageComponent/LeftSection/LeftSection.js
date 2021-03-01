/*global kakao */
import React, { useEffect } from "react";
import styled from "styled-components";


import { importKakaoMapAPI, markPoint } from "./KaKaoMap";
import { isMobile } from "../../../Materials/logic/MobileMiddleWare";


const LeftSection = ({ kakaoRef, funeralCompany,setClickedCompany,  setCenterAddr ,centerAddr }) => {
  const { map, geocoder } = kakaoRef.current;
  
  useEffect(() => {
    importKakaoMapAPI("SearchSection-MapDiv", kakaoRef, setCenterAddr , centerAddr);
    return () => {
      console.log("clean up kakoMap")
      kakaoRef.current = undefined;
    };
  }, []);

  useEffect(() => {
    markPoint(map, geocoder, funeralCompany,setClickedCompany);
  }, [funeralCompany]);

  return (
    <Left>
      <MapDiv id="SearchSection-MapDiv" />
    </Left>
  );
};

const MapDiv = styled.div`
  width: 100%;
  height: 100%;
`;

const Left = isMobile
  ? styled.div`
      width: ${window.screen.width}px;
      height: ${window.screen.width}px;
    `
  : styled.div`
      width: 641px;
      height: 714px;

      @media (max-width: 1440px) {
        width: 500px;
        height: 600px;
      }
      @media (max-width: 960px) {
        padding-left: 20px;
      }
    `;

export default LeftSection;
