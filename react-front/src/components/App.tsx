import React from 'react';
import console from '../config/logger';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../scss/stiles.scss';
import '../scss/App.scss';
import  Header  from './layout/Header';
import Footer from './layout/Footer';
import AssetsList from './assetResources/AssetsList';
import Navbar from './navbar/Navbar';
import config from '../config/config';
import Form from '../components/utils/Form';
import SoftwareList from './assetSoftware/SoftwareList';
import AssetDetails from './assetResources/AssetDetails';


function App() {
    console.info(config)
    // hacer llamada de loggion oauth para rellenar back
    //loggin();
  return (
    <>
    <header>
        <Header />
    </header>
        <div className="container">
            <BrowserRouter>
                <Navbar/>
                <div className="container p-4">
                    <Switch>
                        <Route exact path="/detail/:id/:key" component={AssetDetails} />
                        <Route exact path="/list" component={AssetsList} />
                        <Route exact path="/integrations" component={Form} />
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
     <footer> 
        <Footer />
     </footer>
    </>
  );
}

export default App;
