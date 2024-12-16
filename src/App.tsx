
import React from 'react';
import Admin from "./section";
import Home from './section/Home/Home';
import TableConsumption from './section/TableConsumption/TableConsumption';
import Consumption from "./section/Consumption/Consumption";
import NotFound from './components/NotFound';

import Interceptor from './components/Interceptor';
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
            <Interceptor>
              <Routes>
                <Route path='/energy/*' element={(
                  <Admin>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/consumo" element={<Consumption />} />
                      <Route path="/tablaconsumo" element={<TableConsumption />} />
                      <Route path="/*" element={<NotFound />} />
                    </Routes>
                  </Admin>
                )}>
                </Route>
                <Route path="/*" element={<NotFound />} />
              </Routes >
            </Interceptor>
          )}>
          </Route>
        </Routes>
      </Router >
    </ContextDB.Provider >
  )
}

export default App
