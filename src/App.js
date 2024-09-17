import React from 'react';
import GatherPosts from './features/gatherPosts/GatherPosts';
import Header from './components/header/header';
import './App.css';
import GatherSubreddits from './features/subreddits/subreddits';

function App(props) {

  const {dispatch, state} = props;

  return (
    <div className="App">
      <header className="App-header">
        <Header searchbar={state.searchbar}/>
      </header>
      <body className='body'>
        <GatherSubreddits/>
        <GatherPosts />
      </body>
    </div>
  );
}

export default App;
