import React from 'react';
import GatherPosts from './features/gatherPosts/GatherPosts';
import './App.css';
import PostComments from './components/comments/comments';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Root from './components/root';
import Post from './components/post/post';

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
  );
}

export default App;
