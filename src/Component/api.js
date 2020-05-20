export const getNews = async topic => {
  const response = await fetch('https://microsoft-azure-bing-news-search-v1.p.rapidapi.com/',{
    "method": "GET",
    "headers": {
    "x-rapidapi-host": "microsoft-azure-bing-news-search-v1.p.rapidapi.com",
    "x-rapidapi-key": "e71cb0ee0dmshc684092623d89d7p142216jsnbf551f1301ba"
    
  }
});
  const json = await response.data.value.sort(response.data.value.datePublished).json();
  return json;
};

