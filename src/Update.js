import axios from 'axios';
import React from 'react'
import { useEffect , useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';



function Update() {

    const {id} = useParams();

    const [inputData, setInputData] = useState({
        id: id,
        name: '',
        email: ''
    })
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3030/users/'+id)
        .then(res => setInputData(res.data))
        .catch(err => console.log(err))
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:3030/users/'+id , inputData)
        .then(res => {
            
            navigate('/')
        })
    }


  return (
    <div className=''>
        <div className=''>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="id">ID:</label>
                    <input type="number" disabled name='id' className='' value={inputData.id}
                    />
                </div>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name='name' className='' value={inputData.name}
                    onChange={e => setInputData({...inputData, name: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name='email' className='' value={inputData.email}
                    onChange={e => setInputData({...inputData, email: e.target.value})}/>
                </div><br />
                <button className=''>Update</button>
            </form>
        </div>
    </div>
  )
}

export default Update