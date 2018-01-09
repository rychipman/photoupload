import { connect } from 'react-redux'

import { addFile, removeFile } from '../actions'
import UploadComponent from './UploadComponent.js'

const mapStateToProps = (state) => ({
    files: state.files,
})

const mapDispatchToProps = (dispatch) => ({
    onFileAdd: (file) => {
        let reader = new FileReader()
        reader.onload = (ev) => dispatch(addFile(file.name, ev.target.result))
        reader.readAsDataURL(file)
    },
    onFileDelete: (id) => dispatch(removeFile(id)),
})

const UploadContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UploadComponent)

export default UploadContainer
