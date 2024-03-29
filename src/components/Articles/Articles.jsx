import React, { useState, useEffect } from "react";
import { fetchArticles } from "../../utils/api";
import SearchBar from '../SearchBar/SearchBar'
import FilterNewsPannel from '../FilterNewsPannel/FilterNewsPannel'
import styles from './Articles.module.css';
import { applyFilters } from "../../utils/utilsFilters";

function Articles() {
    const [articles, setArticles] = useState([]);
    const [category, setCategory] = useState('everything');
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: '',
        source: '',
        author: ''
    });
    const [filteredArticles, setFilteredArticles] = useState([]);
    console.log(filteredArticles);

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

    useEffect(() => {
        if (!isLoading) {
            setFilteredArticles(applyFilters(articles, filters));
        }
    }, [filters, articles, isLoading]);

    const handleSearch = (text) => {
        setCategory(text);
    };

    const handleApplyFilters = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <>
            <div className={styles.showcase}>
                <div className={styles.overlay}>
                    <h1 className={styles.textBold}>Viewing articles about {category}</h1>
                    <SearchBar searchText={handleSearch}/>
                </div>
            </div>
            <section className={styles.section}>
                <FilterNewsPannel onApplyFilters={handleApplyFilters} />
                {isLoading ? (
                    <p className={styles.loadingText}>Loading...</p>
                ) : (
                    filteredArticles.map((article, id) => {
                        const { title, abstract, url, lead_paragraph, author, pub_date, section_name, source } = article;
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
                        return (
                            <article key={key} className={styles.articleStyle}>
                                <h2 className={styles.headerArticle}>{title}</h2>
                                <a href={url} target="_blank" rel="noreferrer" className={styles.link}>Web Resource</a>
                                <p className={styles.abstract}>{abstract}</p>
                                <p className={styles.leadPeragraph}>{lead_paragraph}</p>
                                <ul className={styles.list}>
                                    <li><span className={styles.dataSpan}>Author:</span> {authorName}</li>
                                    <li><span className={styles.dataSpan}>Date:</span> {pub_date}</li>
                                    <li><span className={styles.dataSpan}>News category:</span> {section_name}</li>
                                    <li><span className={styles.dataSpan}>Source:</span> {source}</li>
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
