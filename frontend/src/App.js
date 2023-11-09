import './App.css';
import { useState, useEffect } from 'react';
import { db, auth } from './firebase';
import { onValue, ref } from "firebase/database";
import {  signInWithEmailAndPassword   } from 'firebase/auth';




function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null)
  const [readings, setReadings] = useState([])

  useEffect(() => {
    const query = ref(db, `UsersData/${user}/readings`);

    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      if (snapshot.exists()) {
        setReadings(Object.values(data))
      }
    });
  }, [user]);

  useEffect(() => {
    if (user) {
      const myDiv = document.getElementById("readingTable");
      myDiv.scrollTop = myDiv.scrollHeight;
    }
  }, [user, readings])

  const onLogin = (e) => {
    e.preventDefault();
    console.log(auth)
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        setUser(userCredential.user.uid)
        console.log(userCredential.user)
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
    });
   
}
  return (
    <div className="App">
      {user ? <div id="readingTable">
        {readings && readings.map((e, i) => <p key={i} className={i % 2 === 0 ? "evenRow" : "oddRow"}>
          {`${e.timestamp} ${e.x} ${e.y} ${e.z}`}
        </p>)}
      </div>
      : <div>
        <label>Email</label>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
        <label>Password</label>
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={onLogin}>Login</button>
      </div>}
    </div>
  );
}

export default App;
