import WindowTemplate from "../components/WindowTemplate/WindowTemplate.jsx";
import Background from "../components/Background/BackgroundImage.jsx";
import Header from "../components/header/header.jsx";
import Users from "../components/Users/users.jsx";
import  { useState } from 'react';

function HomePage(){

    return (
        <Background>
            <div className="d-flex flex-column vh-100">
                <Header/>
                <WindowTemplate Maincontent={<Users/>}/>
            </div>
        </Background>
    );
}

export default HomePage;