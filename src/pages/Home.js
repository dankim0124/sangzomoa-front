import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";

import "./Home.css";
import desktop_banner from "../images/visual@3x.jpg";
import mobile_banner from "../images/mobile_banner2.jpg";
import searchFilter from "../images/search_filter.png";
import filterReset from "../images/filter_reset.jpg";
import jQuery from "jquery";
import Paginate from "../components/NavBar/Pagination/Pagination";

window.$ = window.jQuery = jQuery;
let banner;
export const isMobile = window.screen.width < 770;
const desktopCSS = {
  "home-container": "home-container",
  "home-contents": "home-contents",
  "banner-contents": "banner-contents",
  "banner-main-text": "banner-main-text",
  "banner-sub-text": "banner-sub-text",
  "grey-banner-button": "grey-banner-button",
  "blue-gradation-banner-button": "blue-gradation-banner-button",
  "banner-button-text": "banner-button-text",
  "home-contents-input-container": "home-contents-input-container",
  "home-search-title": "home-search-title",
  "home-contents-input-wrapper": "home-contents-input-wrapper",
  "home-contents-input": "home-contents-input",
  "home-search-filter-img": "home-search-filter-img",
};

const mobileCSS = {
  "home-container": "mobile-home-container",
  "home-contents": "mobile-home-contents",
  "banner-contents": "mobile-banner-contents",
  "banner-main-text": "mobile-banner-main-text",
  "banner-sub-text": "mobile-banner-sub-text",
  "grey-banner-button": "mobile-grey-banner-button",
  "blue-gradation-banner-button": "mobile-blue-gradation-banner-button",
  "banner-button-text": "mobile-banner-button-text",
  "home-contents-input-container": "mobile-home-contents-input-container",
  "home-search-title": "mobile-home-search-title",
  "home-contents-input-wrapper": "mobile-home-contents-input-wrapper",
  "home-contents-input": "mobile-home-contents-input",
  "home-search-filter-img": "mobile-home-search-filter-img",
};

let CSS;

//mobile screen <768px?
console.log("out of component : ", window.screen.width);

if (isMobile) {
  banner = mobile_banner;
  CSS = mobileCSS;
} else {
  banner = desktop_banner;
  CSS = desktopCSS;
}

const Home = () => {
  //Hooks
  const [funeralItems, setFuneralItems] = useState();

  useEffect(async () => {
    if (isMobile) {
      mobileInitialize();
    }
    const data = await queryFuneralItems();
    if (data) {
      setFuneralItems(data);
    }
  }, []);

  const mobileInitialize = () => {
    const mobileWidth = window.screen.width;
    window.$(".home-mobile-banner-img").css("height", mobileWidth);
    window.$(".browser_").css("width", mobileWidth);
    window.$(".browser_").css("min-width", "0px");
    const bannerContentsBottom = mobileWidth - 140 - 101; // margin-top & banner contents height
    window
      .$(".mobile-banner-contents")
      .css("margin-bottom", bannerContentsBottom);
  };

  //functions
  const getGridSize = () => {
    var jbVar = window.$(".funeral-item-grid").width();
    console.log("grid Size : ", jbVar);
  };

  const queryFuneralItems = async () => {
    const hello = await API.get("sanzo_backend", "/test");
    const data = await API.post("sanzo_backend", "/queryByPk", {
      body: {
        PK: "funeralSevice",
      },
    });
    return data;
  };

  //eventListener
  window.addEventListener("resize", getGridSize);
  return (
    <>
      <img
        className={isMobile ? "home-mobile-banner-img" : "home-banner-img"}
        src={banner}
      />
      <div className={`${CSS["home-container"]}`}>
        <div className={`${CSS["home-contents"]}`}>
          <div className={`${CSS["banner-contents"]}`}>
            <div className={`${CSS["banner-main-text"]}`}>
              제목입니다.제목입니다.
            </div>
            <div className={`${CSS["banner-sub-text"]}`}>
              소제목. 소제목소제목. 소제목,
              <br />
              소제목소제목. 소제목소제목. 소제목. 소제목
            </div>
            <div className="banner-button-container">
              <BannerButton
                buttonStyle={`${CSS["grey-banner-button"]}`}
                text={"이전"}
              />
              <BannerButton
                buttonStyle={`${CSS["blue-gradation-banner-button"]}`}
                text={"다음"}
              />
            </div>
          </div>

          <div className={`${CSS["home-contents-input-container"]}`}>
            <div className={`${CSS["home-search-title"]}`}>상조상품 검색</div>
            <div className="home-contents-input-row">
              <div className={`${CSS["home-contents-input-wrapper"]}`}>
                <input
                  className={`${CSS["home-contents-input"]}`}
                  type="text"
                  placeholder={
                    isMobile ? "상조상품 검색" : "상품의 이름을 검색하세요."
                  }
                />
                <i className="home-input-search-button fas fa-search"></i>
              </div>
              <img
                src={searchFilter}
                className={`${CSS["home-search-filter-img"]}`}
              />
              <img
                src={filterReset}
                className={`${CSS["home-search-filter-img"]}`}
              />
            </div>
          </div>
          
        <Paginate funeralItems={funeralItems} />
        </div>
      </div>
    </>
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

export default Home;
