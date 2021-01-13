import React from 'react'
import {connect} from 'react-redux'

const History = ({Todo: {historys} }) => {

    const wasEdited = (oldValue, trigger, newValue) =>(
        <div className="col-12">
                            
            {oldValue} was {trigger} to {newValue}

        </div>
    )


    return (
        <div className="container">
            <h2>Log History</h2>
            <div className="row border p-4">
                {historys.map((list) => 
            
                list.trigger == 'edited' ? wasEdited(list.oldValue, list.trigger, list.text) :
                    <div className="col-12">
                        
                        {list.text} was {list.trigger}

                    </div>
                
                )}
                
            </div>
                

            
        </div>
    )
}
const mapStateToProps = state => ({
    Todo: state.Todo
})

export default connect(mapStateToProps,{})(History)
