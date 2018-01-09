import { ADD_TASK, REMOVE_TASK } from '../actions';

const initialState = {
    last_id: 3,
    tasks: [
        {
            text: 'this is an example task',
            id: 1,
        },
        {
            text: 'add my own task',
            id: 2,
        },
        {
            text: 'delete this task',
            id: 3,
        }
    ]
}

export const todoApp = (state=initialState, action) => {
    switch (action.type) {
        case ADD_TASK:
            let id = state.last_id + 1;
            return Object.assign({}, state, {
                last_id: id,
                tasks: [
                    ...state.tasks,
                    {
                        text: action.text,
                        id: id
                    }
                ]
            })
        case REMOVE_TASK:
            return Object.assign({}, state, {
                tasks: state.tasks.filter((task) => task.id !== action.id)
            })
        default:
            return state
    }
}
