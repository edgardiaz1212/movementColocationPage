import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Home } from "./pages/home";
import injectContext from "./store/appContext";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import Rack from "./pages/Rack.jsx";
import Equipment from "./pages/Equipment.jsx";
import Consult from "./pages/Consult.jsx";
import EditEquipment from "./pages/EditEquipment.jsx";
import EditRack from "./pages/EditRack.jsx";
import { NotFound } from "./component/NotFound.jsx";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename =  process.env.REACT_BASENAME;
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    if (!backendUrl || backendUrl === "") return <BackendURL />;

    return (
        <div className="primer">
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Rack />} path="/rack" />
                        <Route element={<Equipment />} path="/equipment" />
                        <Route element={<Consult />} path="/consult" />
                        <Route element={<EditEquipment />} path="/edit-equipment/:id" />
                        <Route element={<EditRack />} path="edit-rack/:id" />
                        <Route element={<NotFound />} path="*" />
                        
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
