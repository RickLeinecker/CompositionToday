import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PageRouter from "./PageRouter";
import { ToastContainer } from 'react-toastify';
import { Steps } from 'intro.js-react';
import { tourSteps } from "./TourSteps";
import { realisticConfetti } from "./confetti";
import 'intro.js/introjs.css';

function App(this: any) {
    const [stepsEnabled, setStepsEnabled] = useState<boolean>(true);

    const handleBeforeExit = (): false | void => {
        if (window.confirm("Are you sure you want to exit the tour? You can enter the tour any time in the profile dropdown."))
            return;
        return false;
    }

    return (
        <>
            <PageRouter />
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Steps
                enabled={stepsEnabled}
                steps={tourSteps}
                initialStep={0}
                onExit={() => setStepsEnabled(false)}
                options={{
                    exitOnOverlayClick: false,
                    exitOnEsc: false,
                    showProgress: true,
                    // showBullets: true,
                    showStepNumbers: true
                }}
                onBeforeExit={handleBeforeExit}
                onComplete={realisticConfetti}
            />
        </>
    )
}

export default App;