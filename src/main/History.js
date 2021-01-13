import React from 'react'
import {connect} from 'react-redux'
import {clear_history} from '../action/todoAction'

const History = ({Todo: {historys}, clear_history }) => {

    const wasEdited = (oldValue, trigger, newValue) =>(
        <div className="col-12">
                            
            {oldValue} was {trigger} to {newValue}

        </div>
    )


    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between">
            <h2>Log History</h2>
            <button onClick={() => clear_history()} type="button" className="btn btn-danger">Clear</button>
            </div>

            <div className="row border p-4">
                {historys.map((history) => 
            
                history.trigger == 'edited' ? wasEdited(history.oldValue, history.trigger, history.text) :
                    <div className="col-12">
                         <p>
                       <span className="blue-text">{history.text} </span> was <span className="orange-text">{history.trigger}</span>
                        </p>

                    </div>
                
                )}
                
            </div>
                

            
        </div>
    )
}
const mapStateToProps = state => ({
    Todo: state.Todo
})

export default connect(mapStateToProps,{clear_history})(History)
