import React, { useState, useEffect }from "react";
import api from "./services/api"
import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([]);

  useEffect( () => {
    api.get("repositories").then(response => {
      setRepositories(response.data)
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      url: "https://github.com/Rocketseat/umbriel",
      title: `Novo repositorio ${Date.now()}`,
      techs: ["Node", "Express", "TypeScript"]
    });

    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    const reponse = await api.delete(`repositories/${id}`);
    const deleteIndex = repositories.findIndex(repository => repository.id === id);
    if ( reponse.status === 204 ) {
      repositories.splice(deleteIndex, 1);
      setRepositories([...repositories]);
    } 
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
