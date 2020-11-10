import React,{useState,useEffect,useCallback} from 'react';
import './assets/styles/style.css';

import { Answers,Chats } from './components/index';
import FormDialog from './components/Forms/FormDialog';
import { db } from './firebase/index';

const App = () => {
  const[ answers,setAnswers] = useState([]);
  const[ chats,setChats] = useState([]);
  const[ currentId,setCurrentId] = useState("init");
  const[ dataset,setDataset] = useState({});
  const[ open,setOpen] = useState(false);


  const displayNextQuestion = (nextQuestionId,nextDataset) =>{
    addChat({
      text: nextDataset.question,
      type: 'question'
    })

      setAnswers(nextDataset.answers)
      setCurrentId(nextQuestionId)
  }


  const selectAnswer = (selectedAnswer,nextQuestionId) => {
    switch(true){
      case(/^https:*/.test(nextQuestionId)):
        const a = document.createElement('a');
        a.href = nextQuestionId;
        a.target = '_blank';
        a.click();
        break;

      case(nextQuestionId === 'contact'):
        handleClickOpen()
        break;

      default:
        addChat({
          text: selectedAnswer,
          type: 'answer'
        });

        setTimeout(() => displayNextQuestion(nextQuestionId,dataset[nextQuestionId]),1000);
        break;

    }
  }

  const addChat = (chat) => {
    setChats(prevChats => {
      return [...prevChats,chat]
    })
  }

  const handleClickOpen = () => {
    setOpen(true);
 };

  const handleClose = useCallback(() => {
    setOpen(false);
 },[setOpen]);


  useEffect(() => {
    (async()=>{
      const initDataset = {};
      await db.collection('questions').get().then((snapshot)=>{
        snapshot.forEach((doc)=>{
          const id = doc.id;
          const data = doc.data();
          initDataset[id] = data;
        })
      })
      setDataset(initDataset);
      displayNextQuestion(currentId,initDataset[currentId])

    })()
  },[])


  useEffect(()=>{
    const scrollArea = document.getElementById('scroll-area');
    if(scrollArea){
      scrollArea.scrollTop = scrollArea.scrollHeight
    }
  })

    return (
      <section className="c-section">
        <div className="c-box">
          <Chats chats={chats} />
          <Answers answers={answers} select={selectAnswer} />
          <FormDialog open={open} handleClose={handleClose} />
        </div>
      </section>
  );
}


export default App;
