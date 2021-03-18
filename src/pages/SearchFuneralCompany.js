import { API } from "aws-amplify";
import { map } from "jquery";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import LeftSection from "../components/MapPageComponent/LeftSection/LeftSection";
import RightSection from "../components/MapPageComponent/RightSection/RightSection";

import { isMobile } from "../Materials/logic/MobileMiddleWare";


const SearchFuneralCompany = () => {
  const [funeralCompany, setFuneralCompny] = useState([]);
  const [centerAddr, setCenterAddr] = useState();
  const [clickedCompany, setClickedCompany] = useState();
  const kakaoRef = useRef({}); // {map,zoomControl, geocoder} .. 

  useEffect(()=>{
    if(centerAddr){
      queyCompanyByAddr(centerAddr);
    }
  },[centerAddr])

  const queyCompanyByAddr = async (addr) => {
    let startTime = new Date();
    const company = await API.post("sanzo_backend", "/queryCompanyByAddr", {
      body: {
        PK: "funeralCompany",
        addr: addr,
      },
    });
    let endTime = new Date();
    console.log("api delayed : ",endTime-startTime)
    setFuneralCompny(company.Items)
    return company;
  };
   

 
  return (
    <>
      <SearchFuneralCompanyContainer>
        <LeftSection
          kakaoRef={kakaoRef}
          funeralCompany={funeralCompany}
          setClickedCompany={setClickedCompany}
          setCenterAddr={setCenterAddr}
          centerAddr={centerAddr}
        />
        <RightSection kakaoRef={kakaoRef} clickedCompany={clickedCompany} />
      </SearchFuneralCompanyContainer>
      {isMobile ? null : <NavDivider />}
    </>
  );
};

const NavDivider = styled.div`
  position: absolute;
  top: 80px;
  width: 100%;
  height: 2px;
  background: #dddddd;
`;

const SearchFuneralCompanyContainer = isMobile
  ? styled.div`
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;
      align-items: flex-start;
      margin-top: 80px;
    `
  : styled.div`
      display: flex;
      flex-direction: row;
      justify-content: center;
      width: 100%;
      align-items: flex-start;

      <!-- 데탑 마진-->;
      margin-top:82px;
`;

export default SearchFuneralCompany;
