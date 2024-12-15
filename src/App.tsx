
import React from 'react';
import Admin from "./section";
import Home from './section/Home/Home';
import TableConsumption from './section/TableConsumption/TableConsumption';
import Consumption from "./section/Consumption/Consumption";
import { init, createDatabase } from './server';

// hook
import ContextDB from './hook/ContextDB';

// routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  const [db, setDb] = React.useState<any>(null);

  React.useEffect(() => {
    if (db === null) {
      const openRequest = init();
      openRequest.onupgradeneeded = function () {
        createDatabase(openRequest);
      };
      openRequest.onerror = function () {
        console.error("Error", openRequest.error);
      };
      openRequest.onsuccess = function () {
        setDb(openRequest.result);
      };
    }
  }, [db])

  return (
    <ContextDB.Provider value={db}>
      <Router basename='/'>
        <Routes >
          <Route path='/*' element={(
            <Admin>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/consumo" element={<Consumption />} />
                <Route path="/tablaconsumo" element={<TableConsumption />} />
              </Routes>
            </Admin>
          )}>
          </Route>
        </Routes >
      </Router >
    </ContextDB.Provider>
  )
}

export default App
