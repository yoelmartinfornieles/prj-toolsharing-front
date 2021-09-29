import axios from "axios";
import {useState} from 'react';

const API_URL = "http://localhost:5005";




function Home(){

    const[username, setUsername] = useState('')
    const[password, setPassword] = useState('')
    
    return(
<div>
    {/* <form  onSubmit={(e)=>{
        console.log('submit')
        e.preventDefault();

        let objectToSubmit = {username:username, password:password}

        axios
            .post(`${API_URL}/signup`, objectToSubmit)
    }}>
        <input type="text" name="username" value={username} onChange={(e)=>{
            setUsername(e.target.value)
        }}/>

        <input type="password" name="password" value={password} onChange={(e)=>{
            setPassword(e.target.value)
        }}/>
        <button type="submit">Sing a Song du daa du daa</button>
    </form> */}
</div>)
}

export default Home