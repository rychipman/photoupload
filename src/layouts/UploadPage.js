import { connect } from 'react-redux'
import UploadLayout from './UploadLayout.js'
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

const UploadPage = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UploadLayout)

export default UploadPage
