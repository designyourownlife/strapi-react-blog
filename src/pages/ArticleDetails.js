import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import ReactMarkdown from "react-markdown";

// import useFetch, { getStrapiURL } from '../hooks/useFetch';

const ARTICLE = gql(`
  query GetArticle($id: ID!) {
    article (id: $id) {
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
`);

export default function ArticleDetails() {
  const { id } = useParams();
  // const { loading, error, response } = useFetch(getStrapiURL(`/api/articles/${id}`));
  const { loading, error, data } = useQuery(ARTICLE, {
    variables: {
      id: id,
    },
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
    if (error.message) {
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

  const article = data.article.data;

  return (
    <div key={article.id} className="review-card card">
      <div className="rating">{article.attributes.rating}</div>
      <h2>{article.attributes.title}</h2>
      {article.attributes.categories.data.map((c) => (
        <small key={c.id}>{c.attributes.name}</small>
      ))}
      <ReactMarkdown>{article.attributes.body}</ReactMarkdown>
    </div>
  );
}
