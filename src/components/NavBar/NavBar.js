import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isMobile } from "../../pages/Home";
import { API } from "aws-amplify";

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
  "navbar-title": "mobile-navbar-title",
};

const desktopCSS = {
  "nav-menu": "nav-menu",
  "menu-icon": "menu-icon",
  "nav-links": "nav-links",
  "navbar-logo": "navbar-logo",
  "nav-links-mobile": "nav-links-mobile",
  "navbar-container": "navbar-container",
  "navbar-title": "navbar-title",
};

let CSS = isMobile ? mobileCSS : desktopCSS;

const NavBar = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const handleClick = () => setClick(!click);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    showButton();
    setHomeSize();
  }, []);

  //함수, 변수 이름 바꿔라
  const setHomeSize = () => {
    let homeWidth = $(".home-contents").width();
    console.log("homeSize Size : ", homeWidth);
    //모바일 불필요 설정 ..... -> 다음 부터 styled component
    $(".navbar-container").css("width", homeWidth);
    $(".navbar").css("min-width", 0);
  };

  //add event listener
  window.addEventListener("resize", setHomeSize);

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
            <Link
              to="/"
              className={`${CSS["nav-links"]}`}
              onClick={closeMobileMenu}
            >
              상조상품 검색
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/"
              className={`${CSS["nav-links"]}`}
              onClick={closeMobileMenu}
            >
              장례식장 검색
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/"
              className={`${CSS["nav-links"]}`}
              onClick={closeMobileMenu}
            >
              장지/화장터 검색
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/"
              className={`${CSS["nav-links"]}`}
              onClick={closeMobileMenu}
            >
              마이페이지
            </Link>
          </li>
          {isMobile ? (
            <li className="nav-item">
              <div className={`${CSS["nav-links"]}`}>
                <KakaoLogin isLogin={isLogin} />
              </div>
            </li>
          ) : null}
        </ul>
        {isMobile ? null : <KakaoLogin isLogin={isLogin} />}
      </div>
    </div>
  );
};

const KakaoLogin = (props) => {
  const handleKaKaoLogin = async () => {
    let kakaoUserInfo;
    window.Kakao.Auth.login({
      success: (authObj) => {
        console.log(authObj);
        console.log("request user info ");
        window.Kakao.API.request({
          url: "/v2/user/me",
          scope: "account_email,gender",
          success: async (response) => {
            kakaoUserInfo = response;
            await API.post("sanzo_backend", "/item/kakao", {
              body: kakaoUserInfo,
            });
            console.log(response);
          },
          fail: (error) => {
            console.log(error);
          },
        });
      },
      fail: (e) => console.log(e),
    });
  };

  if (!props.isLogin ) {
    return (
      <div className="kakao-login-container" onClick={handleKaKaoLogin}>
        <img src={kakao_login_small} className="kakao-login-image" />
      </div>
    );
  } else {
    return null;
  }
};

export default NavBar;
