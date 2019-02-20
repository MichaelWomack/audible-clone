import * as React from 'react';
import { SFC } from 'react';
import { GitHubIcon } from '../Icons';
import IconButton from '@material-ui/core/IconButton';

const GitHubButton: SFC<{}> = () => 
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