import React, { useRef, useState, useEffect } from 'react';
import { Tooltip, Typography } from '@mui/material';

const TruncateText = ({ children, variant, style, width, ...otherProps }) => {
    const [isOverflowing, setIsOverflowing] = useState(false);
    const textRef = useRef(null);

    useEffect(() => {
        if (textRef.current) {
            const { scrollWidth, clientWidth } = textRef.current;
            if (scrollWidth > clientWidth) {
                setIsOverflowing(true);
            } else {
                setIsOverflowing(false);
            }
        }
    }, [children]);

    const RenderedTypography = (
        <Typography 
            ref={textRef}
            variant={variant} 
            style={{ 
                ...style, 
                whiteSpace: 'nowrap', 
                overflow: 'hidden', 
                textOverflow: 'ellipsis', 
                maxWidth: width || '100px' 
            }} 
            {...otherProps}>
            {children}
        </Typography>
    );

    return isOverflowing ? (
        <Tooltip title={children} placement="top">
            {RenderedTypography}
        </Tooltip>
    ) : RenderedTypography;
};

export default TruncateText;
