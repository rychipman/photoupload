import { connect } from 'react-redux'
import UploadLayout from './UploadLayout.js'
import {
    addFile,
} from '../actions'

const mapStateToProps = (state) => ({
    files: state.files,
})

const mapDispatchToProps = (dispatch) => ({
    onFileAdd: (file) => dispatch(addFile(file)),
})

const UploadPage = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UploadLayout)

export default UploadPage
