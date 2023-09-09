import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateTodo = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({ title: "", description: "" });

    const handleChange = (e) => {
        setData((data) => ({ ...data, [e.target.name]: e.target.value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const todo = {
            title: data.title,
            description: data.description
        };
        console.log({ todo });
        axios
            .post("http://localhost:2000/todo", data)
            .then((res) => {
                setData({  title: "", description: ""});
                navigate('/');
                console.log(res.data.message);
            })
            .catch((err) => {
                console.log("Error: Could not create Todo");
                console.log(err.message);
            });
    };

    return (
        <section className='container'>
            <Link to="/" className='button-back'>
                <button type='button' className='button'>
                    BACK
                </button>
            </Link>
            <section className='contents'>
                <form onSubmit={handleSubmit} className='form-container' noValidate>
                    <label className='label' htmlFor="title">
                        Title
                    </label>
                    <input type="text" name='title' value={data.title} onChange={handleChange} className='input'/>
                    <label htmlFor="description" className='label'>
                        Description
                    </label>
                    <input type="text" name='description' value={data.description} onChange={handleChange} className='input'/>
                    <button type='submit' className='button'>
                        Create todo
                    </button>
                </form>
            </section>
        </section>
    );
}

export default CreateTodo;