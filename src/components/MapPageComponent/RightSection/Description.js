import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import styled from "styled-components";

import Text from "../../../Materials/Text";
import { isMobile } from "../../../Materials/logic/MobileMiddleWare";
import ServiceTable from "./ServiceTable";
import Space from "../../../Materials/Space";

const middlePoint = <span>&#183;</span>;
const emptySpace = <span>&#160;</span>;

const DescriptionSection = ({ clickedCompany }) => {
  const [rentalFees, setRentalFees] = useState();
  const [foodPrice, setFoodPrice] = useState();

  useEffect(() => {
    if (clickedCompany) {
      loadCompanyServices(clickedCompany);
    }
  }, [clickedCompany]);

  const loadCompanyServices = async (clickedCompany) => {
    // load data adn split -> rental and food.
    const loadedServices = await API.post(
      "sanzo_backend",
      "/querySKBeginsWith",
      {
        body: {
          PK: "funeralItem",
          SK: clickedCompany["시설명"] + "_",
        },
      }
    );
    console.log(loadedServices);

    const rentals = loadedServices.Items.filter(
      (item) => item["항목"] === "시설임대료"
    );
    const food = loadedServices.Items.filter((item) => item["항목"] === "식사");

    // sort by price.
    rentals.sort((left, right) => {
      return (
        parseInt(right["금액"].replace(/,/g, "")) -
        parseInt(left["금액"].replace(/,/g, ""))
      );
    });

    food.sort((left, right) => {
      return (
        parseInt(right["금액"].replace(/,/g, "")) -
        parseInt(left["금액"].replace(/,/g, ""))
      );
    });

    setRentalFees(rentals);
    setFoodPrice(food);
  };

  const renderScoreIcon = (score) => {
    const result = [];
    let i = 0;
    for (i; i < score; i++) {
      result.push(<Heart className="fas fa-heart score-heart-icon" key={i} />);
      result.push(emptySpace);
    }
    for (i; i < 5; i++) {
      result.push(<Heart className="far fa-heart score-heart-icon" key={i} />);
      result.push(emptySpace);
    }
    return result;
  };

  if (clickedCompany) {
    return (
      <Container>
        <DescriptionHead>
          <Text size={"title"}>{clickedCompany["시설명"]}</Text>
          <>
            <Text size={"small"} color={"grey"}>
              상세보기{middlePoint}홈페이지
            </Text>
          </>
        </DescriptionHead>

        <ScoreSection>
          <Row>
            <Text size="small" color="skyBlue">
              {"4.0"}
              {emptySpace}
            </Text>{" "}
            {renderScoreIcon(4)}
          </Row>
        </ScoreSection>

        <InfoSection>
          <InfoRow
            leftText={"주소"}
            rightText={clickedCompany["주소"]}
            leftWidth={"50px"}
          />
          <InfoRow
            leftText={"전화번호"}
            rightText={clickedCompany["전화번호"]}
          />
          <InfoRow
            leftText={"주차 가능 대수"}
            rightText={clickedCompany["주차가능대수"]}
          />
        </InfoSection>

        <ServiceTable data={rentalFees} title={"빈소이용료"} />
        <ServiceTable data={foodPrice} title={"식사"} />
        {isMobile ? <Space size={"40px"} /> : null}
      </Container>
    );
  } else {
    return (
      <Text color={"grey"} style={{ marginTop: "30px", marginLeft: "30px" }}>
        마커를 클릭해 식장 정보를 확인할 수 있습니다.
      </Text>
    );
  }
};

const InfoRow = ({ leftText, rightText, leftWidth }) => {
  return (
    <Row>
      <Text
        size="normal"
        fontWeight="bold"
        lineHeight="1.5"
        style={{ width: leftWidth }}
      >
        {leftText} :{" "}
      </Text>
      <Text size="normal" lineHeight={1.5}>
        {rightText}
      </Text>
    </Row>
  );
};

const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  margin-top: ${isMobile ? "35px" : "49px"};
`;

const DescriptionHead = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const Heart = styled.i`
  font-size: 14px;
  color: #5e96b9;
`;

const ScoreSection = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: ${isMobile ? "10px" : "14px"};
  align-items: center;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin-top: ${isMobile ? "25px" : "40px"};
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export default DescriptionSection;
