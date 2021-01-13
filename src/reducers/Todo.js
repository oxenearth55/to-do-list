
import { 
    ADD_TODO,
    DONE_LIST,
    DELETE_TODO,
    EDIT_TODO,
    UNDONE_LIST,
    HISTORY_UPDATE


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
        case DONE_LIST: 
            return {
                ...state, 
                lists: state.lists.filter(list => list.id !== payload.uniqe_id),
                doneLists: [...state.doneLists, payload.list],


            }

            case HISTORY_UPDATE: 
                return {
                    ...state,
                    historys: [...state.historys, payload], //ANCHOR
                }

            case UNDONE_LIST: 
            return {
                ...state, 
                doneLists: state.doneLists.filter(doneList => doneList.id !== payload.uniqe_id),
                lists: [...state.lists, payload.list]

            }

            //NOTE Use foreach to loop and match id between payload and state
            case EDIT_TODO: 
                return {
                    ...state, 
                  
                    lists: state.lists.map(list => list.id === payload.uniqe_id ? 
                        {...list, text:payload.text, trigger:payload.trigger, oldValue:payload.oldValue} : list ),
                    
                        doneLists: state.doneLists.map(doneList => doneList.id === payload.uniqe_id ?    
                    {...doneList, text:payload.text, trigger:payload.trigger, oldValue:payload.oldValue} : doneList ),
                    
                    historys: [...state.historys, payload]



                }

            default: 
            return state;
        }

}