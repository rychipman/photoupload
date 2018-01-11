import { connect } from 'react-redux'
import UploadComponent from './UploadComponent.js'
import {
    addFile,
    removeFile,
    uploadFile,
    dismissFileSuccess,
    toggleUploadedList,
    toggleFailedList,
    toggleQueuedList,
} from '../actions'

const mapStateToProps = (state) => ({
    files: state.files,
    uploadedListOpen: state.ui.uploads.lists.uploaded,
    queuedListOpen: state.ui.uploads.lists.queued,
    failedListOpen: state.ui.uploads.lists.failed,
})

const mapDispatchToProps = (dispatch) => ({
    onFileAdd: (file) => dispatch(addFile(file)),
    onFileDelete: (id) => dispatch(removeFile(id)),
    onUpload: (files) => files.map(f => dispatch(uploadFile(f.id, f.data))),
    onDismiss: (id) => dispatch(dismissFileSuccess(id)),

    uploadedListToggle: () => dispatch(toggleUploadedList()),
    failedListToggle: () => dispatch(toggleFailedList()),
    queuedListToggle: () => dispatch(toggleQueuedList()),
})

const UploadContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UploadComponent)

export default UploadContainer
