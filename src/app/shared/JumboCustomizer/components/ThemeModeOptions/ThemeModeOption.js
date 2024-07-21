import React from 'react';
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import {Typography} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Div from "@jumbo/shared/Div";
import useJumboTheme from "@jumbo/hooks/useJumboTheme";
import {mainTheme as mainThemeDark} from "../../../../themes/main/dark";
import {headerTheme as headerThemeDark} from "../../../../themes/header/dark";
import {footerTheme as footerThemeDark} from "../../../../themes/footer/dark";
import {sidebarTheme as sidebarThemeDark} from "../../../../themes/sidebar/dark";

import {mainTheme as mainThemeDefault} from "../../../../themes/main/default";
import {headerTheme as headerThemeDefault} from "../../../../themes/header/default";
import {footerTheme as footerThemeDefault} from "../../../../themes/footer/default";
import {sidebarTheme as sidebarThemeDefault} from "../../../../themes/sidebar/default";
import useJumboSidebarTheme from "@jumbo/hooks/useJumboSidebarTheme";
import useJumboHeaderTheme from "@jumbo/hooks/useJumboHeaderTheme";
import useJumboFooterTheme from "@jumbo/hooks/useJumboFooterTheme";


const ThemeModeOption = () => {
    const {theme, setTheme} = useJumboTheme();
    const {setSidebarTheme} = useJumboSidebarTheme();
    const {setHeaderTheme} = useJumboHeaderTheme();
    const {setFooterTheme} = useJumboFooterTheme();

    const handleModeChange = React.useCallback(async (event) => {
        if(event.target.checked) {
            await setTheme({mode: "dark", ...mainThemeDark});
            setHeaderTheme({...theme, ...headerThemeDark});
            setSidebarTheme({...theme, ...sidebarThemeDark});
            setFooterTheme({...theme, ...footerThemeDark});
            return;
        }
        await setTheme({mode: "light", ...mainThemeDefault});
        setHeaderTheme({...theme, ...headerThemeDefault});
        setSidebarTheme({...theme, ...sidebarThemeDefault});
        setFooterTheme({...theme, ...footerThemeDefault});
    }, []);

    return (
        <JumboCardQuick
            title={<Typography variant={"h5"} mb={0}>Dark Theme</Typography>}
            headerSx={{
                borderBottom: 1, borderColor: 'divider',
            }}
        >
            <Div>
                <FormControlLabel
                    control={
                        <Switch checked={theme?.mode === "dark"} onChange={handleModeChange} name="header-fixed" />
                    }
                    label="Apply Dark Theme"
                />
            </Div>
        </JumboCardQuick>
    );
};

export default ThemeModeOption;