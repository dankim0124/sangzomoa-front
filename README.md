상조 모아
=============

개요
--------------
현재 상조 서비스, 장례식 예약은 일반 사람들에게 친근하지 않은 주제이고 해당 정보를 모아 볼 수 있는 사이트가 없는 상황입니다. 서울 시내 지역에서 제공 받을 수 있는 상조 서비스를 검색/비교할 수 있게 해주고 유저의 입장에서 장례 절차를 손쉽게 관리/확인 받을 수 있게 하는 반응형 웹 사이트의 제작이 목표입니다.  
서비스 제공 대상:  데스크톱, 업무용 모니터, 모바일 기기.

제공될 기능
-----------------
1) 카카오톡 아이디를 이용한 회원가입/로그인

2) 상조회사 패키지 상품 검색

    - 패키지 상품 검색 필터 조건
        - sorting 기준 - 가격, 제공 지역
        - 검색 체크 박스 : 인력, 리무진, 부고 알림 서비스 등

3)  장례식장 상품 검색/ 검색 조건 → 객실 기준으로 접근. 
    - 지역으로 검색 후 kakao 지도 검색 기능을 따름.

4) 신고하기 .

5) 마이페이지 제공 기능
    - 상조 서비스 체크리스트 :: 상조1, 장례1 까지만 허용 / data corruption 방지.
    - 내가 고른 상조 서비스 확인.

기획 & 프론트 가안
-------------------
주소 :https://www.notion.so/db88b23143354ee5858705816b16e04f


장례식 & 묘지 검색 내용정리
------------------
- 지도 : 카카오 sdk 의 지도를 사용합니다. 오른쪽 지역 검색에 지역 명을 입력하면 지도가 해당 위치로 이동합니다.
(카카오 지도 sdk 의 특성상, 검색창을 지도와 겹치는 것은 불가능 할 수 있습니다.)
- 마커 : 지도에 있는 파란색 화살표 입니다. 대체할 수 있는 이미지 파일을 찾고 있습니다.
- 식장 정보 : 식장 정보, 빈소 이용료, 식사류 가격을 표시 하고 디테일 페이지의 링크를 달아 놓습니다.

참고 할 웹 사이트 주소.
1. 직방 : [https://www.zigbang.com/home/oneroom/map?mkt_source=google_sa_search_pc&keyword=직방&gclid=Cj0KCQiA0rSABhDlARIsAJtjfCcPOezXtSpxIx-AayL4yBG9wR29wALcXeVu_KFLUvbepfmKxcxWtCwaAmIZEALw_wcB](https://www.zigbang.com/home/oneroom/map?mkt_source=google_sa_search_pc&keyword=%EC%A7%81%EB%B0%A9&gclid=Cj0KCQiA0rSABhDlARIsAJtjfCcPOezXtSpxIx-AayL4yBG9wR29wALcXeVu_KFLUvbepfmKxcxWtCwaAmIZEALw_wcB)

(식장 검색 뷰는 직방을 참고하였습니다.)

2. 상조 회사 검색 화면 .
[http://prod.danawa.com/list/?cate=112758](http://prod.danawa.com/list/?cate=112758)
(메인페이지 & 상조 패키지 검색은 다나와-노트북 검색 페이지를 참고 하였습니다.)

기술 스택
-------------
>    1. react , react hooks
>    2. kakao api
>    3. styled component
>    4. css -> navbar, home 에 적용된 것 styled.component 로 수정 예정


TO DO
-----------
>   1. 디자인 문의
>   2. 모바일 작은 화면 글씨 깨지는 것 확인
>   3. css 파일 styled.component로
>   4. 변수명 전체적으로 수정.
>   5. 상조정보는 context에서 관리하게 수정 ... -=> api 호출 지금 너무 많음.