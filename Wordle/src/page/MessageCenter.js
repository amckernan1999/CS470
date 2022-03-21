import React, {Fragment} from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


// message displayed between keyboard and guess area
// currently just displays text when game is over
const MessageCenter = (props) => {
    const {messageTxt} = props;

    return (
        <Fragment>
            <Box sx={{mt: 2, mb: 2, color: 'lightgray'}} >
            <Typography variant='h5'>
                {messageTxt}
            </Typography>
            </Box>
        </Fragment>
    )
}

export default MessageCenter;