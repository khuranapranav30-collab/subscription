import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useState } from 'react'

import NavBar from './NavBar.jsx'
import Banner from './Banner.jsx'
import Profile from './Profile.jsx'
import Gallery from './Gallery.jsx'
import Articles from './Articles.jsx'
import Tutorials from './Tutorials.jsx'
import Footer from './Footer.jsx'
import Login from './Login.jsx'
import SignUp from './SignUp.jsx'
import Post from './Post.jsx'
import Subscribe from './Subscribe.jsx'
import Pricing from './Pricing.jsx'

function App() {

    const [login, setLogin] = useState({
        email: "",
        password: ""
    })

    const [signup, setSignup] = useState({
        name: "",
        email: "",
        password: "",
        Cpassword: ""
    })

    const [postType, setPostType] = useState("Question")

    const handleChange1 = (e) => {
        setLogin({...login, [e.target.name]: e.target.value })
    }

    const handleChange2 = (e) => {
        setSignup({...signup, [e.target.name]: e.target.value })
    }

    const handleChange3 = (e) => {
    setPostType(e.target.value )
    }

    const resetLogin = () => {
        setLogin({ email: "", password: "" })
    }

    const resetSignup = () => {
        setSignup({
            name: "",
            email: "",
            password: "",
            Cpassword: ""
        })
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: <>
                <NavBar />
                <Banner />
                <Profile />
                <Gallery />
                <Articles />
                <Tutorials />
                <Subscribe />
                <Footer />
            </>
        },
        {
            path: "/login",
            element: <>
                <NavBar />
                <Login
                    login={login}
                    handleChange1={handleChange1}
                    resetLogin={resetLogin}
                />
            </>
        },
        {
            path: "/signup",
            element: <>
                <NavBar />
                <SignUp
                    signup={signup}
                    handleChange2={handleChange2}
                    resetSignup={resetSignup}
                />
            </>
        },
        {
            path: "/post",
            element: <>
                <NavBar />
                <Post
                    postType={postType}
                    handleChange3={handleChange3}
                />
            </>
        },
        {
            path: "/pricing",
            element: <>
                <NavBar />
                <Pricing />
            </>
        }
    ])

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App