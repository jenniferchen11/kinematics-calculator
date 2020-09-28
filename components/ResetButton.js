import React from 'react';

const ResetButton = (props) => { //props are things that are passed through from the parents
    return (
        <button onClick = {() => props.resetData()} className = "Reset-button">
            {'Reset All'}
        </button>
    ) //props.title is passed through from App.js
}

export default ResetButton;