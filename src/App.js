import './App.css';
import './assets/styles/style.css';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Home from "./components/Home/Home"
import FormulaireRestaurant from "./components/FormulaireRestaurant/FormulaireRestaurant"
import FormulaireFiltre from './components/FormulaireFiltre/FormulaireFiltre';
import Connexion from './components/Connexion/Connexion';
import Programmes from './components/Programmes/Programmes';
import Statistiques from './components/Statistiques/Statistiques';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/connexion" component={Connexion} />
        <Route path="/programmes" component={Programmes} />
        <Route path="/statistiques" component={Statistiques} />
        <Route path="/FormulaireRestaurant" component={FormulaireRestaurant} />
        <Route path="/FormulaireFiltre" component={FormulaireFiltre} />
        <Route path="/" component={Home} />
      </Switch>
  </BrowserRouter>
  );
}

export default App;
