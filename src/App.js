import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/NavBar/NavBar";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";
import "./App.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {    
    //initialized print "true" if successed;
    try{
      window.Kakao.init("a052162ac274d22d924f4aedc1cb6da4");
    }catch(e){
      console.log(e);
    }

    console.log(window.Kakao.isInitialized());
    console.log(window.Kakao)
  }, []);

  return (
    <>
      <Router>
        <Navbar />
        <div className="browser_">
          <Switch>
            <Route path="/" exact component={Home} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;

/*
$mobile: 768px;
$desktop: 1300px;
*/
