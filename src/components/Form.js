import React, {useState, useEffect} from 'react'
import APIService from './APIService'


function Form(props) {
    const [title, setTitle] = useState(props.article.title)
    const [description, setDescription] = useState(props.article.description)

    useEffect(() => {
        setTitle(props.article.title)
        setDescription(props.article.description)
    },[props.article])

    const updateArticle = () => {
        APIService.UpdateArticle(props.article.id, {title, description})
        .then(resp => props.updatedData(resp))
        .catch(error => console.log(error))
    }

    const instertArticle = () => {
        APIService.InsertArticle({title, description})
        .then(resp => props.insertedArticle(resp))
        .catch(error => console.log(error))
    }

    return (
    <div>
        {props.article ? (
        <div className = "mb-3">

            <label htmlFor = "title" className = "form-label">Title</label>
            <input type="text" className = "form-control"
            value = {title}
            placeholder = "Please, enter title"
            onChange = {(e) => setTitle(e.target.value)}
            />

            <label htmlFor = "description" className = "form-label">Description</label>
            <textarea 
            rows = "5"
            value = {description}
            onChange = {(e) => setDescription(e.target.value)}
            className = "form-control"
            placeholder = "Please, enter description"
            />

            {
                props.article.id ? 
                    <button
                    onClick = {updateArticle}
                    className = "btn btn-success mt-3"
                    >Update</button>
                :
                    <button
                    onClick = {instertArticle}
                    className = "btn btn-success mt-3"
                    >Insert</button>
            }
        </div>

        ):null}
    </div>
    )
}

export default Form
