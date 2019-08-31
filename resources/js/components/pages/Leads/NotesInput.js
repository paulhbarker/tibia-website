import React from 'react';

const NotesInput = props => {
    return (
        <form onSubmit={e => props.onSubmit(e)}>
            <input
                type={'text'}
                className={'notes-input'}
                autoFocus={true}
                onBlur={e => props.onBlur(e)}
                onChange={e => props.onChange(e)}
                value={props.value}
            />
        </form>
    );
};

export default NotesInput;
