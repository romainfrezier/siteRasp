import './App.css';
import './assets/styles/style.css';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Programmes from './components/Programmes/Programmes';
import Statistiques from './components/Statistiques/Statistiques';
import FormulaireProgramme from './components/FormulaireProgramme/FormulaireProgramme';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/programmes" component={Programmes} />
        <Route path="/statistiques" component={Statistiques} />
        <Route path="/FormulaireProgramme" component={FormulaireProgramme} />
        <Route path="/" component={Programmes} />
      </Switch>
  </BrowserRouter>
  );
}

export default App;
