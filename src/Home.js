import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'


function Home() {
    const [data, setData] = useState([])
    const navigate = useNavigate()
    useEffect(()=> {
        axios.get('http://localhost:3030/users')
        .then(res => setData(res.data))
        .catch(err => console.log(err))
    }, [])

  return (
    <div className=''>
        <Link to="/create" className=''><button>Add</button></Link>
        <table className=''>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((d, i)=> (
                    <tr key={i}>
                        <td>{d.id}</td>
                        <td>{d.name}</td>
                        <td>{d.email}</td>
                        <td>
                            <Link className='' to={`/update/${d.id}`}><button>Update</button></Link>
                            <button className='' onClick={e => handleDelete(d.id)}>Delete</button>
                            <Link className='' to={`/read/${d.id}`}><button>Open</button></Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
  )

  function handleDelete(id) {
    const confirm = window.confirm("Delete?");
    if(confirm) {
        axios.delete('http://localhost:3030/users/'+id)
        .then(res => {
            
            navigate('/')
        })
    }
  }
}

export default Home