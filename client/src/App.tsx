import './App.css';
import Navigation from "./components/Navigation";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import About from './components/About';
import Services from './components/Services';
import Home from './components/Home';
import FirstDropdown from "./components/firstDropdown";
import { ReactElement } from 'react';
import ServiceCard from './components/ServiceCard';
import Service from './Service';

var tags: string[] = ["a", "b", "c"];
var arr: string[] = ["a", "b", "c"];

let serv = new Service("a", "b", "c", "d", "e", "f", arr, true, "g", arr, false, arr, "h", "i");


function App(): ReactElement {
  return (
    <div>
    <div>
      {/* for navbar */}
      <Router>
        <Navigation />
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/about' component={About}/>
          <Route exact path='/services' component={Services} />
        </Switch>
      </Router>
      {/* end navbar */} 
      </div>
        <ServiceCard service={serv}></ServiceCard>
  </div>
  );
}

export default App;
