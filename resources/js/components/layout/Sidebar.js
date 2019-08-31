import React, { Component } from 'react';

import TinyNav from '../navigation/TinyNav';
import MainNav from '../navigation/MainNav';

const Sidebar = () => (
    <div className='sidebar-wrapper'>
        <nav>
            {/*<TinyNav />*/}
            <MainNav />
        </nav>
    </div>
)

export default Sidebar;
