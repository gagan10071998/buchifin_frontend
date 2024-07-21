import React, { useEffect } from 'react';
import { Card, CardContent, Typography, Box } from "@mui/material";
import Link from "@mui/material/Link";
import Div from "@jumbo/shared/Div";
import { ASSET_IMAGES } from "../../../utils/constants/paths";
import { getAssetPath } from "../../../utils/appHelpers";
import * as yup from "yup";
import { Form, Formik } from "formik";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import LoadingButton from "@mui/lab/LoadingButton";
import useAPI from 'app/hooks/useApi';
import useToast from 'app/hooks/useToast';
import { useParams } from 'react-router-dom'
import Footer from './Footer';
import Home from './Home';
const validationSchema = yup.object({
    name: yup.string('Enter your name').required('Name is required').min(3).max(50).trim(),
    email: yup.string('Enter your email').required('Email is required').email(),
    phone: yup.string('Enter your phone number').required('Phone number is required').min(10).matches(/^[0-9]{10}$/, 'Enter a valid Phone Number'),
    address: yup.string('Enter your address').required('Address is required').min(3).max(100).trim(),
    // purpose: yup.string('Enter purpose of payment').required('Purpose is required').min(3).max(50).trim(),
    // amount: yup.number('Enter a valid amount').required('Amount is required').positive(),
});





