import React, { useEffect, useState } from 'react';
import './App.scss';
import Authenticate from './components/authenticate/Authenticate';
import Generate from './components/generate/Generate';

type Route = 'SIGNIN' | 'SIGNUP';

function App() {
  const [showingComponent, setShowingComponent] = useState<any>();
  const [currentRoute, setCurrentRoute] = useState<Route>();

  const goBack = () => {
    setShowingComponent(undefined);
  }
  const goTo = (route:Route) => {
    setCurrentRoute(route);

    switch(route) {
      case 'SIGNIN': setShowingComponent(<Authenticate goBack={goBack} ></Authenticate>);
        break;
      case 'SIGNUP': setShowingComponent(<Generate></Generate>);
        break;
      default: break;
    }
  }
  /**
   * Prevents right click
   * @param event 
   */
  const handleOnContextMenu = (event: any) => {
    event.preventDefault();
  };

  useEffect(() => {
    console.log(showingComponent)
  },[])

  return (
    <div className="App container h-100 w-100 d-flex flex-column justify-content-center py-5" onContextMenu={handleOnContextMenu}>
      <div className='col-lg-6 col-md-8 col-sm-10 mx-auto'>
        <h1 className="col font-weight-bold text-center mb-5 text-primary">
          NEXTODON
        </h1>
        {showingComponent}
        {
          showingComponent === undefined
          ?
          <div className='row gap-2 p-1'>
            <button 
              id="signin"
              className='col btn btn-secondary'
              onClick={()=> goTo('SIGNIN')}
            >Already a member?</button>
            <button 
              id="signup"
              className='col btn btn-secondary'
              onClick={()=> goTo('SIGNUP')}
            >Become a member</button>
          </div>
          :
          ''
        }
      </div>
    </div>
  );
}

export default App;
