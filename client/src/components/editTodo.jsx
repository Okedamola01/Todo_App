import { useState, useEffect } from "react";
import axios from "axios";

const EditTodo = ({ _id, handleClose, handleEdit }) => {
    const [formData, setFormData] = useState({ title: "", description: "" });

    useEffect(() => {
        // Fetches the clicked todo based on ID
        axios
            .get(`http://localhost:2000/todo/${_id}`)
            .then((res) => {
                const { title, description } = res.data;
                setFormData({ title, description });
            })
            .catch((err) => {
                console.log("Failed to fetch Todo item for editing", err)
            });
    }, [_id]);

    const handleChange = (e) => {
        // Update the formData state when the user types in the input fields
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Send a PUT request to update the todo
        axios
            .put(`http://localhost:2000/todo/${_id}`, formData)
            .then((res) => {
                console.log('Todo item updated:', res.data);
                handleEdit(); // Notify the parent component that edit has occurred
                handleClose(); // Close the update modal
            })
            .catch((err) => {
                console.log('Failed to update Todo:', err);
            });
    };

    return (
        <form
            className="form-container"
            onSubmit={handleSubmit}
        >
            <label htmlFor="title" className="label">
                Title
            </label>
            <input type="text" name="title" value={formData.title} className="input" onChange={handleChange}/>
            <label htmlFor="description" className="label">
                Description
            </label>
            <input type="text" name="description" value={formData.description} className="input" onChange={handleChange}/>
            <button type="submit" className="button">
                Submit
            </button>
        </form>
    );
}

export default EditTodo;
