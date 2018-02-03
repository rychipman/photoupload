import { connect } from 'react-redux'
import UploaderComponent from './UploaderComponent.js'
import {
    addFile,
    toggleUploadedList,
    toggleFailedList,
    toggleQueuedList,
} from '../actions'

const mapStateToProps = (state) => ({
    files: state.files,
    showUploaded: state.ui.uploads.lists.uploaded,
    showInProgress: state.ui.uploads.lists.queued,
    showFailed: state.ui.uploads.lists.failed,
})

const mapDispatchToProps = (dispatch) => ({
    onFileAdd: (file) => dispatch(addFile(file)),
    uploadedListToggle: () => dispatch(toggleUploadedList()),
    failedListToggle: () => dispatch(toggleFailedList()),
    inProgressListToggle: () => dispatch(toggleQueuedList()),
})

const UploaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UploaderComponent)

export default UploaderContainer
