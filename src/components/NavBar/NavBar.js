import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API } from "aws-amplify";
import styled from "styled-components";

import {preventScroll, allowScroll} from "../../Materials/logic/preventScroll";
import "./NavBar.css";
import kakao_login_small from "./kakao_login_small.png";
import $ from "jquery";
import { isMobile } from "../../Materials/logic/MobileMiddleWare";
import {
  dispatchLogin,
  dispatchLogOut,
  useAuthDispatch,
  useAuthState,
} from "../../lib/authLib";

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

//props : [divider = true/false ]
const NavBar = (props) => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const handleClick = () => setClick(!click);

  const dispatch = useAuthDispatch();
  const loginContext = useAuthState();

  useEffect(() => {
    showButton();
    setHomeSize();
  }, []);

  useEffect(()=>{
    if(click){
      console.log("prevnet Scroll")
      preventScroll();
    }else{
      console.log("allow Scroll")
      allowScroll();
    }
  },[click])

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

  const handleKakaoLogout = () => {
    if (!window.Kakao.Auth.getAccessToken()) {
      console.log("Not logged in.");
      return;
    }
    window.Kakao.Auth.logout(() => {
      console.log("expired : ", window.Kakao.Auth.getAccessToken());
      dispatchLogOut(dispatch);
    });
  };

  window.addEventListener("resize", showButton);

  return (
    <>
      <div className="navbar">
        <div className={`${CSS["navbar-container"]}`}>
          <Link to="/" className={`${CSS["navbar-title"]}`}>
            상조모아
          </Link>
          <div className={CSS["menu-icon"]} onClick={handleClick}>
            <i
              className={
                click ? "" : `fas fa-bars ${isMobile ? CSS["bar-icon"] : ""}`
              }
            />
          </div>
          <ul className={click ? `${CSS["nav-menu"]} active` : CSS["nav-menu"]}>
            {click ? (
              <CloseIconContainer className="nav-item" onClick={handleClick}>
                <CloseMobileMenuIcon className="fas fa-arrow-left " />
              </CloseIconContainer>
            ) : null}

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
                to="/searchFuneralCompany"
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
            {loginContext.user ? (
              <li className="nav-item">
                <div
                  className={`${CSS["nav-links"]}`}
                  onClick={handleKakaoLogout}
                >
                  로그아웃
                </div>
              </li>
            ) : null}

            {isMobile && !loginContext.user ? (
              <li className="nav-item">
                <div className={`${CSS["nav-links"]}`}>
                  <KakaoLogin />
                </div>
              </li>
            ) : null}
          </ul>
          {isMobile && !loginContext.user ? null : <KakaoLogin />}
        </div>
      </div>
    </>
  );
};

const KakaoLogin = (props) => {
  const dispatch = useAuthDispatch();
  const loginContext = useAuthState();

  useEffect(() => {
    console.dir(loginContext);
  });

  const handleKaKaoLogin = () => {
    window.Kakao.Auth.login({
      scope: "account_email",
      success: (authObj) => {
        console.log(authObj);
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: (response) => {
            dispatchLogin(dispatch, {
              user: response.kakao_account.email,
              token: authObj.access_token,
            });
            console.log("login REsponse",response)
            API.post("sanzo_backend","/kakaoLogin",{
            body: {
              email:response.kakao_account.email,
              id:response.id
            }}
            )
            alert("카카오톡 계정으로 로그인 되었습니다.");
          },
          fail: (e) => {
            console.log(e);
          },
        });
      },
      fail: (e) => console.log(e),
    });
  };

  if (!loginContext.user) {
    return (
      <div className="kakao-login-container" onClick={handleKaKaoLogin}>
        <img src={kakao_login_small} className="kakao-login-image" />
      </div>
    );
  } else {
    return null;
  }
};

const CloseMobileMenuIcon = styled.i`
  padding: 15px;
  font-size: X-large;
  color: white;
`;
const CloseIconContainer = styled.li`
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: flex-end;
`;

export default NavBar;
