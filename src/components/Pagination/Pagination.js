import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import $ from "jquery";

import FuneralCard from "../FuneralCard/FuneralCard";
import "./Pagination.css";
import {isMobile} from "../../Materials/logic/MobileMiddleWare";

const desktopCSS = {"funeral-item-grid":"funeral-item-grid"};
const mobileCSS = {"funeral-item-grid":"mobile-funeral-item-grid"};

const CSS = isMobile ? mobileCSS : desktopCSS;

const Paginate = (props) => {
  const [funeralServices, setFuneralServices] = useState();
  const [pageCount, setPageCount] = useState(0);
  const [shownFuneralServices, setShownFuneralServices] = useState();
  const perPage = 12;

// set Home
  const setHomeSize = () => {
    let homeWidth = $(".home-contents").width();
    $(".navbar-container").css("width", homeWidth);
    $(".navbar").css("min-width", 0);
    console.log("홈사이즈 맞추기")
  };

  useEffect(() => {
    if (props.funeralItems && props.funeralItems.Items !== funeralServices) {
      setFuneralServices(props.funeralItems.Items);
      console.log(props.funeralItems);
      setPageCount(props.funeralItems.Items.length / perPage);
    }
  });

  useEffect(() => {
    if (funeralServices) {
      loadShownFuneralServices();
    }
    setHomeSize();
  }, [funeralServices]);

  useEffect(()=>{
    setHomeSize();
  },[shownFuneralServices])


  const loadShownFuneralServices = (index = 0) => {
    const left = index * perPage;
    const right =
      left + perPage < funeralServices.length
        ? left + perPage
        : funeralServices.length;

    if (funeralServices) {
      setShownFuneralServices(funeralServices.slice(left, right));
    }
  };

  const handlePageClick = (e) => {
    console.log(e);
    const index = e.selected;
    loadShownFuneralServices(index);
  };

  if (shownFuneralServices && shownFuneralServices.length > 0) {
    return (
      <div>
        <div className={`${CSS["funeral-item-grid"]}`}>
          {shownFuneralServices.map((item, index) => {
            return <FuneralCard key={item.SK} item={item}/>;
          })}
        </div>
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    );
  } else {
    return <div>no data</div>;
  }
};

export default Paginate;
