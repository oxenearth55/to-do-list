import React, {useState, useEffect ,Fragment} from 'react'
import {connect} from 'react-redux'
import { delete_todo, done_list, undone_list, edit_list } from '../action/todoAction'

const Card = ({uniqe_id, list, delete_todo, done_list, undone_list, default_list, edit_list }) => {
    // SECTION State
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState('');
    const [oldValue, setOldValue] = useState('')

    //SECTION State Life cycle
    useEffect(() => {
        console.log('useEffect work');
        //NOTE we have to set the current value in side input field
        setText(list.text);
        setOldValue(list.text);
        //NOTE Must listen to edit state to update text value after close editing
    },[edit])

    //SECTION Methods
    const handelChange = e => {
        setText(e.target.value);
        // console.log(text)
    }

    const editSubmit = e => {
        e.preventDefault(); 
        //NOTE text must have input (not empty) and not the same as old value 
        if(text !== '' && text !== oldValue){
            edit_list(uniqe_id, text,oldValue );
            setEdit(false);
        }
    }
    // SECTION HTML
    //NOTE used to display edit form
    const edit_form = () => (
        <form onSubmit={editSubmit}>
            <div className="col-8">
                <div className="d-flex edit">
                    <div className="col-">
                        <input value={text} onChange={handelChange} type="text"/>
                    </div>

                    <div>
                        <button type="submit" className=" btn-primary mx-1 ">Edit</button>
                    </div>

                    <div>
                        <button onClick={() => setEdit(false)} type="button" className=" btn-danger mx-1 ">Close</button>
                    </div>
                </div>
            
            </div>

        </form>
    )

    return (
        <div className="card border col-4 p-3 ">
            <div className="row">
                {!edit ? <Fragment>
                <div className="col-8">
                    {list.text}                 
                </div> 
                <div className="col-4 todo-action">
                    {/* NOTE default means undone list */}
                    {default_list ? <i onClick={() => done_list(uniqe_id, list)} className="fas fa-check green-text mx-2"></i>
                    : 
                    <i onClick={() => undone_list(uniqe_id, list)} class="fas fa-times red-text"></i>
                    }
                    <i onClick={() => setEdit(true)} className="fas fa-edit orange-text mx-2"></i>
                    <i onClick={() => delete_todo(uniqe_id, list)} className="fas fa-trash red-text mx-2"></i>
                </div>
                </Fragment>

                : edit_form()}

            </div>
    
        </div>
    )
      
}

export default connect(null, {delete_todo, done_list, undone_list, edit_list}) (Card)
