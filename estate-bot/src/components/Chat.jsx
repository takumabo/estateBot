import React from 'react';
import '../assets/styles/index.css';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import noProfile from '../assets/imgs/noProfile.jpg';
import djc from '../assets/imgs/djc.png';

const Chat = (props) =>{

    const isQuestion = (props.type === 'question');

    const classes = isQuestion ? 'p-chat__row' : 'p-chat__reverse'; 


    return (
        <ListItem className={classes}>
        <ListItemAvatar>
            {isQuestion ? (
                <Avatar alt="Icon" src={djc} />
            ):(
                <Avatar alt="Icon" src={noProfile} />
            )}
        </ListItemAvatar>
        <div className="p-chat__bubble">
            {props.text}
        </div>
        </ListItem>
    )
}
export default Chat;