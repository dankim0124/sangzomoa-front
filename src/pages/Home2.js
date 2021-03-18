import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";

import "./Home.css";
import desktop_banner from "../images/visual@3x.jpg";
import mobile_banner from "../images/mobile_banner2.jpg";
import searchFilter from "../images/search_filter.png";
import filterReset from "../images/filter_reset.jpg";
import CardGrid from "../components/Pagination/Pagination";
import Footer from "../components/Footer/Footer";
import jQuery from "jquery";
import { isMobile } from "../Materials/logic/MobileMiddleWare";
import styled from "styled-components";
window.$ = window.jQuery = jQuery;

const banner = isMobile ? mobile_banner : desktop_banner;

const Home2 = () => {
  const [funeralItems, setFuneralItems] = useState(false);

  useEffect(async () => {
    if (isMobile) {
      mobileInitialize();
    }
    const data = await queryFuneralItems();
    if (data) {
      setFuneralItems(data);
    }
  }, []);

  //func
  // 추가분 : .browser initialize 는 app 에서 진행해야됨.. 분리.
  // isMobile 은 app 에서 ? 아니면 materials에서 관리?
  // materials  ->  components -> text, space ...
  //            ㄴ> logic  - > mobile Middleware

  const mobileInitialize = () => {
    const mobileWidth = window.screen.width;
    window.$(".home-banner-img").css("height", mobileWidth);
    window.$(".browser_").css("width", mobileWidth);
    const bannerContentsBottom = mobileWidth - 140 - 101; // margin-top & banner contents height
    window.$(".banner-contents").css("margin-bottom", bannerContentsBottom);
  };

  const queryFuneralItems = async () => {
    const data = await API.post("sanzo_backend", "/queryByPk", {
      body: {
        PK: "funeralSevice",
      },
    });
    return data;
  };
  return (
    <div>
      <BannerImg className="home-banner-img" src={banner} />

      <HomeContainer>
        <HomeContents>
          <BannerContents className="banner-contents">
            <BannerMainText>임시 페이지입니다.</BannerMainText>
            <BannerSubText>
              수정사항, 피드백 환영합니다. 아래 이메일로 보내주세요.
            </BannerSubText>
            <BannerButtonContainer>
              <GreyBannerButton text={"이전"} />
              <BlueBannerButton text={"다음"} />
            </BannerButtonContainer>
          </BannerContents>
          <HomeContentsInputContainer>
            <HomeSearchTitle>상조상품 검색</HomeSearchTitle>
            <HomeContentInputRow>
              <HomeContentsInputWrapper>
                <HomeContentsInput
                  type="text"
                  placeholder={
                    isMobile ? "상조상품 검색" : "상품의 이름을 검색하세요."
                  }
                />
                <HomeInputSearchButton className="fas fa-search" />
              </HomeContentsInputWrapper>
              <HomeSearchFilterImg src={searchFilter} />
              <HomeSearchFilterImg src={filterReset} />
            </HomeContentInputRow>
          </HomeContentsInputContainer>
          <CardGrid funeralItems={funeralItems} />
        </HomeContents>
      </HomeContainer>
    </div>
  );
};
const BannerButton = ({ buttonStyle, text }) => {
  const BUTTON_STYLE = [
    "grey-banner-button",
    "blue-gradation-banner-button",
    "mobile-grey-banner-button",
    "mobile-blue-gradation-banner-button",
  ];
  const currentStyle = BUTTON_STYLE.includes(buttonStyle)
    ? buttonStyle
    : BUTTON_STYLE[0];
  return (
    <div className={currentStyle}>
      <span className={`${CSS["banner-button-text"]}`}>{text}</span>
      <i className="fas fa-long-arrow-alt-right home-banner-arrow-icon"></i>
    </div>
  );
};

const BannerImg = isMobile
  ? styled.img``
  : styled.img`
      max-width: 1345px;
      height: 652px;
      width: 100%;
      object-fit: cover;
      position: absolute;
      top: -5px;
      right: 0;
      z-index: -1;
    `;
const HomeContainer = isMobile
  ? styled.div``
  : styled.div`
     width: 100%;
     height: 100%;
     display: flex;
     justify-content: center;
     }`;
const HomeContents = isMobile
  ? styled.div``
  : styled.div`
      display: flex;
      flex-direction: column;
      justify-content: center;
      max-width: 85%;
    `;
const BannerContents = isMobile
  ? styled.div``
  : styled.div`
      display: flex;
      flex-direction: column;
      margin-top: 242px;
      margin-bottom: 234px;
    `;
const BannerMainText = isMobile
  ? styled.div``
  : styled.div`
      font-family: "NotoSansKr-R";
      font-size: 28px;
      line-height: 26px;
      letter-spacing: -1.68px;
      color: #191919;
      margin-bottom: 19px;
      font-weight: bold;
      text-align: left;
    `;
const BannerSubText = isMobile
  ? styled.div``
  : styled.div`
      margin-bottom: 42px;
      font-family: "NotoSansKr-R";
      font-size: 21px;
      font-weight: 300;
      font-style: normal;
      line-height: 1.33;
      letter-spacing: -0.84px;
      text-align: left;
      color: #787878;
    `;
const BannerButtonContainer = isMobile
  ? styled.div``
  : styled.div`
      display: flex;
    `;
const GreyBannerButton = isMobile
  ? styled(BannerButton)``
  : styled(BannerButton)`
      padding: 12px 18px 10px;
      border-radius: 18.8px;
      margin-right: 24px;
      background-color: #7a7a7a;
      opacity: 0.7;
      align-items: center;
    `;
const BlueBannerButton = isMobile
  ? styled(BannerButton)``
  : styled(BannerButton)`
      margin-right: 24px;
      padding: 12px 18px 10px;
      border-radius: 18.8px;
      background: linear-gradient(to top, #669db9, #306fbc);
      align-items: center;
    `;
const HomeContentsInputContainer = isMobile
  ? styled.div``
  : styled.div`
      margin-top: 50px;
      display: flex;
      flex-direction: column;
    `;
const HomeSearchTitle = isMobile
  ? styled.div``
  : styled.div`
      font-family: "NotoSansKr-R";
      font-size: 21px;
      font-weight: 300;
      font-style: normal;
      line-height: 1.33;
      letter-spacing: -0.84px;
      text-align: left;
      color: #191919;
      align-self: left;
      margin: 0 0 10px 10px;
    `;
const HomeContentInputRow = isMobile
  ? styled.div``
  : styled.div`
      display: flex;
      align-items: center;
    `;
const HomeContentsInputWrapper = isMobile
  ? styled.div``
  : styled.div`
      padding: 11px 18px 13px 28px;
      border-radius: 26px;
      border: solid 1px #679cbd;
      background-color: #ffffff;
      margin-right: 5px;
    `;
const HomeContentsInput = isMobile
  ? styled.input``
  : styled.input`
      width: 60vw;

      height: 100%;
      border: 0px;
      outline: none;
      float: left;
      color: #5c94ba;
    `;
const HomeInputSearchButton = isMobile ? styled.div`` : styled.div``;
const HomeSearchFilterImg = isMobile
  ? styled.img``
  : styled.img`
      width: 40px;
      height: 40px;
      margin-right: 10px;
    `;

export default Home2;
