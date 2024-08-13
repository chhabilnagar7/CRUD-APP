import React,{useState, useEffect} from 'react'
import "./User.css";
import axios from 'axios';
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';

const User = () => {

  const [users, setUsers] = useState([]);
  // this is going to fetch all the data using getAll api
  useEffect(()=>{
    const fetchData = async()=>{
        const response = await axios.get("http://localhost:8000/api/getall");
        setUsers(Array.isArray(response.data.userData) ? response.data.userData : []);
    }
    fetchData();
  },[])

  // going to delete the data
  const deleteUser = async(userId) =>{
    await axios.delete(`http://localhost:8000/api/delete/${userId}`)
    .then((respones)=>{
      // this stmt use to filter out the remaing data using id
      setUsers((prevUser)=> prevUser.filter((user)=> user._id !== userId))
      toast.success(respones.data.msg, {position: 'top-right'})
    })
    .catch((error) =>{
      console.log(error);
    })
}



  return (
    <div className='userTable'>
      <Link to={"/add"} className='addButton'>Add User</Link>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
            <tr>
                <th>S.No.</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>No users found</td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.fname} {user.lname}</td>
                <td>{user.email}</td>
                <td className='actionBtn'>
                  <button onClick={()=> deleteUser(user._id)}>Delete</button>
                  <Link to={`/edit/${user._id}`}>Edit</Link>
                </td>
              </tr>
            ))
          )}
        </tbody>


      </table>
    </div>
  )
}

export default User
