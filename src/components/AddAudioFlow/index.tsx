
import { connect } from 'react-redux';
import AddAudioFlow from './AddAudioFlow';
import { clearVolumes, setSelectedVolume } from '../../store/actions/Volumes';
import {
    updateAudio,
    insertAudioDocument,
    uploadAudio,
    clearUploadStatus
} from '../../store/actions/Audio';
import { ReduxState } from '../../model/state';
import { Audio } from '../../model/audio';
import { VolumeInfo } from '../../model/volume';

export const mapStateToProps = (state: ReduxState) => {
    return { //switch to using audio: state.audio
        isUploading: state.audio.isUploading,
        uploadComplete: state.audio.uploadComplete,
        uploadProgress: state.audio.uploadProgress,
        isLoading: state.audio.isLoading,
        uploadTasks: state.audio.uploadTasks,
        createdDocument: state.audio.createdDocument,
    };
}

export const mapDispatchToProps = (dispatch: Function) => {
    return {
        addAudio: (audio: Audio) => dispatch(insertAudioDocument(audio)),
        updateAudio: (audio: Audio) => dispatch(updateAudio(audio)),
        uploadAudio: (audio: Audio, files: File[]) => dispatch(uploadAudio(audio, files)),
        clearUploadStatus: () => dispatch(clearUploadStatus()),
        clearVolumes: () => dispatch(clearVolumes()),
        setVolume: (volume: VolumeInfo) => dispatch(setSelectedVolume(volume))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAudioFlow);