// import Image from 'next/image'
// import styles from './page.module.css'
'use client';
import styles from './new.module.css';
import Profile from './Profile'
import React from 'react'
import axios from 'axios'
import { get } from 'http';
export default function Home() {
    
    const [start,setStart]=React.useState(false);
    const [ans,setAns]=React.useState();
    const[data,setData]=React.useState();
    const [ques,setQues]=React.useState([]);
    const [score,setScore]=React.useState(0);
    const [curr,setCurr]=React.useState(0);
    React.useEffect(() => {
       getData();
    }, []);
    const startgame=()=>{
        setCurr(0);
        setScore(0);
        for(let i=0;i<5;i++){
            let random=Math.floor(Math.random()*data.length);
            setQues(qq =>[...qq, {q:data[random].country,a:data[random].capital}]);
        }
        setStart(true);
    }
    const changeAns=(e)=>{
        setAns(e.target.value);
    }
    const check=async()=>{
        console.log(data);
        if(ques[curr].a==null||ans==null)
            console.log("null");
        else if(ans.toLowerCase()==ques[curr].a.toLowerCase())
            setScore(score+1);
        setCurr(curr+1);
        if(curr==4)
        {
            let em=localStorage.getItem("name");
            setStart(false);
            await axios.post("http://localhost:3000/api/add",{name:em,score:score}).then((res)=>{
                console.log(res);
            }).catch((err)=>{
                console.log(err);
            });
        }
    }
    const getData=async()=>{
        
        await axios.get('http://localhost:3000/api/countries').then((res) => {
            setData(res.data);
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    }
  return (
    <main>
        <Profile />
        <h1 className="title">Your Score:{score}</h1>
        <div> {!start&& <button className={styles.highb} onClick={startgame}>Start Game</button>}</div>
        {start&&
        <div>
            
            <h1 className="title">Q.{curr+1} Name the Capital of {ques[curr].q} </h1>
            <input placeholder="enter answer here" onChange={changeAns} /> 
            <button onClick={check}>Submit</button>
            <button>Reset</button>
        </div>
        }
        
    </main>
  )
}