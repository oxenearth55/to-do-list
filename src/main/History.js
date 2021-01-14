import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {clear_history, clear_search} from '../action/todoAction'
import Moment from 'react-moment'
import Scroll from '../components/Scroll'

const History = ({Todo: {historys}, clear_history, clear_search }) => {
    //NOTE clear search to prevent conflict in home page
    useEffect(() => {
        clear_search();
    },[])

    //SECTION HTML
    const wasEdited = (oldValue, trigger, newValue, date) =>(
        <div className="col-12">
            <p>  
                <Moment format='DD/MMM/YYYY/hh:mm:ss'>{date}</Moment>&nbsp; &nbsp; &nbsp;
                <span className="red-text">[{trigger}]:</span>  &nbsp;
                <span className="blue-text">{oldValue} </span> was <span className="orange-text">{trigger}</span> to  <span className="pink-text">{newValue}</span>  
            </p>  
        </div>
    )

    //SECTION Render
    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between">
            <h2>Log History</h2>
            <button onClick={() => clear_history()} type="button" className="btn btn-danger">Clear</button>
            </div>

            <Scroll>
            <div className="row border p-4">
                {historys.map((history) =>     
                history.trigger === 'edited' ? wasEdited(history.oldValue, history.trigger, history.text, history.date) :
                    <div className="col-12">
                         <p>
                            <Moment format='DD/MMM/YYYY/hh:mm:ss'>{history.date}</Moment>&nbsp; &nbsp; &nbsp;
                            <span className="red-text">[{history.trigger}]:</span>  &nbsp;
                            <span className="blue-text">{history.text} </span> was <span className="orange-text">{history.trigger}</span>
                        </p>
                    </div>
                )}
            </div>
            </Scroll>

        </div>
    )
}
const mapStateToProps = state => ({
    Todo: state.Todo
})

export default connect(mapStateToProps,{clear_history, clear_search})(History)
