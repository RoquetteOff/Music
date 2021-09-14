import {Switch, Route, Redirect} from "react-router-dom";

const RouteAdmin = ({component: Component, isAuth, ...rest}) => {
    return (
        <div>
            <Switch>
                <Route
                    {...rest}
                    render={(props) => {
                        if (isAuth) {
                            return <Component {...rest} {...props} />;
                        } else {
                            return (
                                <Redirect
                                    to={{
                                        pathname: "/login",
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

export default RouteAdmin;
