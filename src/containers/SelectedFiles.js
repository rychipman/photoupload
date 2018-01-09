import { connect } from 'react-redux'

import { removeFile } from '../actions'
import FileList from '../components/FileList'

const mapStateToProps = (state) => ({
    files: state.files,
})

const mapDispatchToProps = (dispatch) => ({
    onFileDelete: (id) => dispatch(removeFile(id)),
})

const SelectedFiles = connect(
    mapStateToProps,
    mapDispatchToProps,
)(FileList)

export default SelectedFiles
