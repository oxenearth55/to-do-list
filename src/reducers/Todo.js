
import { 
    ADD_TODO,
    DONE_LIST,
    DELETE_TODO,
    EDIT_TODO,
    UNDONE_LIST,
    HISTORY_UPDATE,
    CLEAR_HISTORY,
    SEARCH_DONE,
    SEARCH_UNDONE,
    CLEAR_SEARCH

} from '../action/types';
const initialState = {
    historys:[], //NOTE to handle history log
    lists: [], //NOTE defalut list after adding
    doneLists: [], //NOTE when the list was updated to undone
    search_undone:'', //NOTE used to handle search
    search_done:'',
}

export default function(state = initialState, action){
    const { type, payload } = action;
    switch(type){
        // SECTION Add list
        case ADD_TODO: 
            return {
                ...state,
                lists: [...state.lists, payload],
                // historys: [...state.historys, payload]

            }
        // SECTION Delete list
        case DELETE_TODO: 
            return {
                ...state, 
                //NOTE create new array that match condition 
                // So the list that a user selected(delete) will not be included in a new array
                lists: state.lists.filter(list => list.id !== payload.uniqe_id), 
                doneLists: state.doneLists.filter(doneList => doneList.id !== payload.uniqe_id),
                
            }
        // SECTION Update list from undone to done list
        case DONE_LIST: 
            return {
                ...state, 
                //NOTE create new array that match condition (remove from undone)
                lists: state.lists.filter(list => list.id !== payload.uniqe_id),
                //NOTE Add playload to doneLists (add that list to done)
                doneLists: [...state.doneLists, payload.list]
            }

        // SECTION Update list from done to undone list
        case UNDONE_LIST: 
            return {
                ...state, 
                //NOTE create new array that match condition (remove from done)
                doneLists: state.doneLists.filter(doneList => doneList.id !== payload.uniqe_id),
                 //NOTE Add payload to lists (add that list to undone)
                lists: [...state.lists, payload.list]

            }
        //SECTION Edit
        case EDIT_TODO: 
            return {
                ...state, 
                //NOTE Use map to loop and match id between payload and state
                // To find a list that a user want to edit
                lists: state.lists.map(list => list.id === payload.uniqe_id ? 
                    {...list, text:payload.text} : list ),
                    
                doneLists: state.doneLists.map(doneList => doneList.id === payload.uniqe_id ?    
                    {...doneList, text:payload.text} : doneList ),
                    
            }

            //SECTION Add trigger into historys to display log on history page
            case HISTORY_UPDATE: 
                return {
                    ...state,
                    historys: [payload, ...state.historys], //ANCHOR payload contains text, trigger, date or oldValue from edi_todo
                 }

            //SECTION Clear history log 
            case CLEAR_HISTORY: 
                return {
                    ...state,
                    historys:[]
                }

            //SECTION search
            //NOTE store user's input
            case SEARCH_UNDONE:
                return{
                    ...state,
                    search_undone: {search_undone:payload}
                }
            case SEARCH_DONE:
                return{
                    ...state,
                    search_done: {search_done:payload}
                }

            case CLEAR_SEARCH:
                return{
                        ...state,
                        search_undone: '',
                        search_done: ''
                }
            default: 
            return state;
        }

}