import * as React from 'react';
import { FunctionComponent } from 'react';
import { GitHubIcon } from '../Icons';
import IconButton from '@material-ui/core/IconButton';

const GitHubButton: FunctionComponent<{}> = () =>
    <IconButton>
        <a 
            href={"https://github.com/MichaelWomack/audible-clone"} 
            style={{ textDecoration: 'none', color: 'inherit',  }} 
            target="_blank"
        >
            <GitHubIcon/>
        </a>
    </IconButton>

export default GitHubButton;