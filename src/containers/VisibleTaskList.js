import { connect } from 'react-redux'
import { removeTask } from '../actions/'
import TaskList from '../components/TaskList'

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => (
    {
        onTodoClick: id => dispatch(removeTask(id))
    }
);

const VisibleTaskList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskList)

export default VisibleTaskList
