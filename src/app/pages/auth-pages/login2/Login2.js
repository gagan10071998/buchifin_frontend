import React, { useEffect } from 'react';
import { Card, CardContent, Checkbox, FormControlLabel, IconButton, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { Facebook, Google, Twitter } from "@mui/icons-material";
import Div from "@jumbo/shared/Div";
import { alpha } from "@mui/material/styles";
import { ASSET_IMAGES } from "../../../utils/constants/paths";
import { getAssetPath } from "../../../utils/appHelpers";
import * as yup from "yup";
import { Form, Formik } from "formik";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { setToken, setUserData, setRefreshToken, setUserType, setAvailableUserTypes } from "../../../redux/slices/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import useAPI from 'app/hooks/useApi';
import useToast from 'app/hooks/useToast';
import { selectToken } from '../../../redux';

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email'),
    password: yup
        .string('Enter your password')
        .required('Password is required'),
    // phone: yup
    //     .string('Enter your phone number')
    //     .matches(/^[0-9]{10}$/, 'Enter a valid Phone Number'),
});



const Login2 = ({ disableSmLogin }) => {
    const token = useSelector(selectToken);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { POST } = useAPI();
    const showToast = useToast();

    useEffect(() => {
        if (token) {
            navigate("/dashboard");
        }
    }, [token, navigate]);

    if (window.location.hostname === 'pay.sama.live') {
        window.location.href = 'https://pay.sama.live/pay/CF';
        return null;
    }
    
    const onSignIn = async (email, password) => {
        try {
            const response = await POST("/auth/login", { email, password });
            if (!response) {
                throw new Error('Something went wrong');
            }
            dispatch(setUserType(response?.type[0]));
            dispatch(setToken(response?.auth?.token));
            delete response?.auth?.token;
            dispatch(setRefreshToken(response?.auth?.refreshToken));
            delete response?.auth?.refreshToken;
            dispatch(setUserData(response));
            showToast('Login successful!', 'success', 3000);
            setTimeout(() => {
                navigate("/dashboard");
            }, 3000);
        } catch (error) {
            console.error("Login error:", error);
            showToast('Wrong Credentials', 'error', 3000);
        }
    };

    return (
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
                            // backgroundColor: alpha('#0267a0', .65)
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
                            <Typography variant={"h3"} color={"inherit"} fontWeight={500} mb={1}>Sign In</Typography>
                            {/* <Typography variant={"body1"} mb={2}>
                                By signing in, you can avail full features of the Jumbo.
                            </Typography> */}
                            <Typography variant={"body1"}>
                                <Link
                                    href={"#"}
                                    color={"inherit"}
                                    underline={'none'}
                                >Forgot your password? Recover Now
                                </Link>
                            </Typography>
                        </Div>

                        <Div sx={{ mt: 'auto' }}>
                            <Link href="#" underline="none" sx={{ display: 'inline-flex' }}>
                                <img src={`${ASSET_IMAGES}/logo-white.png`} alt="Jumbo React" />
                            </Link>
                        </Div>
                    </Div>
                </CardContent>
                <CardContent sx={{ flex: 1, p: 4 }}
                >
                    <Formik
                        validateOnChange={true}
                        initialValues={{
                            email: 'demo@example.com',
                            password: 'ABC123DEF',
                            // phone: '',
                            termsAndConditions: false
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(data, { setSubmitting, setErrors }) => {
                            setSubmitting(true);
                            if (!data.email ) {
                                setErrors({ email: "Email must be provided" });
                                setSubmitting(false);
                                return;
                            }
                            if (!data.termsAndConditions) {
                                showToast('You must accept the Terms and Conditions.', 'error', 3000);
                                setSubmitting(false);
                                return;
                            }
                            onSignIn(data.email, data.password);
                            setSubmitting(false);
                        }}
                    >
                        {({ isSubmitting, values, handleChange, errors, touched }) => (
                            <Form style={{ textAlign: 'left' }} noValidate autoComplete='off'>
                                <Div sx={{ mt: 1, mb: 3 }}>
                                    <JumboTextField
                                        fullWidth
                                        name="email"
                                        label="Email"
                                    />
                                </Div>
                                {/* <Div sx={{ mt: 1, mb: 3, textAlign: 'center' }}>
                                    OR
                                </Div>
                                <Div sx={{ mt: 1, mb: 2 }}>
                                    <JumboTextField
                                        fullWidth
                                        name="phone"
                                        label="Phone Number"
                                        inputProps={{
                                            maxLength: 10
                                        }}
                                    />
                                </Div> */}
                                <Div sx={{ mt: 1, mb: 2 }}>
                                    <JumboTextField
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                    />
                                </Div>
                                <Div sx={{ mb: 2 }}>
                                    <FormControlLabel control={<Checkbox
                                        name="termsAndConditions"
                                        checked={values.termsAndConditions}
                                        onChange={handleChange}
                                    />} />
                                    <Typography variant={"body1"} mb={2}>I accept Buchifin's <Link target="_blank">Terms and Conditions</Link> and <Link target="_blank" href="https://www.sama.live/privacy_policy.php"> Privacy Policy</Link>.
                                    </Typography>
                                    {errors.termsAndConditions && touched.termsAndConditions &&
                                        <Typography variant="body2" color="error">
                                            {errors.termsAndConditions}
                                        </Typography>
                                    }

                                </Div>
                                <LoadingButton
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    sx={{ mb: 3 }}
                                    loading={isSubmitting}
                                >Sign In</LoadingButton>
                                {
                                    !disableSmLogin && (
                                        <React.Fragment>
                                            <Typography variant={"body1"} mb={2}>Or sign in with</Typography>
                                            <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                                                <IconButton sx={{
                                                    bgcolor: '#385196',
                                                    color: 'common.white',
                                                    p: theme => theme.spacing(1.25),

                                                    '&:hover': {
                                                        backgroundColor: '#385196',
                                                    }
                                                }} aria-label="Facebook">
                                                    <Facebook fontSize="small" />
                                                </IconButton>
                                                <IconButton sx={{
                                                    bgcolor: '#00a8ff',
                                                    color: 'common.white',
                                                    p: theme => theme.spacing(1.25),

                                                    '&:hover': {
                                                        backgroundColor: '#00a8ff',
                                                    }
                                                }} aria-label="Twitter">
                                                    <Twitter fontSize="small" />
                                                </IconButton>
                                                <IconButton sx={{
                                                    bgcolor: '#23272b',
                                                    color: 'common.white',
                                                    p: theme => theme.spacing(1.25),

                                                    '&:hover': {
                                                        backgroundColor: '#23272b',
                                                    }
                                                }} aria-label="Twitter">
                                                    <Google fontSize="small" />
                                                </IconButton>
                                            </Stack>
                                        </React.Fragment>
                                    )
                                }

                            </Form>
                        )}
                    </Formik>
                </CardContent>
            </Card>
        </Div>
    );
};

export default Login2;
