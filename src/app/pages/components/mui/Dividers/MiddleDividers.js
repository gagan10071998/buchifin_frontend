import React from 'react';
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import Div from "@jumbo/shared/Div";
import {Button, Grid, Stack, Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import code from "../Dividers/demo-code/middle-dividers.txt";

const MiddleDividers = () => {
    return (
        <JumboDemoCard title={"Middle Dividers"} demoCode={code}>
                <Div sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                    <Div sx={{my: 3, mx: 2}}>
                        <Grid container alignItems="center">
                            <Grid item xs>
                                <Typography gutterBottom variant="h3" component="div">
                                    Toothbrush
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant="h6" component="div">
                                    $4.50
                                </Typography>
                            </Grid>
                        </Grid>
                        <Typography color="text.secondary" variant="body2">
                            Pinstriped cornflower blue cotton blouse takes you on a walk to the park or
                            just down the hall.
                        </Typography>
                    </Div>
                    <Divider variant="middle"/>
                    <Div sx={{m: 2}}>
                        <Typography gutterBottom variant="body1" mb={1}>
                            Select type
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <Chip label="Extra Soft"/>
                            <Chip color="primary" label="Soft"/>
                            <Chip label="Medium"/>
                            <Chip label="Hard"/>
                        </Stack>
                    </Div>
                    <Div sx={{mt: 3, ml: 1, mb: 1}}>
                        <Button>Add to cart</Button>
                    </Div>
                </Div>
        </JumboDemoCard>
    );
};

export default MiddleDividers;
