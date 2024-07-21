import React from 'react';
import { Typography, Link, Box, Grid, Divider } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
    return (
        <Box sx={{ backgroundColor: '#f5dba2', color: '#7a1e15', p: 3 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Typography variant="h6">USEFUL LINKS</Typography>
                    <Link href="https://www.sama.live/how_sama_works.php" color="inherit">How Sama Works</Link><br />
                    <Link href="https://www.sama.live/rules_and_procedures.php" color="inherit">Rules And Procedures</Link><br />
                    <Link href="https://www.sama.live/sama-neutral-registration.php" color="inherit">Join Sama as Neutral</Link><br />
                    <Link href="https://www.sama.live/casemanager-registration.php" color="inherit">Join Sama as Case Manager</Link><br />
                    <Link href="https://www.sama.live/terms_and_condition.php" color="inherit">Terms and Conditions</Link><br />
                    <Link href="https://www.sama.live/privacy_policy.php" color="inherit">Privacy Policy</Link><br />
                    <Link href="https://www.sama.live/work_with_us.php" color="inherit">Work with us</Link><br />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant="h6">CONTACT US</Typography>
                    <Typography>
                        ODRWAYS SOLUTIONS PRIVATE LIMITED<br />
                        W-901, Rohan Jharokha 2,<br />
                        Yemalur, Near HAL Airport<br />
                        Bangalore, 560038, Karnataka India<br />
                        Email: <Link href="mailto:info@sama.live" color="inherit">info@sama.live</Link><br />
                        Phone: +91 98557 55798
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant="h6">SOCIAL</Typography>
                    <Link href="https://www.facebook.com/sama.live.official/" color="inherit"><FacebookIcon /></Link>
                    <Link href="https://twitter.com/samaodr" color="inherit"><TwitterIcon /></Link>
                    <Link href="https://www.linkedin.com/company/sama-official" color="inherit"><LinkedInIcon /></Link>
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        Smart ODR platform created for the securities market is powered by Sama.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Divider sx={{ backgroundColor: '#7a1e15', borderColor: '#7a1e15', my: 2 }} />
                    <Typography variant="body2" align="center">
                        Disclaimer: Issued on 30th September, 2023. In public interest, please note that we send official communication only from our verified email addresses and phone numbers. Official Email IDs & Contact Number of Sama are- info@sama.live, info@odrways.com, help@odrways.com, noreply@mailer.sama.live, noreply@mailers.sama.live, +91 98557-55798, +91 93557-55793.
                    </Typography>
                    <Typography variant="body2" align="center">
                        Any communication received purported to be from Sama not sent through our verified sources is fraudulent. If you receive such communication claiming to be from Sama, please report it to us immediately.
                    </Typography>
                    <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                        © 2015 - 2023. All Rights Reserved.
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Footer;
