import { connect } from 'react-redux'

import { addFile, removeFile } from '../actions'
import UploadComponent from './UploadComponent.js'

const mapStateToProps = (state) => ({
    files: state.files,
})

const mapDispatchToProps = (dispatch) => ({
    onFileDelete: (id) => dispatch(removeFile(id)),
    onFileAdd: (filename) => dispatch(addFile(filename)),
})

const UploadContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UploadComponent)

export default UploadContainer
