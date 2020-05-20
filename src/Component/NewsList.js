import React from 'react';
import Axios from 'axios';
import ReactPaginate from 'react-paginate';
import '../App.css'
export default class NewsList extends React.Component
{
    constructor(){
        super();
        this.state = {
            newsData: [],
                offset: 0,
                data: [],
                perPage: 10,
                currentPage: 0
        }
    

        this.handlePageClick = this
            .handlePageClick
            .bind(this);
    }
    
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.componentDidMount()
        });

    };

    componentDidMount(){
        // Axios.get('https://microsoft-azure-bing-news-search-v1.p.rapidapi.com/',{
        //     "method": "GET",
        //     "headers": {
        //     "x-rapidapi-host": "microsoft-azure-bing-news-search-v1.p.rapidapi.com",
        //     "x-rapidapi-key": "e71cb0ee0dmshc684092623d89d7p142216jsnbf551f1301ba"
            
        //   }
        // })
        // .then(Response => {
        //     console.log(Response);
        //     console.log(Response.data.value);
        //     this.setState({ newsData:Response.data.value.sort(Response.data.value.datePublished) });
        // }).catch(err => console.log(err))



        Axios
            .get('https://microsoft-azure-bing-news-search-v1.p.rapidapi.com/',{
                    "method": "GET",
                    "headers": {
                    "x-rapidapi-host": "microsoft-azure-bing-news-search-v1.p.rapidapi.com",
                    "x-rapidapi-key": "e71cb0ee0dmshc684092623d89d7p142216jsnbf551f1301ba"
                    
                  }
                })
            .then(res => {
                console.log(res);
                const data = res.data.value;
                const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                const postData = slice.map(newsData => <React.Fragment>
                    <li><h5>{newsData.datePublished}</h5><img src={newsData.image.thumbnail.contentUrl} alt="image" position= "absolute"/><h3><a href={`${newsData.url}`}>{newsData.url}</a></h3>{newsData.name}</li>
                    
                </React.Fragment>)

                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage),
                   
                    postData
                })
            });

    }

    render(){
        return(
            
            //<div style="background-color:gray; align-items: flex-start;">
            // <ul>
            //     {this.state.newsData.map(newsData => <li><h5>{newsData.datePublished}</h5><img src={newsData.image.thumbnail.contentUrl} alt="image" position= "absolute"/><h3><a href={`${newsData.url}`}>{newsData.url}</a></h3>{newsData.name}</li>)}
            // </ul>
            //</div>
         <div>
             
             <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>

<h2>Reference for displaying news</h2>

            {this.state.postData}
            <br></br><br></br>
            <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>

            </div>
        )
    }
}