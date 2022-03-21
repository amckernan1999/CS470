import React, {Fragment, useState} from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {backdropClasses, Grid} from "@mui/material";

//basic building block of guess grid
const LetterBox = (props) => {

    const {index, value} = props;
    const { backgroundColor, letter } = value;


    return (
        <Box sx={{
            width: 40,
            height: 40,
            border: 1,
            borderColor: 'darkgrey',
            borderRadius: .9,
            textAlign: 'center',
            color: 'lightgray',
            backgroundColor,
            letter
        }}
        >
            {letter}
        </Box>
    )
}

//created with guess area boxes outlined in app.js
const GuessArea = (props) => {
    const {guessAreaBoxes} = props;

    return (
        <Fragment>
            <Grid  container columns={5}
                   sx={{
                       width: 5 * 40 + 4 * 10,
                   }}
            >
            {
                guessAreaBoxes.map((elementAttributes, idx) =>
                    <Grid item
                          key={idx}
                          xs={1}
                          sx={{mb: 1}}

                    >
                        <LetterBox value={elementAttributes}/>
                    </Grid>
                )
            }
            </Grid>
        </Fragment>
    )
}

export default GuessArea;