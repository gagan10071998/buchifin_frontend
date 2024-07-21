import React from "react";
import { Routes, Route } from "react-router-dom";
import routes from "./routes";

const AppRoutes = () => {
    return (
        <Routes>
            {routes.flatMap((route, index) => {
                if (Array.isArray(route.path)) {
                    return route.path.map((pathItem, pathIndex) => (
                        <Route 
                            key={`${index}-${pathIndex}`} 
                            path={pathItem} 
                            element={route.element}
                        />
                    ));
                } else {
                    return (
                        <Route 
                            key={index} 
                            path={route.path} 
                            element={route.element}
                        />
                    );
                }
            })}
        </Routes>
    );
};

export default AppRoutes;
