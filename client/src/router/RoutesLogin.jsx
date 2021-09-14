import React, {Fragment} from "react";
import {Switch, Route, Redirect} from "react-router-dom";

const RouteLogin = ({component: Component, isAuth, ...rest}) => {
    return (
        <div>
            <Switch>
                <Route
                    key="index"
                    {...rest}
                    render={(props) => {
                        if (isAuth === false) {
                            return (
                                <Fragment>
                                    <Component {...rest} {...props} />
                                </Fragment>
                            );
                        } else {
                            return (
                                <Redirect
                                    to={{
                                        pathname: "/dashboard",
                                        state: {
                                            from: props.location,
                                        },
                                    }}
                                />
                            );
                        }
                    }}
                />
            </Switch>
        </div>
    );
};

export default RouteLogin;
