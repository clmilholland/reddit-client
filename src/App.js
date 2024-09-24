import React from 'react';
import GatherPosts from './features/gatherPosts/GatherPosts';
import Header from './components/header/header';
import './App.css';
import SideNav from './components/sideNav/sideNav';
import PostComments from './components/comments/comments';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Root from './components/root';
import Post from './components/post/post';
import GatherHeader from './features/gatherSubredditHeader/gatherSubredditHeader';

const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={ <Root/> }>
      <Route index element={<GatherPosts/>}/>
      <Route path='/home' element={<GatherPosts/>} />
      <Route element={<Post/>}/>
      <Route path='/comments' element={ <PostComments/> } />
    </Route>
))

function App() {

  return (
    
    <RouterProvider router={ router }/>
    /* <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <body className='body'>
        <SideNav />
        <GatherPosts />
        <PostComments/>
      </body>
    </div> */
    
  );
}

export default App;
