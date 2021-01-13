import React, { useState ,Fragment} from 'react'
import Card from './Card'
import {connect} from 'react-redux'

const DisplayLists = ({Todo:{lists, doneLists}}) => {
    const default_lists = () => 
        <div className="mt-5 border p-3">
            <h3 className="text-center border-bottom">Undone list</h3>
            <div className="row">
                    {lists.map(list => <Card uniqe_id={list.id} list={list} default_list={true}/>)}
            </div>
        </div>

    
    const done_list = () => 

        <div className="mt-5 border p-3">
            <h3 className="text-center border-bottom">Done list</h3>
            <div className="row">
                    {doneLists.map(doneLists => <Card uniqe_id={doneLists.id} list={doneLists} default_list={false}/>)}
            </div>
        </div>

    
    

    return (
        <Fragment>
            {default_lists()}
            {done_list()}
        </Fragment>
        

      
    )
}

const mapStateToProps = state => ({
    Todo: state.Todo

})

export default connect(mapStateToProps) (DisplayLists)
