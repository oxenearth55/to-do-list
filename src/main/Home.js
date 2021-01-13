import React, { useState } from 'react'
import { connect } from 'react-redux'
import {add_todo} from '../action/todoAction'
import DisplayLists from '../components/DisplayLists'
import { v4 as uuidv4 } from 'uuid';


const Home = ({add_todo}) => {
    const [todoList, setTodoList] = useState({
        id: uuidv4(),
        text:'',
        date:'',
        trigger:'',
        status:'undone',
        oldValue:''
    })


    const handelChange = name => e => {
        setTodoList({...todoList, [name] : e.target.value })
    }
    const addTodo = e => {

        e.preventDefault(); 
        //NOTE call action method
        add_todo(todoList)
        // NOTE After add todo, clear input
        setTodoList({text:'', date:'', id: uuidv4()})


    }

    const formInput = () =>
    <div className="form-input">
        <form onSubmit={addTodo} className="row">
            <div className="col-12 text-center">
                <h3>Add Your To-do-List</h3>
                <input value={todoList.text} onChange={handelChange('text')} type="text" placeholder="add here"/>
                <button type='submit' className="">Add</button>
            </div>      
        </form>
    </div>


    return (
        <div className ="container mt-5">
           {formInput()}
           <DisplayLists/>
                    
        </div>
    )
}


export default  connect(null, {add_todo}) (Home)