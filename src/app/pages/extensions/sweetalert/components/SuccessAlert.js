import React from 'react';
import Button from "@mui/material/Button";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import code from "../components/demo-code/success-alert.txt";

const SuccessAlert = () => {
    const Swal = useSwalWrapper();
    const sweetAlerts = () => {
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
        });
    };
    return (
        <JumboDemoCard title={"Success alert"} demoCode={code} wrapperSx={{pt: 0, backgroundColor: 'background.paper'}}>
            <Button variant={"outlined"} onClick={sweetAlerts}>Click me</Button>
        </JumboDemoCard>
    );
};

export default SuccessAlert;
