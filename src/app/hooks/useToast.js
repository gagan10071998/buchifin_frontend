import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";
import { useTheme } from "@mui/material";

const useToast = () => {
    const Swal = useSwalWrapper();
    const theme = useTheme();

    const showToast = (message, alertType, timer = 3000) => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: timer,
            timerProgressBar: true,
            onOpen: toast => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
        });

        Toast.fire({
            icon: alertType,
            title: message,
            background: theme.palette.background.paper,
            width: 'auto',
            padding: '10px'
        });
    };

    return showToast;
};

export default useToast;
