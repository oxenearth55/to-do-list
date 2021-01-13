import React, {useState, useEffect ,Fragment} from 'react'
import {connect} from 'react-redux'
import { delete_todo, done_list, undone_list, edit_list } from '../action/todoAction'
import Moment from 'react-moment'

const Card = ({uniqe_id, list, delete_todo, done_list, undone_list, default_list, edit_list }) => {
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState('');
    const [oldValue, setOldValue] = useState('')

    useEffect(() => {
        console.log('useEffect work');
        setText(list.text);
        setOldValue(list.text);
//NOTE Must listen to edit state to update text value after close editing
    },[edit])

    const handelChange = e => {
        setText(e.target.value);

        console.log(text)
    }

    const editSubmit = e => {
        e.preventDefault(); 
        edit_list(uniqe_id, text,oldValue,list.date );
        setEdit(false);
    }

    const edit_form = () => (
        <form onSubmit={editSubmit}>
            <div className="col-8">
                <div className="d-flex">
                    <div className="col-">
                        <input value={text} onChange={handelChange} type="text"/>
                    </div>

                    <div className="test col- mx-">
                        <button type="submit" className=" btn-primary mx-1 ">Edit</button>
                    </div>

                    <div className="test col- mx-">
                        <div onClick={() => setEdit(false)} type="button" className=" btn-danger mx-1 ">Close</div>
                    </div>


                  

                </div>
               

            </div>

        </form>
    )

    return (
        <div className="card border col-4 p-3 ">
            <div className="row">
                {!edit ? <Fragment>
                <div className="col-6">
                    {list.text}                 
                </div> 
                <div className="col-4 todo-action">
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
