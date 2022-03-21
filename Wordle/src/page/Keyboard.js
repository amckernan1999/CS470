import React, {Fragment, useState} from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {backdropClasses, Grid} from "@mui/material";

//basic buidling block of the keyboard
const KeyboardLetterBox = (props) => {

    const {keyAttributes} = props;

    const {letter, backgroundColor} = keyAttributes;

    return (
        <Box sx={{
            width: 30,
            height: 30,
            border: 1,
            borderRadius: .9,
            borderColor: 'darkgrey',
            textAlign: 'center',
            backgroundColor
        }}>
            {letter}
        </Box>
    )
}

//keyboard component that passes attributes to app.js on callback function
const Keyboard = (props) => {

    const {keyboard, onClickCallback} = props;
    return (
        <Fragment>
            <Grid  container columns={10}  // hard-coded value -- this is the number of demo keys
                   sx={{
                       width: 10* 30 + 3 * 10,
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center'
                   }}
            >
                {
                    keyboard.map((keyAttributes, idx) =>
                        <Grid item
                              key={idx}
                              xs={1}
                              sx={{mb: 1}}
                              onClick={() => onClickCallback(keyAttributes)}
                        >

                            <KeyboardLetterBox keyAttributes={keyAttributes}/>

                        </Grid>
                    )
                }
            </Grid>
        </Fragment>
    )
}

export default Keyboard;