import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isMobile } from "../../pages/Home";

import "./NavBar.css";
import kakao_login_small from "./kakao_login_small.png";
import $ from "jquery";

//styled compoenent 로 바꿔야함...
const mobileCSS = {
  "nav-menu": "mobile-nav-menu",
  "menu-icon": "mobile-menu-icon",
  "nav-links": "mobile-nav-links",
  "navbar-logo": "mobile-navbar-logo",
  "nav-links-mobile": "mobile-nav-links-mobile",
  "bar-icon": "mobile-bar-icon",
  "navbar-container": "mobile-navbar-container",
  "navbar-title":"mobile-navbar-title",
};
const desktopCSS = {
  "nav-menu": "nav-menu",
  "menu-icon": "menu-icon",
  "nav-links": "nav-links",
  "navbar-logo": "navbar-logo",
  "nav-links-mobile": "nav-links-mobile",
  "navbar-container": "navbar-container",
  "navbar-title":"navbar-title"
};

let CSS = isMobile ? mobileCSS : desktopCSS;
console.log("css", CSS);

const NavBar = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const handleClick = () => setClick(!click);

  useEffect(() => {
    showButton();
    getHomeSize();
  }, []);

  //함수, 변수 이름 바꿔라
  const getHomeSize = () => {
    var jbVar = $(".home-contents").width();
    console.log("homeSize Size : ", jbVar);
    //모바일 불필요 설정 ..... -> 다음 부터 styled component
    $(".navbar-container").css("width", jbVar);
    $(".navbar").css("min-width", 0);
  };
  //add event listener
  window.addEventListener("resize", getHomeSize);

  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    console.log("bowser size :", window.innerWidth);
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  window.addEventListener("resize", showButton);

  return (
    <div className="navbar">
      <div className={`${CSS["navbar-container"]}`}>
        <Link to="/" className={`${CSS["navbar-title"]}`}>
          상조모아
        </Link>
        <div className={CSS["menu-icon"]} onClick={handleClick}>
          <i
            className={
              click
                ? "fas fa-times"
                : `fas fa-bars ${isMobile ? CSS["bar-icon"] : ""}`
            }
          />
        </div>
        <ul className={click ? `${CSS["nav-menu"]} active` : CSS["nav-menu"]}>
          <li className="nav-item">
            <Link to="/" className={`${CSS["nav-links"]}`} onClick={closeMobileMenu}>
              상조상품 검색
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className={`${CSS["nav-links"]}`} onClick={closeMobileMenu}>
              장례식장 검색
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className={`${CSS["nav-links"]}`} onClick={closeMobileMenu}>
              장지/화장터 검색
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className={`${CSS["nav-links"]}`} onClick={closeMobileMenu}>
              마이페이지
            </Link>
          </li>
          {isMobile ? (
            <li  className="nav-item">
              <div className={`${CSS["nav-links"]}`}> 
              <KakaoLogin />
              </div>
            </li>
          ) : null}
        </ul>
        {isMobile ? null : <KakaoLogin />}
      </div>
    </div>
  );
};

const KakaoLogin = () => {
  return (
    <div className="kakao-login-container">
      <img src={kakao_login_small} className="kakao-login-image" />
    </div>
  );
};
export default NavBar;
