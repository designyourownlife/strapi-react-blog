import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import SiteHeader from "./components/SiteHeader";
import Homepage from "./pages/Homepage";
import Category from "./pages/Category";
import ArticleDetails from "./pages/ArticleDetails";
import { getStrapiURL } from "./hooks/useFetch";

const client = new ApolloClient({
  uri: getStrapiURL("/graphql"),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <div className="App">
          <SiteHeader />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/details/:id" element={<ArticleDetails />} />
            <Route path="/category/:id" element={<Category />} />
          </Routes>
        </div>
      </ApolloProvider>
    </Router>
  );
}

export default App;
