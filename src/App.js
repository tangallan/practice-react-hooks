import React, {  useState } from 'react';

import Todo from './components/Todo';
import Header from './components/Header';
import Auth from './components/Auth';
import AuthContext from './components/auth-context';

const app  = (props) => {

  const [currentComp, setCurrentComp] = useState('auth');
  const [authStatus, setAuthStatus] = useState(false);

  const swtichPage = (page) => {
    setCurrentComp(page);
  };

  const login = () => {
    setAuthStatus(true);
  }

  return (
      <div className="App">
        <header className="App-header">
          <AuthContext.Provider value={{status: authStatus, login: login}}>
            <Header onLoadTodos={() => swtichPage('todo')} onLoadAuth={() => swtichPage('auth')} />
            <hr />
            {currentComp === 'todo' ? <Todo /> : null}
            {currentComp === 'auth' ? <Auth /> : null}
          </AuthContext.Provider>
        </header>
      </div>
    );
}

export default app;
