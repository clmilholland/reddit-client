import React from 'react';
import GatherPosts from './features/gatherPosts/GatherPosts';
import Header from './components/header/header';
import './App.css';
import SideNav from './components/sideNav/sideNav';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <body className='body'>
        <SideNav />
        <GatherPosts />
      </body>
    </div>
  );
}

export default App;
