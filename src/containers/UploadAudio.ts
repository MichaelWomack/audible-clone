import { uploadAudio, insertAudioDocument, updateAudio } from '../store/actions/Audio';
import UploadAudio from '../components/UploadAudio';
import { ReduxState } from '../model/state';
import { Audio } from '../model/audio';
import { connect } from 'react-redux';

export const mapStateToProps = (state: ReduxState) => {
    return {
        volume: state.volumes.selectedVolume,
        uploadProgress: state.audio.uploadProgress,
        isUploading: state.audio.isUploading,
        isLoading: state.audio.isLoading,
        uploadTask: state.audio.uploadTask,
        createdDocument: state.audio.createdDocument
    };
}

export const mapDispatchToProps = (dispatch: Function) => {
    return {
        addAudio: (audio: Audio) => dispatch(insertAudioDocument(audio)),
        updateAudio: (audio: Audio) => dispatch(updateAudio(audio)),
        uploadAudio: (audio: Audio, file: File) => dispatch(uploadAudio(audio, file)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadAudio);