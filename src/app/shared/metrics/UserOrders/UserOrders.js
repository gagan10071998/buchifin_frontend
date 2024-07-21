import React from 'react';
import ChartOrders from "./ChartOrders";
import {Typography} from "@mui/material";
import {cases} from "./data";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import Div from "@jumbo/shared/Div";
import {useTranslation} from "react-i18next";

const UserOrders = () => {
    const {t} = useTranslation();
    return (
        <JumboCardQuick
            noWrapper
            title={<Typography variant={"h5"} mb={.5}>Cases</Typography>}
            subheader={<Typography variant={"h6"} color={"text.secondary"} mb={0}>91,02,427</Typography>}
            headerSx={{pb: 0}}
        >
            <Div sx={{mt: -2.5}}>
                <ChartOrders chartData={cases}/>
            </Div>
        </JumboCardQuick>
    );
};

export default UserOrders;