const Phonepe = ({ }) => {
    const Mapping = {
        "CF": {
            purpose: "Course Fee",
            value: 5000
        },
        "TF": {
            purpose: "Training Fee",
            value: 1000
        },
        "SMARTODR": {
            purpose: "Smart ODR Fee",
            value: 6872
        },
        "IF": {
            purpose: "Individual Case Filling",
            value: 1000
        }
    }
    const { type } = useParams();
    const { POST } = useAPI();
    const showToast = useToast();

    const onPay = async (data) => {
        try {
            data["paymentType"] = type;
            const response = await POST("/inbound/phonepe/pay", data);
            if (response) {
                window.location = response;
            }
            return
        } catch (error) {
            showToast('Wrong Credentials', 'error', 3000);
        }
    };

    useEffect(() => {
        // Function to run after the window is fully loaded
        const handleLoad = () => {
            // Remove specific class from an element
            const element = document.querySelector('.CmtLayout-main.css-zm4tjl');
            if (element) {
                element.classList.remove('css-zm4tjl');
            }

            // Remove an element from the DOM
            const drawer = document.querySelector('.MuiDrawer-root');
            if (drawer) {
                drawer.remove();
            }
        };

        // Add event listener for window load
        window.addEventListener('load', handleLoad);

        // Clean up the event listener when the component unmounts
        return () => window.removeEventListener('load', handleLoad);
    }, []);

    return (
        type === "HOME" ? (<>
            <Home /><Footer /></>) : (<>
                <Div sx={{
                    width: 720,
                    maxWidth: '100%',
                    margin: 'auto',
                    p: 4
                }}>
                    <Card
                        sx={{
                            display: 'flex',
                            minWidth: 0,
                            flexDirection: { xs: 'column', md: 'row' }
                        }}
                    >
                        <CardContent
                            sx={{
                                flex: '0 1 300px',
                                position: 'relative',
                                background: `#0267a0 url(${getAssetPath(`${ASSET_IMAGES}/widgets/back.png`, "640x428")}) no-repeat center`,
                                backgroundSize: 'cover',

                                '&::after': {
                                    display: 'inline-block',
                                    position: 'absolute',
                                    content: `''`,
                                    inset: 0,
                                }
                            }}
                        >
                            <Div
                                sx={{
                                    display: 'flex',
                                    minWidth: 0,
                                    flex: 1,
                                    flexDirection: 'column',
                                    color: 'common.white',
                                    position: 'relative',
                                    zIndex: 1,
                                    height: '100%'
                                }}
                            >
                                <Div sx={{ mb: 2 }}>
                                    <Typography variant={"h3"} color={"inherit"} fontWeight={500} mb={1}>Pay Now</Typography>
                                    <Typography variant={"body1"}>
                                        <Link
                                            href={"#"}
                                            color={"inherit"}
                                            underline={'none'}
                                        >Instant Payment powered by Phonepe
                                        </Link>
                                    </Typography>
                                </Div>


                            </Div>
                        </CardContent>
                        <CardContent sx={{ flex: 1, p: 4 }}
                        >
                            <Formik
                                validateOnChange={true}
                                initialValues={{
                                    name: '',
                                    email: '',
                                    phone: '',
                                    address: '',
                                    purpose: type ? (Mapping[type].purpose || 'Fee') : "Fee",
                                    amount: type ? (Mapping[type].value || 1000) : 1000
                                }}

                                validationSchema={validationSchema}
                                onSubmit={(data, { setSubmitting, setErrors }) => {
                                    onPay(data)
                                    setSubmitting(false)
                                }}
                            >
                                {({ isSubmitting, isValid, dirty, values, handleChange, errors, touched }) => (
                                    <Form style={{ textAlign: 'left' }} noValidate autoComplete='off'>
                                        <Div sx={{ mt: 'auto', textAlign: 'center' }}>
                                            <Link href="#" underline="none" sx={{ display: 'inline-flex' }}>
                                                <img src={`${ASSET_IMAGES}/logo-white.png`} alt="Jumbo React" />
                                            </Link>
                                        </Div>
                                        <Div sx={{ mt: 1, mb: 3 }}>
                                            <JumboTextField
                                                fullWidth
                                                name="name"
                                                label="Name"
                                            />
                                        </Div>
                                        <Div sx={{ mt: 1, mb: 3 }}>
                                            <JumboTextField
                                                fullWidth
                                                name="email"
                                                label="Email"
                                            />
                                        </Div>
                                        <Div sx={{ mt: 1, mb: 2 }}>
                                            <JumboTextField
                                                fullWidth
                                                name="phone"
                                                label="Phone Number"
                                            />
                                        </Div>
                                        <Div sx={{ mt: 1, mb: 3 }}>
                                            <JumboTextField
                                                fullWidth
                                                name="address"
                                                label="Address"
                                            />
                                        </Div>
                                        <Div sx={{ mt: 1, mb: 2 }}>
                                            <JumboTextField
                                                fullWidth
                                                name="purpose"
                                                label="Purpose of Payment"
                                                disabled
                                                value={"Fee"}
                                            />
                                        </Div>
                                        <Div sx={{ mt: 1, mb: 2 }}>
                                            <JumboTextField
                                                fullWidth
                                                name="amount"
                                                label="Amount"
                                                type="number"
                                                disabled
                                                value={1000}
                                            />
                                        </Div>

                                        <LoadingButton
                                            fullWidth
                                            type="submit"
                                            variant="contained"
                                            size="large"
                                            sx={{ mb: 3 }}
                                            loading={isSubmitting}
                                            disabled={!isValid || !dirty}
                                        >
                                            PAY
                                        </LoadingButton>
                                        <Typography variant={"body1"} mb={2}>Sama's <Link target="_blank" href="https://www.sama.live/terms_and_condition.php">Terms and Conditions</Link> and <Link target="_blank" href="https://www.sama.live/privacy_policy.php"> Privacy Policy</Link>.
                                        </Typography>
                                        <Div sx={{ mt: 'auto', textAlign: "center" }}>
                                            <Link href="#" underline="none" sx={{ display: 'inline-flex' }}>
                                                Powered By <img src={`${ASSET_IMAGES}/phonepe.png`} style={{ height: "50px" }} alt="Jumbo React" />
                                            </Link>
                                        </Div>
                                    </Form>
                                )}
                            </Formik>
                        </CardContent>
                    </Card>
                </Div>
                <Footer /></>)

    );
};

export default Phonepe;
