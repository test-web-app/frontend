import './App.css';
import { useState, useEffect } from 'react';
import ArticleList from './components/ArticleList';
import Form from './components/Form';


function App() {

  const [articles, setArticles] = useState([])
  const [editedArticle, setEditedArticle] = useState(null)
  let apiUrl = '';

  if (process.env.REACT_APP_API_HOST && process.env.REACT_APP_API_PORT) {
      apiUrl = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`;
  }

  useEffect(() => {
    fetch(`${apiUrl}/api/get`, {
      'method':'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(resp => setArticles(resp))
    .catch(error => console.log(error))
  },[apiUrl])

  const editArticle = (article) => {
    setEditedArticle(article)
  }

  const updatedData = (article) => {
    const new_article = articles.map(my_article => {
      if(my_article.id === article.id) {
        return article
      } else {
        return my_article
      }
    })
    setArticles(new_article)
  }

  const openForm = () => {
    setEditedArticle({title: '', description: ''})
  }

  const insertedArticle = (article) => {
    const new_articles = [...articles, article]
    setArticles(new_articles)
  }

  const deleteArticle = (article) => {
    const new_articles = articles.filter(myarticle => {
      if (myarticle.id === article.id) {
        return false;
      }
      return true
    })

    setArticles(new_articles)

  }

  return (
    <div className="App">
      <div className = "row">

        <div className = "col">
          <h1>Test web application</h1>
        </div>

        <div className = "col">
          <button
          className = "btn btn-success"
          onClick = {openForm}
          >InsertArticle</button>
        </div>

      </div>
      <br/>
      <br/>
        <ArticleList articles = {articles} editArticle = {editArticle} deleteArticle = {deleteArticle} apiUrl = {apiUrl}/>
        {editedArticle ? <Form article = {editedArticle} updatedData = {updatedData} insertedArticle = {insertedArticle} apiUrl = {apiUrl}/> : null}
    
    </div>
  );
}

export default App;
