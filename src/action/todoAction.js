import { ADD_TODO,
DELETE_TODO,
DONE_LIST,
EDIT_TODO,
UNDONE_LIST,
HISTORY_UPDATE,
CLEAR_HISTORY,
SEARCH_UNDONE,
SEARCH_DONE,
CLEAR_SEARCH

} from './types';

// SECTION Create
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
// SECTION Delete
export const delete_todo = (uniqe_id, list) => dispatch => {
    //NOTE Set Date for history
    const date = new Date()
    list.trigger = 'deleted';
    const { text, trigger } = list;
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

// SECTION Update to done
export const done_list = (uniqe_id, list) => dispatch => {
    //NOTE Set Date 
    const date = new Date()
    list.trigger = 'updated to Done'
    const { text, trigger } = list;

    dispatch({
        type: DONE_LIST ,
        payload: {uniqe_id, list}
    })

    dispatch({
        type: HISTORY_UPDATE ,
        payload: {text,date,trigger}
    })

}
// SECTION Update to undone
export const undone_list = (uniqe_id, list) => dispatch => {
    //NOTE Set Date 
    const date = new Date()
    list.trigger = 'updated to Undone'
    const { text, trigger } = list;

    dispatch({
        type: UNDONE_LIST ,
        payload: {uniqe_id, list}
    })

    dispatch({
        type: HISTORY_UPDATE ,
        payload: {text,date,trigger}
    })


}
// SECTION Edit List
export const edit_list = (uniqe_id, text, oldValue) => dispatch => {
    const trigger = 'edited';
    //NOTE Set Date 
    const date = new Date()

    dispatch({
        type: EDIT_TODO ,
        payload: {uniqe_id, text }
    })

    dispatch({
        type: HISTORY_UPDATE ,
        payload: {text,date,trigger,oldValue}
    })

}
// SECTION Clear history
export const clear_history = () => dispatch => {
    dispatch({
        type: CLEAR_HISTORY
    })
}

// SECTION Handle search
export const search_Change = (input, listen) => dispatch => {
    if(listen === 'undone'){
        dispatch({
            type: SEARCH_UNDONE,
            payload: input
        })
    }else if(listen === 'done'){
        dispatch({
            type: SEARCH_DONE,
            payload: input
        })

    }
}

// SECTION Clear search 
export const clear_search = () => dispatch =>{
    dispatch({
        type: CLEAR_SEARCH
    })
}