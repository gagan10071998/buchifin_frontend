import React from 'react';
import JumboLayoutProvider from "@jumbo/components/JumboLayout/JumboLayoutProvider";
import JumboContentLayoutProvider from "@jumbo/components/JumboContentLayout/JumboContentLayoutProvider";
import useJumboApp from "@jumbo/hooks/useJumboApp";
import {LAYOUTS} from "./utils/constants/layouts";
import {config} from "./config/main";
import useJumboAuth from "@jumbo/hooks/useJumboAuth";

const AppLayout = (props) => {
    const {activeLayout} = useJumboApp();
    const {isLoading} = useJumboAuth();

    if (!activeLayout) {
        throw Error("AppLayout > No activeLayout is set.");
    }

    const LayoutComponent = React.useMemo(() => {
        const layoutIndex = LAYOUTS.findIndex(layout => layout.name === activeLayout);

        if (layoutIndex >= 0) {
            return LAYOUTS[layoutIndex].component;
        }

        throw Error("No activeLayout is set yet.");
    }, [activeLayout]);

    return (
        <JumboLayoutProvider>
            {
                isLoading
                    ?
                    <div className="loader">
                        <svg className="circular-loader" viewBox="25 25 50 50">
                            <circle className="loader-path" cx="50" cy="50" r="20" />
                        </svg>
                    </div>
                    :
                    <LayoutComponent>
                        <JumboContentLayoutProvider
                            layoutOptions={config.defaultContentLayout}
                        >
                            {props.children}
                        </JumboContentLayoutProvider>
                    </LayoutComponent>
            }

        </JumboLayoutProvider>
    );
};

export default AppLayout;
