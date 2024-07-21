import React from 'react';
import DatePickers from "./DatePickers";
import TimePickers from "./TimePickers";
import DateAndTimePickers from "./DateAndTimePickers";
import NativePickers from "./NativePickers";
import Masonry from "@mui/lab/Masonry";

const Pickers = () => {
    return (
        <Masonry
            spacing={3.75}
            columns={{xs: 1, lg: 2}}
            sx={{minWidth: '100%', width: 'auto'}}
        >
            <DateAndTimePickers/>
            <TimePickers/>
            <DatePickers/>
            <NativePickers/>
        </Masonry>
    );
};

export default Pickers;
