import React from 'react'; 
import { useParams, Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const CATEGORY = gql(` 
  query GetCategory($id: ID!) {
    category(id: $id) {
      data {
        id
        attributes {
          name,
          articles {
            data {
              id
              attributes {
                title
                body
                rating
                categories {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`)

export default function Category() {
  const { id } = useParams();

  const { loading, error, data } = useQuery(CATEGORY, {
    variables: { id: id }
  });

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    let message; 
    if(error.message) {
      message = error.message;
    } else {
      message = error; 
    }
    const errorMessage = (
      <React.Fragment>
        <strong>Error:</strong> {message}
      </React.Fragment>
    );
    return (
      <div className="card">
        <p className="error--danger">{errorMessage}</p>
      </div>
    );
  }

  const category = data.category.data;

  console.log(category)

  return (
    <React.Fragment>
      <h2 className="heading--category">{category.attributes.name}</h2>
      {category.attributes.articles.data.map((article) => (
        <div key={article.id} className="review-card card">
          <div className="rating">{article.attributes.rating}</div>
          <h2>{article.attributes.title}</h2>
          {article.attributes.categories.data.map(c => (
            <small key={c.id}>{c.attributes.name}</small>
          ))}
          <p>{article.attributes.body.substring(0, 200)}…</p>
          <Link to={`/details/${article.id}`}>read more …</Link>
        </div>
      ))}
      
    </React.Fragment>
  )
}
