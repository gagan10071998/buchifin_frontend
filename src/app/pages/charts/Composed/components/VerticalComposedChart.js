import React from 'react';
import {
    Area,
    Bar,
    CartesianGrid,
    ComposedChart,
    Legend,
    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import data from "./data";
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import code from '../demo-code/vertical-composed.txt';

const VerticalComposedChart = () => (
    <JumboDemoCard title={"Vertical Composed Chart"} demoCode={code} wrapperSx={{pt: 0, backgroundColor: 'background.paper'}}>
        <ResponsiveContainer width="100%" height={200}>
            <ComposedChart layout="vertical" data={data} margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                <XAxis type="number"/>
                <YAxis dataKey="name" type="category"/>
                <Tooltip labelStyle={{color: 'black'}} itemStyle={{color: 'black'}} cursor={false}/>
                <Legend/>
                <CartesianGrid stroke="#f5f5f5"/>
                <Area dataKey="amt" fill={"#e91e63"} stroke="#19A6D2"/>
                <Bar dataKey="pv" barSize={20} fill={"#1e88e5"}/>
                <Line dataKey="uv" stroke="#59AA2B"/>
            </ComposedChart>
        </ResponsiveContainer>
    </JumboDemoCard>
);

export default VerticalComposedChart;
