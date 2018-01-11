import { connect } from 'react-redux'
import UploadComponent from './UploadComponent.js'
import {
    addFile,
    removeFile,
    uploadFile,
    dismissFileSuccess,
} from '../actions'

const mapStateToProps = (state) => ({
    files: state.files,
})

const mapDispatchToProps = (dispatch) => ({
    onFileAdd: (file) => dispatch(addFile(file)),
    onFileDelete: (id) => dispatch(removeFile(id)),
    onUpload: (files) => files.map(f => dispatch(uploadFile(f.id, f.data))),
    onDismiss: (id) => dispatch(dismissFileSuccess(id)),
})

const UploadContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UploadComponent)

export default UploadContainer
