import {Switch, BrowserRouter as Router} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {FETCH} from "./FETCH";
import Home from "./Pages/Home";
import SongRequest from "./Pages/songRequest";
import Login from "./Pages/login";
import Layout from "./Pages/admin/layout";
import RouteVisitor from "./router/RouteVisitor";
import RouteLogin from "./router/RoutesLogin";
import RouteAdmin from "./router/RouteAdmin";

function App() {
    const [isAuthVerify, setAuth] = useState(false);

    const verifyToken = () => {
        const token = localStorage.getItem("token");
        if (token) {
            console.log('il y a un token')
            axios
                .get(`${FETCH}/login/isuserauth`, {
                    headers: {
                        "x-access-token": token,
                    },
                })
                .then((response) => {
                    if (response.data.auth === true) {
                        setAuth(true);
                    } else {
                        localStorage.removeItem("token");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            console.log('il ny a pas de token')
        }
    }

    useEffect(() => {
        verifyToken();
    }, []);


    return (
        <div className="">
            <Router>
                <Switch>
                    <RouteVisitor exact path="/" component={Home}/>
                    <RouteVisitor path="/songrequest" component={SongRequest}/>
                    <RouteLogin path="/login" component={Login} isAuth={isAuthVerify}/>
                    <RouteAdmin path="/dashboard" component={Layout} isAuth={isAuthVerify}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
