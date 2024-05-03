export function formatArticle(article, source) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  let formattedArticle = {
    id: article._id || article.id,
    title: article.headline?.main || article.title || article.webTitle || 'No Title Available',
    abstract:
      article.abstract ||
      article.description ||
      article.fields?.trailText ||
      'No Abstract Available',
    url: article.web_url || article.url || article.webUrl || '#',
    lead_paragraph:
      article.lead_paragraph ||
      article.fields?.bodyText ||
      article.content ||
      'No Lead Paragraph Available',
    author:
      (article.author && article.author.name) ||
      article.byline?.original ||
      article.source ||
      'Unknown Author',
    pub_date: formatDate(
      article.pub_date || article.webPublicationDate || article.publishedAt || 'Unknown Date',
    ),
    section_name:
      article.section_name || article.sectionName || article.section || 'Unknown Section',
    source: source || 'Unknown Source',
    multimedia: article.multimedia || [],
  };

  return formattedArticle;
}
