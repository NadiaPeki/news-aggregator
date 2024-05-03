import React, { useState, useEffect } from 'react';
import { fetchArticles } from '../../utils/api';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Articles.module.css';

function Articles() {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState('everything');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articlesData = await fetchArticles(category);
        setArticles(articlesData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [category]);

  const handleSearch = (text) => {
    setCategory(text);
  };

  return (
    <>
      <div className={styles.showcase}>
        <div className={styles.overlay}>
          <h1 className={styles.textBold}>Viewing articles about {category}</h1>
          <SearchBar searchText={handleSearch} />
        </div>
      </div>
      <section className={styles.section}>
        {isLoading ? (
          <p className={styles.loadingText}>Loading...</p>
        ) : (
          articles.map((article, id) => {
            const {
              title,
              abstract,
              url,
              lead_paragraph,
              author,
              pub_date,
              section_name,
              source,
              multimedia,
            } = article;
            let authorName = 'Unknown Author';

            if (typeof author === 'string') {
              authorName = author;
            } else if (typeof author === 'object' && author.original) {
              authorName = author.original;
            } else if (typeof author === 'object' && author.name) {
              authorName = author.name;
            } else if (typeof author === 'object' && author.author) {
              authorName = author.author;
            }

            const key = `${url}-${id}`;

            const multimediaXLarge = multimedia.find((item) => item.subtype === 'xlarge');
            return (
              <article key={key} className={styles.articleStyle}>
                <h2 className={styles.headerArticle}>{title}</h2>
                <div className={styles.articleImageContainer}>
                  {multimediaXLarge && (
                    <img src={`https://www.nytimes.com/${multimediaXLarge.url}`} alt="Article" />
                  )}
                </div>
                <p className={styles.abstract}>{abstract}</p>
                <p className={styles.leadPeragraph}>{lead_paragraph}</p>
                <ul className={styles.list}>
                  <li>
                    <span className={styles.dataSpan}>Author:</span> {authorName}
                  </li>
                  <li>
                    <span className={styles.dataSpan}>Date:</span> {pub_date}
                  </li>
                  <li>
                    <span className={styles.dataSpan}>News category:</span> {section_name}
                  </li>
                  <li>
                    <span className={styles.dataSpan}>Source:</span> {source}
                  </li>
                  <a href={url} target="_blank" rel="noreferrer" className={styles.link}>
                  Web Resource
                </a>
                </ul>
              </article>
            );
          })
        )}
      </section>
    </>
  );
}

export default Articles;
