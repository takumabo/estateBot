import React from 'react';
import { makeStyles,createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() =>
 createStyles({
     "button":{
         width: "100%",
         border: "1px solid #0E54CF",
         color: "#0E54CF",
         fontWeight: 600,
         marginBottom: "8px",
         "&:hover":{
             backgroundColor: "#0E54CF",
             color:"#fff"
         }
     },

 })
);

const Answer = (props) =>{

   const classes = useStyles();

    return(
        <div>
            <Button className={classes.button} onClick={() => props.select(props.content,props.nextId)}>
                {props.content}
            </Button>
        </div>
    )
}

export default Answer;