import React from 'react';
import RouterView from './router';

function App() {
  return (
    <div>
      <RouterView />
      <hr />
      <footer>
        <span>&copy; {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}

export default App;
