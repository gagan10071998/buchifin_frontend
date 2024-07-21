import React from 'react';
import Button from "@mui/material/Button";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import code from "../components/demo-code/advance-alert.txt";

const AdvancedAlert = () => {
    const Swal = useSwalWrapper();
    const sweetAlerts = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
        }).then(result => {
            if (result.value) {
                Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
            }
        });
    };
    return (
        <JumboDemoCard title={"Advanced alert"} demoCode={code} wrapperSx={{pt: 0, backgroundColor: 'background.paper'}}>
            <Button variant={"outlined"} onClick={sweetAlerts}>Click me</Button>
        </JumboDemoCard>
    );
};

export default AdvancedAlert;
