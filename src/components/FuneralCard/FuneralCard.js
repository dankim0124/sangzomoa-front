import React, { useEffect, useState } from "react";

import sample from "./sampleImage.jpg";
import "./FuneralCard.css";

const sampleData = {
  name: "프리드 라이프 늘함께",
  price: 360,
  contents: ["리무진", "입관보조", "부고알림", "상복", "장지할인"],
  score: 3.5,
};
export const isMobile = window.screen.width < 770;

const desktopCSS = {
  "funeral-item-grid": "funeral-item-grid",
  "funeral-card-container": "funeral-card-container",
  "funeral-card-image": "funeral-card-image",
  "funeral-card-name": "funeral-card-name",
  "funeral-card-price": "funeral-card-price",
  "funeral-card-socre-view": "funeral-card-socre-view",
  "funeral-show-detail": "funeral-show-detail",
  "funeral-card-funeral-contents": "funeral-card-funeral-contents",
};
const mobileCSS = {
  "funeral-item-grid": "mobile-funeral-item-grid",
  "funeral-card-container": "mobile-funeral-card-container",
  "funeral-card-image": "mobile-funeral-card-image",
  "funeral-card-name": "mobile-funeral-card-name",
  "funeral-card-price": "mobile-funeral-card-price",
  "funeral-card-socre-view": "mobile-funeral-card-socre-view",
  "funeral-show-detail": "mobile-funeral-show-detail",
  "funeral-card-funeral-contents": "mobile-funeral-card-funeral-contents",
};

const CSS = isMobile ? mobileCSS : desktopCSS;

const FuneralCard = ({item}) => {
    return (
      <div className={`${CSS["funeral-card-container"]}`}>
        <div className="funeral-card-upper-box">
          <img src={sample} className={`${CSS["funeral-card-image"]}`} />
          <div className="column_">
            <div className={`${CSS["funeral-card-name"]}`}>
              {item.company_name} {item.product_name}
            </div>
            <div className={`${CSS["funeral-card-price"]}`}>
              가격: {item.price} 만원
            </div>
            <ScoreView score={3.8} />
            <a
              href={item.product_url}
              className={`${CSS["funeral-show-detail"]}`}
            >
              자세히 보기
            </a>
          </div>
        </div>
        <FuneralContents contents={sampleData.contents} />
      </div>
    );
  
};

const FuneralContents = ({ contents }) => {
  const renderFuneralContents = (contents) => {
    let result = "";
    let i = 0;
    for (const funeralContent of contents) {
      result += "#" + funeralContent + " ";
      if (i != 0 && i % 3 == 0) {
        result += "\n";
      }
    }
    return result;
  };
  if (contents) {
    return (
      <div className={`${CSS["funeral-card-funeral-contents"]}`}>
        {renderFuneralContents(contents)}
      </div>
    );
  }
};

const ScoreView = ({ score }) => {
  const renderHeart = (score) => {
    let i = 0;
    score = Math.round(score);
    const result = [];
    for (i; i < score; i++) {
      result.push(<i className="fas fa-heart score-heart-icon" key={i}></i>);
      result.push(" ");
    }
    for (i; i < 5; i++) {
      result.push(<i className="far fa-heart score-heart-icon" key={i}></i>);
      result.push(" ");
    }
    return result;
  };
  return (
    <div className={`${CSS["funeral-card-socre-view"]}`}>
      평점: {renderHeart(score)}
    </div>
  );
};

export default FuneralCard;
