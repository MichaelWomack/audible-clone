import { uploadAudio, insertAudioDocument, updateAudio } from '../../store/actions/Audio';
import UploadAudio from './UploadAudio';
import { ReduxState } from '../../model/state';
import { Audio } from '../../model/audio';
import { connect } from 'react-redux';

export const mapStateToProps = (state: ReduxState) => {
    return {
        volume: state.volumes.selectedVolume,
        uploadProgress: state.audio.uploadProgress,
        isUploading: state.audio.isUploading,
        isLoading: state.audio.isLoading,
        uploadTasks: state.audio.uploadTasks,
        createdDocument: state.audio.createdDocument
    };
}

export const mapDispatchToProps = (dispatch: Function) => {
    return {
        addAudio: (audio: Audio) => dispatch(insertAudioDocument(audio)),
        updateAudio: (audio: Audio) => dispatch(updateAudio(audio)),
        uploadAudio: (audio: Audio, files: File[]) => dispatch(uploadAudio(audio, files)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadAudio);