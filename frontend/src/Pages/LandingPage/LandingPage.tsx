import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '../Registration/AnimatedBackground';
import Registration from '../Registration/Registration';
import { Image } from 'react-bootstrap';
import './LandingPageStyle.scss';

export default function LandingPage() {

    const navigate = useNavigate();
    const [showRegistration, setShowRegistration] = useState(false);

    return (
        <>
            <div style={{ position: "absolute", zIndex: -1 }}>
                <AnimatedBackground
                    name="ptsCanvasStyle"
                    background="#123"
                    play={true}
                />
            </div>

            {showRegistration ?
                <Registration />
                :
                <div style={{ height: "100vh" }} className="bg">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h1 className="landing-text" style={{ margin: "2%", cursor: "pointer" }} onClick={() => navigate('/landing-page')}>Composition Today</h1>
                        <div style={{ display: "flex", flex: "1 0 0", justifyContent: "flex-end", alignItems: "center" }}>
                            <h1 className="button" onClick={() => setShowRegistration(true)}>Register</h1>
                            <h1 className="landing-text" style={{ margin: "2%", cursor: "pointer" }} onClick={() => setShowRegistration(true)}>Log in</h1>
                        </div>
                    </div>
                    <div className="welcome-banner">
                        <h1 className="landing-text" style={{ marginBottom: "6%" }}>Welcome to Composition Today!</h1>
                        <h2 className="landing-text">A hub for musicians to connect with publishers and with each other</h2>
                    </div>
                </div>
            }
        </>
    )
}
