import * as React from 'react';
import {styled} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import Div from "@jumbo/shared/Div";
import code from "../Sliders/demo-code/track-inverted-slider.txt";

const marks = [
    {
        value: 0,
        label: '0°C',
    },
    {
        value: 20,
        label: '20°C',
    },
    {
        value: 37,
        label: '37°C',
    },
    {
        value: 100,
        label: '100°C',
    },
];
const valuetext = (value) => {
    return `${value}°C`;
};
const Separator = styled('div')(
    ({theme}) => `
  height: ${theme.spacing(3)};
`,
);

const TrackInvertedSlider = () => {
    return (
        <JumboDemoCard title={"Inverted track"} demoCode={code}
                       wrapperSx={{backgroundColor: 'background.paper', pt: 0}}>
            <Div sx={{width: 250, maxWidth: '100%'}}>
                <Typography id="track-inverted-slider" gutterBottom>
                    Inverted track
                </Typography>
                <Slider
                    track="inverted"
                    aria-labelledby="track-inverted-slider"
                    getAriaValueText={valuetext}
                    defaultValue={30}
                    marks={marks}
                />
                <Separator/>
                <Typography id="track-inverted-range-slider" gutterBottom>
                    Inverted track range
                </Typography>
                <Slider
                    track="inverted"
                    aria-labelledby="track-inverted-range-slider"
                    getAriaValueText={valuetext}
                    defaultValue={[20, 37]}
                    marks={marks}
                />
            </Div>
        </JumboDemoCard>
    );
}
export default TrackInvertedSlider;
