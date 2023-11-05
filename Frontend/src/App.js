import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import './App.css';
import Root from './Root';
import { UserContextProvider } from './components/Context/UserContext';
import { PageNotFound } from './components/404/PageNotFound';
const Home = lazy(() => import('./components/Home/Home'))
const Signup = lazy(() => import('./components/Login-Signup/Signup'))
const Login = lazy(() => import('./components/Login-Signup/Login'))
const CreatePost = lazy(() => import('./components/CreatePost/CreatePost'))
const PostPage = lazy(() => import('./components/Post/PostPage'))
const UserProfile = lazy(() => import('./components/UserProfile/UserProfile'))
const UserPostList = lazy(() => import('./components/Post/UserPostList'))
const EditPost = lazy(() => import('./components/CreatePost/EditPost'))


function App() {
  return (
    <UserContextProvider>
        <Routes>
            <Route path='/' element={<Root />}>
                <Route index element={<Suspense> <Home/> </Suspense>}/>
                <Route path='signup' element={<Suspense> <Signup/> </Suspense>}/>
                <Route path='login' element={<Suspense> <Login/> </Suspense>}/>
                <Route path='create-post' element={<Suspense> <CreatePost/> </Suspense>}/>
                <Route path='post/:id' element={<Suspense> <PostPage/> </Suspense>}/>
                <Route path='user/:id' element={<Suspense> <UserProfile/> </Suspense>}/>
                <Route path='user/post/:id' element={<Suspense> <UserPostList/> </Suspense>}/>
                <Route path='edit-post/:id' element={<Suspense> <EditPost/> </Suspense>}/>
                <Route path='*' element={<Suspense> <PageNotFound/> </Suspense>}/>
            </Route>
        </Routes>
   </UserContextProvider>
  );
}

export default App;
