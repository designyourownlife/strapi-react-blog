import React from "react";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const CATEGORIES = gql(`
  query GetCategories {
    categories {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`);

export default function SiteHeader() {
  const { loading, error, data } = useQuery(CATEGORIES);
  
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
  
  const categories = data.categories.data;

  return (
    <div className="site-header">
      <Link to="/">
        <h1>m/s Portfolio</h1>
      </Link>
      <nav className="categories">
        <span>Filter by category: </span>
        {categories.map(category => (
          <Link key={category.id} to={`/category/${category.id}`}>
            {category.attributes.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
