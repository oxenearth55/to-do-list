import { ADD_TODO,
DELETE_TODO,
DONE_LIST,
EDIT_TODO,
UNDONE_LIST,
HISTORY_UPDATE,
CLEAR_HISTORY } from './types';


export const add_todo = (todoList) => dispatch => {
    //NOTE Set Date
    const d = new Date()
    todoList.trigger = 'added';
    todoList.date = d;
    //NOTE Destructuring
    const { text, date, trigger } = todoList;

    dispatch({
        type: ADD_TODO,
        payload: todoList
    })

    dispatch({
        type: HISTORY_UPDATE ,
        payload: {text,date,trigger}
    })

}

export const delete_todo = (uniqe_id, list) => dispatch => {
    list.trigger = 'deleted';
    const { text, date, trigger } = list;
    // const history = list;
    // history.trigger = trigger
    dispatch({
        type: DELETE_TODO,
        payload: {uniqe_id}
    })

    dispatch({
        type: HISTORY_UPDATE ,
        payload: {text,date,trigger}
    })
}

export const done_list = (uniqe_id, list) => dispatch => {
    list.trigger = 'updated to Done'
    const { text, date, trigger } = list;

    dispatch({
        type: DONE_LIST ,
        payload: {uniqe_id, list}
    })

    dispatch({
        type: HISTORY_UPDATE ,
        payload: {text,date,trigger}
    })

}

export const undone_list = (uniqe_id, list) => dispatch => {
    list.trigger = 'updated to Undone'
    const { text, date, trigger } = list;

    dispatch({
        type: UNDONE_LIST ,
        payload: {uniqe_id, list}
    })

    dispatch({
        type: HISTORY_UPDATE ,
        payload: {text,date,trigger}
    })


}

export const edit_list = (uniqe_id, text, oldValue,date) => dispatch => {
    const trigger = 'edited';
    

    dispatch({
        type: EDIT_TODO ,
        payload: {uniqe_id, text }
    })

    dispatch({
        type: HISTORY_UPDATE ,
        payload: {text,date,trigger,oldValue}
    })

}

export const clear_history = () => dispatch => {

    dispatch({
        type: CLEAR_HISTORY
    })
}