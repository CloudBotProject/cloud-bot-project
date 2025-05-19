import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
import "@aws-amplify/ui-react/styles.css";
import "./App.css";
import PropTypes from "prop-types";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";

Amplify.configure(awsExports);

function App({ signOut, user }) {
    return (
        <Router>
            <Navbar signOut={signOut} />
            <main>
                <Routes>
                    <Route path="/" element={<Home user={user} />} />
                    <Route path="/dashboard" element={<Dashboard user={user} />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}

App.propTypes = {
    signOut: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
};

export default withAuthenticator(App);
