import React from 'react';
import s from './../Dialogs.module.css';

type Props = {
    message: string
}

const Message: React.FC<Props> = (props) => {
    return <div className={s.dialog}>{props.message}</div>
}

export default Message;