import React from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className='bg-gray-800 p-5 flex justify-between w-full'>
            <p>Navbar</p>
            <Link to="/add-product">Add Product</Link>
        </div>
    )
}

export default Navbar
