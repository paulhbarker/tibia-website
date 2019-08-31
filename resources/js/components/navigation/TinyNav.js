import React from 'react';
import { Link } from 'react-router-dom';
import Plus from '../icons/Plus';
import Search from '../icons/Search';
import Brandmark from '../icons/Brandmark';
import Cog from '../icons/Cog';

const TinyNav = () => {
    return (
        <div className='tiny-nav-wrapper'>
            <div className='tiny-nav'>
                <div className='top'>
                    <Link to="/">
                        <Brandmark />
                    </Link>
                    <div className='buttons'>
                        <button onClick={() => alert()}>
                            <Search />
                        </button>
                        <button onClick={() => alert()}>
                            <Plus />
                        </button>
                    </div>
                </div>
                <div className='bottom'>
                    <div className='buttons'>
                        <button onClick={() => alert()}>
                            <Cog />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TinyNav;
