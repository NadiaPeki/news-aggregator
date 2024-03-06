export const applyFilters = (articles, filters) => {
    try {
        const filteredArticles = articles.filter(article => {
            const { category, source, author } = filters;
            
            const lowercaseCategory = category.toLowerCase();
            const lowercaseSource = source.toLowerCase();
            const lowercaseAuthor = author.toLowerCase();

            const categoryMatch = !category || (article.section_name && article.section_name.toLowerCase().includes(lowercaseCategory));
            const sourceMatch = !source || (article.source && article.source.toLowerCase().includes(lowercaseSource));
            const authorMatch = !author || (typeof article.author === 'string' && article.author.toLowerCase().includes(lowercaseAuthor));

            return categoryMatch && sourceMatch && authorMatch;
        });

        return filteredArticles;
    } catch (error) {
        console.error(error);
        return [];
    }
};
