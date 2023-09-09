import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import EditTodo from './editTodo';

const TodoCard = ({ data, handleEdit, handleDelete }) => {
    const { _id, title, description } = data;
    return (
        <li key={ _id }>
            <div className='title-description'>
                <h3>{ title }</h3>
                <p>{ description }</p>
            </div>

            <div className='button-container'>
                <button name={_id} className='button' onClick={handleEdit}>Edit</button>
                <button name={_id} className='button' onClick={handleDelete}>Delete</button>
            </div>
        </li>
    );
}

const ShowTodoList = () => {
    const [todo, setTodo] = useState([]);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState("");
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        axios
            .get("http://localhost:2000/todo")
            .then((res) => {
                console.log(res.data);
                setTodo(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [update]);

    const handleEdit = (e) => {
        setId(e.target.name);
        setOpen(true);
    }

    const handleUpdate = () => {
        console.log("update:", update, !update);
        setUpdate(!update);
    }

    const handleDelete = (e) => {
        axios.delete(`http://localhost:2000/todo/${e.target.name}`);

        setTodo((data) => {
            return data.filter((todo) => todo._id !== e.target.name);
        });
    }

    const handleClose = () => {
        setId("");
        setOpen(false);
    }

    return (
        <section className='container'>
            <Link to='/create-todo' className='button-new'>
                <button className='button'>New</button>
            </Link>
            <section className='contents'>
                <h1>TODO LIST</h1>
                <ul className='list-container'>
                    {todo.map((data) => (
                        <TodoCard
                            data={data}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete} />
                    ))}
                </ul>
            </section>
            {open ? (
                <section className='update-container'>
                    <div className='update-contents'>
                        <p onClick={handleClose} className='close'>
                            &times;
                        </p>

                        <EditTodo
                            _id={id}
                            handleClose={handleClose}  /* Correct the prop name here */
                            handleUpdate={handleUpdate} />
                    </div>
                </section>
            ) : (
                ""
            )}

        </section>
    );
}

export default ShowTodoList;