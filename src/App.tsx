import React, { useEffect, useState } from 'react';
import Authenticate from './components/authenticate/Authenticate';
import Generate from './components/generate/Generate';

type Route = 'SIGNIN' | 'SIGNUP';

function App() {
  const [showingComponent, setShowingComponent] = useState<Route>('SIGNIN');

  /**
   * Prevents right click
   * @param event 
   */
  const handleOnContextMenu = (event: any) => {
    event.preventDefault();
  };

  useEffect(() => {},[])

  return (
    <div className="App container flex-column justify-content-center py-2" onContextMenu={handleOnContextMenu}>
      <div className='col-lg-6 col-md-8 col-sm-10 mx-auto mt-5'>
        <div className='d-flex justify-content-center'>
          <img className="p-1 align-self-center mb-2" alt="logo" width="40" height="40" src={require('./assets/media/logo-48.png')}/> 
          <h1 className="p-2 align-self-center fw-bold text-center mb-2" style={{color:'#5b46db'}}>
            Nextodon
          </h1>
        </div>
        {
          showingComponent === 'SIGNIN' ?  <Authenticate goTo={setShowingComponent} ></Authenticate> : ''
        }
        {
          showingComponent === 'SIGNUP' ?  <Generate goTo={setShowingComponent}></Generate> : ''
        }        
      </div>
    </div>
  );
}

export default App;
