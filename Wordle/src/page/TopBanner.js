import React, {Fragment} from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

//simple label at top of application
const TopBanner = (props) => {

    return (
        <Fragment>
            <Box sx={{mt: 2, mb: 2, color: 'lightgray'}} >
            <Typography variant='h5'>
                CS-470 Wordle
            </Typography>

            </Box>
        </Fragment>
    )
}

export default TopBanner;