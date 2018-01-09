import { connect } from 'react-redux'

import { addImageFile, removeFile, uploadFile } from '../actions'
import UploadComponent from './UploadComponent.js'

const mapStateToProps = (state) => ({
    files: state.files,
})

const mapDispatchToProps = (dispatch) => ({
    onFileAdd: (file) => dispatch(addImageFile(file)),
    onFileDelete: (id) => dispatch(removeFile(id)),
    onUpload: (file) => dispatch(uploadFile(file)),
})

const UploadContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UploadComponent)

export default UploadContainer
