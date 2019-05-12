import * as React from 'react';
import { Component } from 'react';

import AddAudioStyles from './AddAudioStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import BookSearch from '../BookSearch';
import EditDetails from '../EditDetails';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import UploadAudio from '../../containers/UploadAudio';
import ArrowBackIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardIos';
import ClearSharpIcon from '@material-ui/icons/ClearSharp';
import DoneAll from '@material-ui/icons/DoneAllOutlined';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { VolumeInfo } from '../../model/volume';
import IconButton from '@material-ui/core/IconButton';

export interface AddAudioProps extends WithStyles<typeof AddAudioStyles>, RouteComponentProps {
    clearVolumes: () => void;
    setVolume: (volume: VolumeInfo) => void;
    clearUploadStatus: () => void;
    isUploading: boolean;
    uploadComplete: boolean;
    uploadProgress: number;
}

export interface AddAudioState {
    activeStep?: number;
    nextStepDisabled: boolean;
    complete: boolean;
}

export class AddAudio extends Component<AddAudioProps, AddAudioState> {
    state: AddAudioState = {
        activeStep: 0,
        nextStepDisabled: true,
        complete: false,
    };

    scrollRef: React.RefObject<HTMLDivElement>;

    constructor(props: AddAudioProps) {
        super(props);
        this.scrollRef = React.createRef<HTMLDivElement>();
    }

    scrollIntoView = () => {
        this.scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    exitAddAudioFlow = () => {
        this.clearSelections();
        this.props.history.push('/home');
    };

    previousStep = () => {
        this.setState(prevState => ({
            activeStep: prevState.activeStep - 1,
        }));
    };

    nextStep = () => {
        this.setState(
            prevState => ({
                activeStep: prevState.activeStep + 1,
            }),
            this.scrollIntoView,
        );
    };

    setNextStepDisabled = (nextStepDisabled: boolean) => {
        this.setState({ nextStepDisabled });
    };

    clearSelections = () => {
        const { setVolume, clearVolumes } = this.props;
        setVolume(null);
        clearVolumes();
    };

    complete = () => {
        const {history, clearUploadStatus} = this.props;
        this.clearSelections();
        clearUploadStatus();
        history.push('/home');
    };

    render() {
        const steps = [
            {
                label: 'Search',
                component: (
                    <BookSearch
                        goToNextStep={this.nextStep}
                        setNextStepDisabled={this.setNextStepDisabled}
                    />
                ),
            },
            {
                label: 'Edit Details',
                component: (
                    <EditDetails
                        setNextStepDisabled={this.setNextStepDisabled}
                    />
                ),
            },
            {
                label: 'Upload',
                component: (
                    <UploadAudio
                        setNextStepDisabled={this.setNextStepDisabled}
                    />
                ),
            },
        ];
        const { classes, isUploading, uploadProgress, uploadComplete } = this.props;
        const { activeStep, nextStepDisabled } = this.state;
        return (
            <div className={classes.root}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((step: { label: string }) => {
                        return (
                            <Step key={step.label}>
                                <StepLabel>{step.label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                <div className={classes.stepControl} ref={this.scrollRef}>
                    {this.state.activeStep === 0 ? (
                        <IconButton onClick={this.exitAddAudioFlow}>
                            <ClearSharpIcon />
                        </IconButton>
                    ) : (
                        <IconButton
                            onClick={this.previousStep}
                            disabled={isUploading || uploadComplete}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                    )}
                    {activeStep !== steps.length - 1 ? (
                        <IconButton
                            disabled={nextStepDisabled}
                            onClick={this.nextStep}
                        >
                            <ArrowForwardIcon />
                        </IconButton>
                    ) : (
                        <IconButton
                            disabled={!uploadComplete}
                            onClick={this.complete}
                        >
                            <DoneAll />
                        </IconButton>
                    )}
                </div>

                <div className={classes.stepContent}>
                    {steps[activeStep].component}
                </div>
            </div>
        );
    }
}

export default withRouter(withStyles(AddAudioStyles)(AddAudio));
