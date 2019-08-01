import React from 'react';

// Material
import { Button } from '@material-ui/core';

// Local
import { sendMail } from 'services';


const App = () => (
    <div>
        <h1>Hi this is React</h1>
        <Button variant='contained' onClick={() => sendMail({})}>
            Test Email
        </Button>
    </div>
);

export default App;
