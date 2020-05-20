import React, { Component } from "react";
import NewsList from './Component/NewsList';
import { getNews } from "./Component/api";
import SearchBar from "./Component/searchBar";
import { Container, Header } from "semantic-ui-react";
import './App.css'

class App extends React.Component {
  state = {
    articles: [],
    searchTopic: "",
    totalResults: "",
    loading: false,
    activePage:15
    //apiError: ""
  };

  searchForTopic = async topic => {
    try {
      this.setState({ loading: true });
      const response = await getNews(topic);
      this.setState({
        articles: response.articles,
        searchTopic: topic,
        totalResults: response.totalResults
      });
    } catch (error) {
      this.setState({ apiError: "Could not find any articles" });
    }
    this.setState({ loading: false });
  };

  // handlePageChange(pageNumber) {

  //   console.log(`active page is ${pageNumber}`);
 
  //   this.setState({activePage: pageNumber});
 
  // }
 

  render() {
    const {
      // articles,
      // loading,
      // searchTopic,
      // totalResults
    } = this.state;
    return (
    <div className="App">
      
      <Container>
        <Header as="h2" style={{ textAlign: "center", margin: 20 }}>
          
        </Header>
        <SearchBar searchForTopic={this.searchForTopic} containerClassName={"seachBar"}/>
       
      </Container>
      
      
      <NewsList/>

      
    </div>

      
    );
  }
}

export default App;
