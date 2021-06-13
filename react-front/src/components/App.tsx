import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import  Header  from './layout/Header';
import Footer from './layout/Footer';
import AssetsList from './assetResources/AssetsList';
import Navbar from './navbar/Navbar';
import config from '../config/config';
import Form from '../components/utils/Form';
import SoftwareList from './assetSoftware/SoftwareList';


function App() {
    console.log(config)
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
                        <Route exact path="/detail/:id" component={SoftwareList} />
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
