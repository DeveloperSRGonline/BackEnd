import React from 'react'
import "../styles/Navbar.css";

const Navbar = () => {
    return (
        <div className="nav">
            <div className="logo">
                <h3><i>Shivam</i></h3>
            </div>
            <div className="menu">
                <img src="/images/menu.svg" alt="" />
            </div>
        </div>
    )
}

export default Navbar