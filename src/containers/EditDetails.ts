import EditDetails from '../components/EditDetails';
import { ReduxState } from '../model/state';
import { connect } from 'react-redux';
import { VolumeInfo } from '../model/volume';
import { setSelectedVolume } from '../store/actions/Volumes';

const mapStateToProps = (state: ReduxState) => {
    return {
        volume: state.volumes.selectedVolume,
    };
};

const mapDispatchToProps = (dispatch: Function) => {
    return {
        setSelectedVolume: (volume: VolumeInfo) => dispatch(setSelectedVolume(volume))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EditDetails);
