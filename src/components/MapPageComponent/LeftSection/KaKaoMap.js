/*global kakao*/

export const kakakoMapUrl =
  "//dapi.kakao.com/v2/maps/sdk.js?appkey=a052162ac274d22d924f4aedc1cb6da4&autoload=false&libraries=services";

const toLongAddr = {
  충남: "충청남도",
  경북: "경상북도",
  전북: "전라북도",
  경남: "경상남도",
};
export const importKakaoMapAPI = async (
  elementClassName,
  kakaoRef,
  setCenterAddr,
  centerAddr
) => {
  const script = document.createElement("script");
  script.async = true;
  script.src = kakakoMapUrl;
  document.head.appendChild(script);

  try {
    script.onload = () => {
      kakao.maps.load(() => {
        let container = document.getElementById(elementClassName);
        let options = {
          center: new kakao.maps.LatLng(37.506, 127.05),
          level: 7,
        };
        const map = new window.kakao.maps.Map(container, options);
        const zoomControl = new kakao.maps.ZoomControl();
        var geocoder = new kakao.maps.services.Geocoder();

        map.addControl(zoomControl, kakao.maps.ControlPosition.TOPRIGHT);

        kakaoRef.current = { map, zoomControl, geocoder };
        loadCompanyByCenter(map,geocoder,centerAddr,setCenterAddr)

        // dragged evnet;
        kakao.maps.event.addListener(map, "dragend", async () => {
          loadCompanyByCenter(map, geocoder, centerAddr, setCenterAddr);
        });
      });
    };
  } catch (e) {
    console.log(e);
    console.log("fail load map");
  }
};

export const loadCompanyByCenter = (
  map,
  geocoder,
  centerAddr,
  setCenterAddr
) => {
  const latlng = map.getCenter();
  geocoder.coord2Address(latlng.getLng(), latlng.getLat(), (result, status) => {
    if (status === kakao.maps.services.Status.OK) {
      let currentCenter = result[0].address.region_1depth_name;
      if (currentCenter in toLongAddr) {
        currentCenter = toLongAddr[currentCenter];
      }
      console.log(currentCenter);
      if (!centerAddr) {
        setCenterAddr(currentCenter);
      } else if (centerAddr != currentCenter) {
        setCenterAddr(currentCenter);
      }
    }
  });
};

export const markPoint = (map, geocoder, data, handleMarkerClicked) => {
  console.log("MARK DATA HERE");
  console.log(typeof data);
  console.dir(data);
  if (!geocoder) {
    return;
  }
  for (const item of data) {
    geocoder.addressSearch(item["주소"], (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        const marker = new kakao.maps.Marker({
          map: map,
          position: coords,
        });
        marker.setMap(map);
        kakao.maps.event.addListener(marker, "click", () => {
          handleMarkerClicked(item);
        });
      }
    });
  }
};

/*
export const moveToAdress = (loc, kakaoContoller) => {
  console.log(loc);
  if (!loc) {
    return;
  }
  const { map, geocoder } = kakaoContoller;
  geocoder.addressSearch(loc, function (result, status) {
    // 정상적으로 검색이 완료됐으면
    if (status === kakao.maps.services.Status.OK) {
      console.log("succeess");
      var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
      map.current.setCenter(coords);
    } else {
      alert("주소검색에 실패했습니다. 올바른 주소를 입력해주세요.");
    }
  });
};

*/
