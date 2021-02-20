import React, { useState } from "react";

import sample from "./sampleImage.jpg";
import "./FuneralCard.css";
const sampleData = {
  name: "프리드 라이프 늘함께",
  price: 360,
  contents: ["리무진", "입관보조", "부고알림", "상복", "장지할인"],
  score: 3.5,
};

const FuneralCard = () => {
  const funeralItem = sampleData;
  return (
    <div className="funeral-card-container">
      <img src={sample} className="funerral-card-image" />
      <div className="funeral-card-descriptions">
        <div className="funeral-card-name">{funeralItem.name}</div>
        <div className="funeral-card-price">가격: {funeralItem.price}</div>
        <FuneralContents contents={funeralItem.contents} />
        <ScoreView score={funeralItem.score} />
      </div>
    </div>
  );
};

const FuneralContents = ({ contents }) => {
  const renderFuneralContents = (contents) => {
    let result = "";
    let i = 0;
    for (const funeralContent of contents) {
      result += "#" + funeralContent + " ";
      if (i != 0 && i % 2 == 0) {
        result += "\n";
      }
    }
    return result;
  };
  if (contents) {
    return (
      <div className="funeral-card-funeral-contents">
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
      result.push(<i className="fas fa-heart" key={i}></i>);
    }
    for (i; i < 5; i++) {
      result.push(<i className="far fa-heart" key={i}></i>);
    }
    return result;
  };
  return (
    <div className="funeral-card-socre-view">평점: {renderHeart(score)}</div>
  );
};

export default FuneralCard;
