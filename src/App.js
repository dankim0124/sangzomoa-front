import "./App.css";
import Navbar from "./components/NavBar/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
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
