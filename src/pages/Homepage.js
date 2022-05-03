import React from "react";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

// import useFetch, { getStrapiURL } from "../hooks/useFetch";

const ARTICLES = gql`
  query GetArticles {
    articles {
      data {
        id,
        attributes {
          title,
          body,
          rating,
          categories {
            data {
              id, 
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`

export default function Homepage() {
  // const { loading, error, response } = useFetch(getStrapiURL("/api/articles"));

  const { loading, error, data } = useQuery(ARTICLES)

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

  return (
    <React.Fragment>
      {data.articles.data.map((article) => (
        <div key={article.id} className="review-card card">
          <div className="rating">{article.attributes.rating}</div>
          <h2>{article.attributes.title}</h2>
          {article.attributes.categories.data.map((c) => (
            <small key={c.id}>{c.attributes.name}</small>
          ))}
          <p>{article.attributes.body.substring(0, 200)}…</p>
          <Link to={`/details/${article.id}`}>read more …</Link>
        </div>
      ))}
    </React.Fragment>
  );
}
