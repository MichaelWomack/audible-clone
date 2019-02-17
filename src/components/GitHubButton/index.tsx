import * as React from 'react';
import { SFC } from 'react';
import { GitHubIcon } from '../Icons';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';

export interface Props {
    onClick: () => void;
}

const GitHubButton: SFC<{}> = () => 
    <IconButton>
        <a 
            href={"https://www.github.com/michaelwomack"} 
            style={{ textDecoration: 'none', color: 'inherit',  }} 
            target="_blank"
        >
            <GitHubIcon/>
        </a>
    </IconButton>

export default GitHubButton;