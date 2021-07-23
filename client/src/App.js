
import './App.css';
import {useState,useEffect} from "react";
import Axios from 'axios';


function App() {
  const [password,setpassword]=useState('');
  const [title,settitle]=useState('');
  const [passwordList,setpasswordList]=useState([])
  
  useEffect(()=>{
   Axios.get('http://localhost:3001/showpasswords').then((response)=>
   {
      setpasswordList(response.data);
   });
  },[]);

  const addPassword=()=>{
   Axios.post('http://localhost:3001/addpassword',{
     password:password,
     title:title,
   }); 
  }

  const decryptPassword = (encryption) => {
    Axios.post("http://localhost:3001/decryptpassword", {
      password: encryption.password,
      iv: encryption.iv,
    }).then((response) => {
      setpasswordList(
        passwordList.map((val) => {
          return val.id === encryption.id
            ? {
                id: val.id,
                password: val.password,
                title: response.data,
                iv: val.iv,
              }
            : val;
        })
      );
    });
  };
  return (
    <div className="App">
      <div className="AddingPassword">
        <input type="text" placeholder="Ex.Password123"
        onChange={(event) => {
          setpassword(event.target.value);
        }}></input>
        <input type="text" placeholder="Ex.Facebook"
        onChange={(event) => {
          settitle(event.target.value);
        }}></input>
        <button onClick={addPassword}>Add</button>

      </div>
      <div className="Passwords">
        {
          passwordList.map((val)=>{
            return(
            <div className="password" 
            onClick={() => {
              decryptPassword({
                password: val.password,
                iv: val.iv,
                id: val.id,
              });
            }}
            //key={key}
          >
            <h3>{val.title}</h3>
            </div>
            ); 
 
          })
        }

      </div>
      
    </div>
  );
}

export default App;
