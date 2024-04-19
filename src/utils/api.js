import { formatArticle } from './utilsFormatArticle.js';

export const fetchArticles = async (category) => {
    try {
        const NYTRes = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${category}&api-key=${process.env.REACT_APP_NYT_API_KEY}`);
        const NYTData = await NYTRes.json();
        const NYTArticles = NYTData.response.docs.map(article => formatArticle(article, 'New York Times'));

        const guardianRes = await fetch(`https://content.guardianapis.com/search?page=2&q=${category}&api-key=${process.env.REACT_APP_GUARDIAN_API_KEY}`);
        const guardianData = await guardianRes.json();
        const guardianArticles = guardianData.response.results.map(article => formatArticle(article, 'The Guardian'));

        const combinedArticles = [...NYTArticles, ...guardianArticles];

        return combinedArticles;
    } catch (error) {
        console.error(error);
        return [];
    }
};
