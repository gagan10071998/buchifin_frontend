import React from 'react';
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import {Button, MobileStepper} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import code from "../Steppers/demo-code/progress-mobile-stepper.txt";

const ProgressMobileStepper = () => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <JumboDemoCard title={"Progress Mobile Stepper"} demoCode={code}>
            <MobileStepper
                variant="progress"
                steps={6}
                position="static"
                activeStep={activeStep}
                sx={{maxWidth: 400, flexGrow: 1, bgcolor: 'background.paper'}}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
                        Next
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft/>
                        ) : (
                            <KeyboardArrowRight/>
                        )}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight/>
                        ) : (
                            <KeyboardArrowLeft/>
                        )}
                        Back
                    </Button>
                }
            />
        </JumboDemoCard>
    );
};

export default ProgressMobileStepper;
