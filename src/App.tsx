import React, { useEffect, useState } from 'react';
import Authenticate from './components/authenticate/Authenticate';
import Generate from './components/generate/Generate';

type Route = 'SIGNIN' | 'SIGNUP';

function App() {
  const [showingComponent, setShowingComponent] = useState<any>();

  const goBack = () => {
    setShowingComponent(undefined);
  }
  const goTo = (route:Route) => {
    switch(route) {
      case 'SIGNIN': setShowingComponent(<Authenticate goBack={goBack}></Authenticate>);
        break;
      case 'SIGNUP': setShowingComponent(<Generate goBack={goBack}></Generate>);
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

  useEffect(() => {},[])

  return (
    <div className="App container flex-column justify-content-center py-2" onContextMenu={handleOnContextMenu}>
      <div className='col-lg-6 col-md-8 col-sm-10 mx-auto mt-5'>
        <h1 className="col fw-bold text-center mb-2 text-primary">
          NEXTODON
        </h1>
        {showingComponent}
        {
          showingComponent === undefined
          ?
          <div className='row gap-2 pt-5 px-1 m-auto justify-content-center'>
            <button 
              id="signin"
              className='col-auto btn btn-secondary'
              onClick={()=> goTo('SIGNIN')}
            >Already a member?</button>
            <button 
              id="signup"
              className='col-auto btn btn-secondary'
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
