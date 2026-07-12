import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js';

let fireApp, fireAuth;

function winFCB(data, _) {

    /**
     * Initializes the Firebase app and Auth services.
     * This MUST be called once before any other function.
     * @param {object} firebaseConfig Your Firebase project configuration.
     */
    function start(firebaseConfig) {
        console.log("Starting Firebase initialization...", firebaseConfig);
        try {
            fireApp = initializeApp(firebaseConfig);
            fireAuth = getAuth(fireApp);
            console.log("Firebase has been initialized successfully.");
        } catch (error) {
            console.error("Firebase initialization failed:", error);
            alert("Error: Could not start Firebase services.");
        }
    }

    /**
     * Creates and renders the reCAPTCHA widget.
     * It will automatically trigger sending the phone number upon successful verification.
     * @param {string} recapHolder The ID of the HTML element for the reCAPTCHA widget.
     * @param {function} callBack Function to execute after the OTP is sent.
     * @param {string} phoneNumber The phone number to be verified.
     */
    function recap(recapHolder, callBack, phoneNumber) {
        // **Critical Check:** Ensure fireAuth is initialized.
        if (!fireAuth) {
            const errorMessage = "Firebase Auth is not initialized. Make sure to call start(config) first.";
            console.error(errorMessage);
            alert(errorMessage);
            return;
        }

        // Clear any previous instance to prevent re-rendering errors
        if (window.recaptchaVerifier) {
            window.recaptchaVerifier.clear();
        }

        try {
            window.recaptchaVerifier = new RecaptchaVerifier(fireAuth, recapHolder, {
                'theme': 'dark',
                'size': 'normal',
                'type': 'image', // Corrected typo from 'tpype' to 'type'
                'badge': 'bottomright',
                'callback': (response) => {
                    // reCAPTCHA solved, now we can send the phone number.
                    console.log("reCAPTCHA verified. Sending phone number...");
                    sendNumber(phoneNumber, callBack);
                },
                'expired-callback': () => {
                    // This is a good practice to handle expired tokens.
                    alert("reCAPTCHA has expired. Please verify again.");
                }
            });

            // This renders the reCAPTCHA widget. It returns a promise.
            window.recaptchaVerifier.render().then((widgetId) => {
                console.log("reCAPTCHA rendered with widget ID:", widgetId);
                window.recaptchaWidgetId = widgetId; // Store widget ID for potential reset
            });
        } catch (error) {
            console.error("Error creating or rendering RecaptchaVerifier:", error);
            alert("Failed to set up phone number verification. Check the console for details.");
        }
    }

    /**
     * Signs in with the phone number.
     * @param {string} phoneNumber The user's phone number.
     * @param {function} callBack The callback for the UI after OTP is sent.
     */
    function sendNumber(phoneNumber, callBack) {
        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(fireAuth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                console.log("OTP sent successfully.");
                window.confirmationResult = confirmationResult;
                if (callBack && typeof callBack === 'function') {
                    callBack();
                } else if (_) {
                    _.CL_(["Recaptcha Verifier callback"]);
                }
            }).catch((error) => {
                console.error("Error sending OTP:", error);
                alert("Error: Could not send verification code. Please try again.\n" + error.message);
                // Optionally reset reCAPTCHA on failure
                if(window.grecaptcha && window.recaptchaWidgetId) {
                    window.grecaptcha.reset(window.recaptchaWidgetId);
                }
            });
    }

    /**
     * Confirms the OTP code provided by the user.
     * @param {string} code The 6-digit verification code.
     * @param {function} callBack Function to execute on successful sign-in.
     */
    function confirm(code, callBack) {
        if (!window.confirmationResult) {
            const errorMessage = "Cannot confirm code. The confirmation result is missing. Please send the OTP first.";
            console.error(errorMessage);
            alert(errorMessage);
            return;
        }

        window.confirmationResult.confirm(code).then((result) => {
            // User signed in successfully.
            const user = result.user;
            console.log("User successfully signed in:", user.uid);
            if (callBack && typeof callBack === 'function') {
                callBack(user); // Pass the user object to the callback
            }
        }).catch((error) => {
            console.error("Error confirming code:", error);
            // Most common error is 'auth/invalid-verification-code'
            alert("The code you entered is invalid. Please try again.");
        });
    }

    return {
        start,
        recap,
        sendNumber,
        confirm
    };
}

// Assign the factory function to the window object
window.FBC = winFCB;