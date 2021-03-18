import React,{ useEffect,useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import {AuthProvider } from "./lib/authLib";
import Navbar from "./components/NavBar/NavBar";
import Home from "./pages/Home";
import Home2 from "./pages/Home2";
import MyPage from "./pages/MyPage";
import SearchFuneralCompany from "./pages/SearchFuneralCompany";
import ServiceDetail from "./pages/ServiceDetail";
import "./App.css";
import {
  isMobile,
  disableMinimumScreenSize,
} from "./Materials/logic/MobileMiddleWare";


const App = () => {
  useEffect(() => {
    //initialized print "true" if successed;
    try {
      window.Kakao.init("a052162ac274d22d924f4aedc1cb6da4");
    } catch (e) {
      console.log(e);
    }
    console.log("kakao api initialized : ",window.Kakao.isInitialized());
    // mobile setting
    if (isMobile) {
      disableMinimumScreenSize();
    }
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="browser_">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/MyPage" exact component={MyPage}/>
            <Route
              path="/searchFuneralCompany"
              exact
              component={SearchFuneralCompany}
            />
            <Route path="/serviceDetail/:serviceId" exact component={ServiceDetail}/>
            <Route path ="/Home2" exact component={Home2}/> 

          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;

/*
$mobile: 768px;
$desktop: 1300px;
*/
