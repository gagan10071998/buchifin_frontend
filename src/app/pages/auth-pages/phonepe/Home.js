import React from 'react';
import { Card, CardContent, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Div from "@jumbo/shared/Div";
import { useTranslation } from "react-i18next";
import { ASSET_IMAGES } from "../../../utils/constants/paths";
import { getAssetPath } from "../../../utils/appHelpers";

const Home = () => {
    const { t } = useTranslation();
    return (
        <React.Fragment>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height={200}
                width="100%"
                sx={{
                    backgroundColor: "#d8e9c8"
                }}
            >
                <Box
                    component="img"
                    sx={{ maxWidth: '50%', maxHeight: '50%', height: 'auto', margin: '10%' }}
                    src="https://www.sama.live/assets/img/logo.png"
                    alt="Description of Image"
                />
            </Box>
            <Box
                component="img"
                sx={{ maxWidth: '100%', maxHeight: '100%', height: 'auto' }}
                src="https://www.sama.live/assets/img/sama/section-1.png"
                alt="Description of Image"
            />
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="100%"
                sx={{
                    backgroundColor: "#d8e9c8"
                }}
            >
                <Typography variant="h1" component="div" sx={{
                    marginLeft: '10%',
                    marginRight: '10%',
                    marginTop: '5%',
                    marginBottom: '5%',
                    textAlign: 'center',
                    color: "#7a1e15",
                    fontSize: "26px"
                }}>
                    Sama is a totally new way to resolve disputes between <br /> businesses and customers, employers and employees,<br /> landlords and tenants, professionals and clients, or anyone else<br /> – fully online, in a fast and cost effective manner.<br /><br />

                    Sama, using sophisticated technology and a network of skilled<br /> professionals makes sure that when the week ends, so does <br />your dispute.
                </Typography>
            </Box>
            <Card>
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <Div sx={{ position: 'relative', height: 0, paddingBottom: '69.5%' }}>
                            <CardMedia
                                component="img"
                                image={getAssetPath(`${ASSET_IMAGES}/callouts/giorgio-trovato.jpg`, "640x640")}
                                alt=""
                                sx={{
                                    inset: 0,
                                    height: '100%',
                                    position: 'absolute',
                                }}
                            />
                        </Div>
                    </Grid>
                    <Grid item xs={12} md={6}
                        sx={{ alignSelf: 'center', p: 3, textAlign: { sm: 'left', md: 'right' }, order: { md: -1 } }}>
                        <Typography variant="h2" mb={2}>How Sama Works</Typography>
                        <Typography variant="h3" mb={2} sx={{ marginLeft: '5%' }}>
                            Sama helps solve a variety of disputes quickly and effectively. We believe that when there is space for people to be heard and to explore creative solutions then disputes can be resolved quickly and effectively. Sama seeks to create these spaces through its use of technology, proven techniques and a new generation of skilled professionals capable of using those techniques.
                        </Typography>
                        <Button variant={"contained"} disableElevation sx={{ backgroundColor: "#7a1e15"}}>Know More</Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Div sx={{ position: 'relative', height: 0, paddingBottom: '69.5%' }}>
                            <CardMedia
                                component="img"
                                image={getAssetPath(`${ASSET_IMAGES}/callouts/tangerine-newt.jpg`, "640x640")}
                                alt=""
                                sx={{
                                    inset: 0,
                                    height: '100%',
                                    position: 'absolute',
                                }}
                            />
                        </Div>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ alignSelf: 'center', p: 3 }}>
                        <Typography variant="h2" mb={2}>A new way to resolve disputes</Typography>
                        <Typography variant="h3" mb={2} sx={{ marginRight: '5%' }}>
                            Sama is a totally new way to resolve disputes between businesses and customers, employers and employees, landlords and tenants, professionals and clients, or anyone else – fully online, in a fast and cost effective manner. Sama, using sophisticated technology and a network of skilled professionals makes sure that when the week ends, so does your dispute.
                        </Typography>
                        <Button variant={"contained"} disableElevation sx={{ backgroundColor: "#7a1e15"}}>Know More</Button>
                    </Grid>
                </Grid>
            </Card>
        </React.Fragment>
    );
};

export default Home;
