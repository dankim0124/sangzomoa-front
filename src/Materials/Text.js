import styled from "styled-components";
import React from "react";

const textColor = {
  black: "#171717",
  grey: "#717171",
  skyBlue: "#5e96b9",
};

const textSize = {
  subTitle: "19px",
  title: "21px",
  normal: "16px",
  small: "14px",
  tiny: "12px",
};

const Text = styled.span`
  font-family: NotoSanskr-R;
  color: ${(props) =>
    textColor.hasOwnProperty(props.color)
      ? textColor[props.color]
      : textColor["black"]};
  font-size: ${(props) =>
    props.size
      ? textSize.hasOwnProperty(props.size)
        ? textSize[props.size]
        : props.size
      : textSize["normal"]};
  line-height: ${(props) => (props.lineHeight ? props.lineHeight : 1)};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "normal")};
    
  `;

export default Text;
