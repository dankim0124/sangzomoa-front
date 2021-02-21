import React from "react";

import "./Footer.css";

export const isMobile = window.screen.width < 770;
const desktopCSS = {
  "footer-bottom-container":"footer-bottom-container",
  "footer-bottom-title":"footer-bottom-title"
};

const mobileCSS = {
  "footer-bottom-container":"mobile-footer-bottom-container",
  "footer-bottom-title":"mobile-footer-bottom-title"

};

const CSS = isMobile ? mobileCSS : desktopCSS;

const Footer = () => {
  return (
    <div className="footer">
      <Divider />
      <FooterUpper />
      <Divider />
      <FooterBottom />
    </div>
  );
};

const Divider = () => {
  return <div className="footer-divider" />;
};

const FooterUpper = () => {
  return (
    <div className="footer-upper">
      <div className="footer-upper-content" />
      <div className="footer-upper-content">회사 소개</div>
      <div className="footer-upper-content">서비스 이용약관</div>
      <div className="footer-upper-content">개인정보 처리방침</div>
      <div className="footer-upper-content" />
    </div>
  );
};
const FooterBottom = () => {
  const renderFooterLabel = (label) => {
    return <span className="footer-label">{label}</span>;
  };
  return (
    <div className={`${CSS["footer-bottom-container"]}`}>
      <div className= {`${CSS["footer-bottom-title"]}`}>상조모아</div>
      <div className="footer-bottom-descriptions">
        <div className="footer-bottom-text ">
          {renderFooterLabel("이메일: ")} dannkim0124@gmail.com
        </div>
        <div className="footer-bottom-text ">
          {renderFooterLabel("문의: ")}잘못된 정보/문의 사항은 위의 이메일로
          보내주시기 바랍니다.
        </div>
      </div>
    </div>
  );
};

export default Footer;
