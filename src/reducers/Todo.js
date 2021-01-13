
import { 
    ADD_TODO,
    DONE_LIST,
    DELETE_TODO,
    EDIT_TODO,
    UNDONE_LIST,
    HISTORY_UPDATE,
    CLEAR_HISTORY


} from '../action/types';
const initialState = {
    historys:[],
    lists: [],
    doneLists: []

}

export default function(state = initialState, action){
    const { type, payload } = action;
    switch(type){

        case ADD_TODO: 
            return {
                ...state,
                lists: [...state.lists, payload],
                // historys: [...state.historys, payload]

            }
        case DELETE_TODO: 
            return {
                ...state, 
                // historys: [...state.historys, payload], 
                lists: state.lists.filter(list => list.id !== payload.uniqe_id),
                doneLists: state.doneLists.filter(doneList => doneList.id !== payload.uniqe_id),
                
            }
        // SECTION Remove list from undone to done list
        case DONE_LIST: 
            return {
                ...state, 
                //NOTE Bring list that doesn't match out from lists
                lists: state.lists.filter(list => list.id !== payload.uniqe_id),
                //NOTE Add playload to doneLists
                doneLists: [...state.doneLists, payload.list]

            }

        // SECTION Remove list from done to undone list
        case UNDONE_LIST: 
            return {
                ...state, 
                //NOTE Bring doneList that doesn't match out from doneLists
                doneLists: state.doneLists.filter(doneList => doneList.id !== payload.uniqe_id),
                 //NOTE Add payload to lists
                lists: [...state.lists, payload.list]

            }

            //NOTE Use foreach to loop and match id between payload and state
            case EDIT_TODO: 
                return {
                    ...state, 
                  
                    lists: state.lists.map(list => list.id === payload.uniqe_id ? 
                        {...list, text:payload.text, oldValue:payload.oldValue} : list ),
                    
                        doneLists: state.doneLists.map(doneList => doneList.id === payload.uniqe_id ?    
                    {...doneList, text:payload.text, oldValue:payload.oldValue} : doneList ),
                    



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

            default: 
            return state;
        }

}