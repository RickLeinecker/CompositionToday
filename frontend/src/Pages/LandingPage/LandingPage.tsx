import React from 'react'
import { useNavigate } from 'react-router-dom';
import './LandingPageStyle.scss';

export default function LandingPage() {

    const navigate = useNavigate();

    return (
        <>
            <div style={{ height: "100vh" }} className="bg">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h1 className="landing-text" style={{ margin: "2%" }}>Composition Today</h1>
                    <div style={{ display: "flex", flex: "1 0 0", justifyContent: "flex-end", alignItems: "center" }}>
                        <h1 className="button" onClick={() => navigate('/registration')}>Register</h1>
                        <h1 className="landing-text" style={{ margin: "2%", cursor: "pointer" }} onClick={() => navigate('/registration')}>Log in</h1>
                    </div>
                </div>
                <div style={{ position: "absolute", marginLeft: "2%", marginTop: "26%", width: "25%" }}>
                    <h1 className="landing-text" style={{ marginBottom: "6%" }}>Welcome to Composition Today!</h1>
                    <h2 className="landing-text">A hub for musicians to connect with publishers and with each other</h2>
                </div>

            </div>
        </>
    )
}
