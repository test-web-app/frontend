export default class APIService {
    static UpdateArticle(apiUrl, id, body) {
        return fetch(`${apiUrl}/update/${id}/`, {
            'method':'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          })
          .then(resp => resp.json())
    }

    static InsertArticle(apiUrl, body) {
        return fetch(`${apiUrl}/add`, {
            'method':'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          })
          .then(resp => resp.json())
    }

    static DeleteArticle(apiUrl, id) {
        return fetch(`${apiUrl}/delete/${id}/`, {
            'method':'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          })
    }

}