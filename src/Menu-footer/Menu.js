import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
    return (
        <div className=" container-fluid Menu py-3">
            <div className="row">
                <div className="col-12 text-center">
                    <Link className="mx-3" to='/'>Home</Link>
                    <Link className="mx-3" to='/history'>History</Link>        
                </div>
            </div>
        </div>
    )
}

export default Menu
