import React, { FunctionComponent } from 'react';
import { useNavigate } from "react-router-dom";
import './style.css';

const NotFound: FunctionComponent = () => {

    const navigate = useNavigate();

    return(
        <div className='not-found'>
            <h3>Error <span>404</span></h3>
            <h5>Pagína no encontrada</h5>
            <button className='button-not-found' onClick={() =>  navigate('/energy/')}> Home </button>
        </div>
    )
}

export default NotFound;