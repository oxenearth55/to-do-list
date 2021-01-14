import React, { useState } from 'react'
//SECTION REDUX
import { connect } from 'react-redux'
import {add_todo, search_Change} from '../action/todoAction'
//SECTION Components
import DisplayLists from '../components/DisplayLists'
//SECTION Others 
import { v4 as uuidv4 } from 'uuid'


const Home = ({add_todo, search_Change}) => {
    //SECTION State
    //NOTE set state of to-do-list
    const [todoList, setTodoList] = useState({
        id: uuidv4(), //NOTE generate random Id for eact list
        text:'', 
        date:'',
        trigger:'', //NOTE used to listen a trigger (update status, edit, delete)
        oldValue:'' //NOTE used to display in history log for update status trigger
    })
    //NOTE Destructuring
    const {text} = todoList;

    //SECTION Methods
    const handelChange = name => e => {
        setTodoList({...todoList, [name] : e.target.value })
    }
    //NOTE used to update search in redex store
    const handleSearch = listen => e => {
        search_Change(e.target.value, listen)        
    }
    //NOTE call action
    const addTodo = e => {
        e.preventDefault(); 
        //NOTE call action method
        if(text !== ''){
        add_todo(todoList)
        }
        // NOTE After add todo, clear input
        setTodoList({text:'', date:'', id: uuidv4()})
    }

    //SECTION HTML
    const formInput = () =>
    <div className="form-input">
        <form onSubmit={addTodo} className="row">
            <div className="col-12 text-center">
                <h3>Add Your To-do-List</h3>
                <input value={text} onChange={handelChange('text')} type="text" placeholder="add here"/>
                <button type='submit' className="">Add</button>
            </div>      
        </form>
    </div>

    //SECTION Render
    return (
        <div className ="container mt-5">
           {formInput()}
            <DisplayLists handleSearch={handleSearch}/>
        </div>
    )
}


export default  connect(null, {add_todo, search_Change}) (Home)