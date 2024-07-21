import React from 'react';
import Div from "@jumbo/shared/Div";
import {Card, CardContent, IconButton, Typography} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import {Facebook, Google, Twitter} from "@mui/icons-material";
import Link from "@mui/material/Link";
import {alpha} from "@mui/material/styles";
import SignupForm from "./components/SignupForm";
import {ASSET_IMAGES} from "../../../utils/constants/paths";
import {getAssetPath} from "../../../utils/appHelpers";

const Signup1 = () => {

    return (
        <Div sx={{
            flex: 1,
            flexWrap: 'wrap',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: theme => theme.spacing(4),
        }}>
            <Div sx={{mb: 3, display: 'inline-flex'}}>
                <Link href="#" underline="none" sx={{display: 'inline-flex'}}>
                    <img src={`${ASSET_IMAGES}/logo.png`} alt="Jumbo React"/>
                </Link>
            </Div>
            <Card sx={{maxWidth: '100%', width: 360, mb: 4}}>
                <Div sx={{position: 'relative', height: '200px'}}>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="200"
                        image={getAssetPath(`${ASSET_IMAGES}/colin-watts.jpg`, '640x428')}
                    />
                    <Div
                        sx={{
                            flex: 1,
                            inset: 0,
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: theme => alpha(theme.palette.common.black, .5),
                            p: theme => theme.spacing(3),
                        }}
                    >
                        <Typography
                            variant={"h2"}
                            sx={{color: 'common.white', fontSize: '1.5rem', mb: 0}}
                        >Sign up
                        </Typography>
                    </Div>
                </Div>
                <CardContent sx={{pt: 0}}>
                    <SignupForm/>
                    <Typography
                        textAlign={"center"}
                        variant={"body1"}
                        mb={1}
                    >Have an account?
                        <Link underline="none" href="#">Sign in</Link>
                    </Typography>
                </CardContent>
            </Card>
            <Typography variant={"body1"} mb={2}>Or sign up with</Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
                <IconButton
                    sx={{
                        bgcolor: '#385196',
                        color: 'common.white',
                        p: theme => theme.spacing(1.25),

                        '&:hover': {
                            backgroundColor: '#385196',
                        }
                    }}
                    aria-label="Facebook"
                >
                    <Facebook fontSize="small"/>
                </IconButton>
                <IconButton
                    sx={{
                        bgcolor: '#00a8ff',
                        color: 'common.white',
                        p: theme => theme.spacing(1.25),

                        '&:hover': {
                            backgroundColor: '#00a8ff',
                        }
                    }}
                    aria-label="Twitter"
                >
                    <Twitter fontSize="small"/>
                </IconButton>
                <IconButton
                    sx={{
                        bgcolor: '#23272b',
                        color: 'common.white',
                        p: theme => theme.spacing(1.25),

                        '&:hover': {
                            backgroundColor: '#23272b',
                        }
                    }}
                    aria-label="Twitter"
                >
                    <Google fontSize="small"/>
                </IconButton>
            </Stack>
        </Div>
    );
};

export default Signup1;
