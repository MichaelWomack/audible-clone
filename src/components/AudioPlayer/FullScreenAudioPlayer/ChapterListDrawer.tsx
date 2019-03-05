import * as React from 'react';
import { FunctionComponent } from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import { Audio } from "../../../model/audio";
import Drawer from "@material-ui/core/Drawer/Drawer";
import Typography from "@material-ui/core/Typography/Typography";
import Divider from '@material-ui/core/Divider';
import { TimeUtils } from "../../../utils";

const styles = (theme: Theme) => createStyles({
    paper: {
        width: '70%',
        maxWidth: 310
    },
    drawerHeader: {
        padding: '10%'
    }
});

export interface ChapterListDrawerProps extends WithStyles<typeof styles> {
    audio: Audio;
    isOpen: boolean;
    onClose: () => void;
    playChapter?: (index: number) => void;
}

const ChapterListDrawer: FunctionComponent<ChapterListDrawerProps> = (props) => {
    const { classes, audio, isOpen, onClose, playChapter } = props;
    return (
        <Drawer open={isOpen} onClose={onClose} classes={{ paper: classes.paper }}>
            <div className={classes.drawerHeader}>
                <Typography variant="subheading">
                    {audio.title}
                </Typography>
            </div>
            <Divider/>
            <List>
                {audio.trackList.map((track, index) =>
                    <ListItem
                        key={track.fileName}
                        selected={audio.currentTrack === index}
                        onClick={() => playChapter(index)}
                        button
                        dense
                    >
                        <ListItemText primary={`Chapter ${index + 1}`}/>
                        <ListItemText secondary={TimeUtils.secondsToHHMMSS(track.duration)}/>
                    </ListItem>
                )}
            </List>
        </Drawer>
    );
};

export default withStyles(styles)(ChapterListDrawer);