import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import FuneralCard2 from "../../FuneralCard/FuneralCard2";

import "./Pagination.css";

export const isMobile = window.screen.width < 770;

const desktopCSS = {"funeral-item-grid":"funeral-item-grid"};
const mobileCSS = {"funeral-item-grid":"mobile-funeral-item-grid"};

const CSS = isMobile ? mobileCSS : desktopCSS;

const Paginate = (props) => {
  const [funeralServices, setFuneralServices] = useState();
  const [pageCount, setPageCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [shownFuneralServices, setShownFuneralServices] = useState();
  const perPage = 5;

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
  }, [funeralServices]);

  useEffect(() => {
    //    console.log("eveyr/ shown", shownFuneralServices);
  });

  const loadShownFuneralServices = (index = 0) => {
    const left = index * perPage;
    const right =
      left + perPage < funeralServices.length
        ? left + perPage
        : funeralServices.length;

    console.log("left&right: ", left, right);
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
            return <FuneralCard2 key={item.SK} />;
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
