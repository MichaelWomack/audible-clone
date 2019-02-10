import BookSearch from '../components/BookSearch';
import { setSelectedVolume, searchBooks } from '../store/actions/Volumes';
import { ReduxState } from '../model/state';
import { connect } from 'react-redux';
import { VolumeInfo } from '../model/volume';


export const mapStateToProps = (state: ReduxState) => {
    return {
        isLoading: state.volumes.isLoading,
        volumes: state.volumes.volumes
    };
};

export const mapDispatchToProps = (dispatch: Function) => {
    return {
        selectVolume: (volume: VolumeInfo) => dispatch(setSelectedVolume(volume)),
        searchBooks: (query: string) => dispatch(searchBooks(query))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookSearch);