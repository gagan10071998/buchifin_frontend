import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import Div from "@jumbo/shared/Div";
import useJumboAuth from "@jumbo/hooks/useJumboAuth";

const Auth = ({fallbackPath}) => {
    const {authUser, isLoading} = useJumboAuth();

    if(isLoading)
        return (
            <Div
                sx={{
                    display: 'flex',
                    minWidth: 0,
                    alignItems: 'center',
                    alignContent: 'center',
                    height: '100%',
                }}
            >
                <CircularProgress sx={{m: '-40px auto 0'}}/>
            </Div>
        )

    if (authUser) {
        return <Outlet/>;
    }

    return <Navigate to={fallbackPath}/>;
};

export default Auth;