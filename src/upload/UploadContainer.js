import { connect } from 'react-redux'

import { addImageFile, removeFile } from '../actions'
import UploadComponent from './UploadComponent.js'

const mapStateToProps = (state) => ({
    files: state.files,
})

const mapDispatchToProps = (dispatch) => ({
    onFileAdd: (file) => dispatch(addImageFile(file)),
    onFileDelete: (id) => dispatch(removeFile(id)),
})

const UploadContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UploadComponent)

export default UploadContainer
