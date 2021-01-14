import React, { Fragment} from 'react'
import Card from './Card'
import {connect} from 'react-redux'

const DisplayLists = ({Todo:{lists, doneLists, search_undone, search_done}, handleSearch}) => {

    //SECTION Methods 
    //NOTE Filter lists base on search
    const filtered_undone  = lists.filter(list => {
        //NOTE Prevent undefined
        if(search_undone !== ''){
        // NOTE Return new array base on search state
        return list.text.toLowerCase().includes(search_undone.search_undone.toLowerCase()); 
        }else{
            // NOTE if a user doesn't input anything then, return original list
            return lists 
        }
    })

    const filtered_done  = doneLists.filter(list => {
        //NOTE Prevent undefined
        if(search_done !== ''){
        return list.text.toLowerCase().includes(search_done.search_done.toLowerCase()); 
        }else{
            return doneLists
        }
    })


    //SECTION HTML
    const undone_lists = () => 
        <div className="mt-5 border p-3">
            <h3 className="text-center border-bottom">Undone list</h3>
            <input className='p-1 mb-4' type='search' placeholder='search list' onChange={handleSearch('undone')}/>
            <div className="row">
                    {/* NOTE default_list = true means undone list */}
                    {filtered_undone.map(list => <Card uniqe_id={list.id} list={list} default_list={true}/>)}
            </div>
        </div>

    
    const done_lists = () => 
        <div className="mt-5 border p-3">
            <h3 className="text-center border-bottom">Done list</h3>
            {/* NOTE parameter inside handleSearch(listener) is used to tell the action that which type that we are going to use */}
            <input className='p-1 mb-4' type='search' placeholder='search list' onChange={handleSearch('done')}/>
            <div className="row">
                {/* NOTE default_list = false means done list */}
                {filtered_done.map(doneLists => <Card uniqe_id={doneLists.id} list={doneLists} default_list={false}/>)}
            </div>
        </div>

    
    
    //SECTION Render
    return (
        <Fragment>
            {undone_lists()}
            {done_lists()}
        </Fragment>
        

      
    )
}

const mapStateToProps = state => ({
    Todo: state.Todo

})

export default connect(mapStateToProps) (DisplayLists)
