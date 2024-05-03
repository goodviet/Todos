import React from 'react';

const Navigation = () => {

    return (
        <div>
            <ul >
                <li>
                    <a className="active">
                        Todo
                    </a>
                </li>
                <li>
                    <a>News</a>
                </li>
                <li>
                    <a>Contact</a>
                </li>
                <li>
                    <a>About</a>
                </li>
            </ul>

        </div>

    );
};


export default Navigation;