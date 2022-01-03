import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { auth, db } from '../firebaseconfig';
import { signOut } from 'firebase/auth';
import { collection, getDocs, addDoc, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../styles/admin.css'

export default function Adminpanel() {
    const { currentUser } = useAuth();
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        let usersRef = collection(db, 'Users');
        // setUsers([]);
        // getDocs(usersRef).then(snapshot => {
        //     snapshot.docs.forEach(doc => {
        //         setUsers(prevState => [...prevState, { id: doc.id, ...doc.data() }]);
        //     })
        // })
        onSnapshot(usersRef, (snapshot) => {
            setUsers([]);
            snapshot.docs.forEach(doc => {
                setUsers(prevState => [...prevState, { id: doc.id, ...doc.data() }]);
            })
        })
    }, []);

    const logout = () => {
        signOut(auth).then(() => {
            navigate("/");
        })
    }

    const saveUser = (e) => {
        e.preventDefault();
        let usersRef = collection(db, 'Users');
        addDoc(usersRef, {
            name: name,
            email: email,
            role: role
        }).then(() => {
            setName('');
            setEmail('');
            setRole('');
        })
    }

    return (
        <div className="adminContainer">
        <nav className='navbar'>
           <div className='navLeft'>
            <h1 style={{ color: '#fff', }}>Admin Panel</h1>
           </div>

          <div className='navRight'>
            {currentUser && <p className='email'> User: {currentUser.email}</p>}
            {currentUser && <button className='logoutBtn' onClick={logout}>signout</button>}
          </div>

        </nav>

     <div className='addBtn'>
       <button className='registerBtn'>Register Employee</button>
     </div>
       
       {/**the table to display users */}
       <div className="userTable">
          <table className='table'>
          <tr>
            <th>#</th>
            <th>Employee Name</th>
            <th>Department</th>
            <th>Employee ID</th>
            <th>Employee email</th>
          </tr>
          <tr>
            <td>1</td>
            <td>Sam Mureithi</td>
            <td>ICT</td>
            <td>0345</td>
            <td>Sammureithi@invesco.co.ke</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Simon Mwangi</td>
            <td>Claims</td>
            <td>0456</td>
            <td>Simon@invesco.co.ke</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Simon Kiburi</td>
            <td>IT</td>
            <td>0678</td>
            <td>Simon@invesco.co.ke</td>
          </tr>
          </table>
         
       </div>

     
        {/**this form is diplayed none for now */}
         <div style={{ display:'none', }}>
           <h1>Create new user</h1> 
            <form onSubmit={saveUser}>
                <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
                <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                <input type="submit" value="submit" />
            </form>
         </div>

         {/**display none */}
         <div style={{ display:'none', }}>
            <h1>Users</h1>
            {
                users.map(user => {
                    return (
                        <div key={user.id} style={{ textAlign: 'left', marginLeft: '100px' }}>
                            <p>{user.name}</p>
                            <p>{user.email}</p>
                            <p>{user.role}</p>
                        </div>
                    )
                })
            }
        </div>  

        

        </div>
    )
}
