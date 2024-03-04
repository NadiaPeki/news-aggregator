import React, { useState, useEffect } from "react";
import { fetchArticles } from "../../api";

import styles from './Articles.module.css';

function Articles() {
    const [articles, setArticles] = useState([]);
    const [category, setCategory] = useState('eminem');
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

    return (
        <>
            <div className={styles.showcase}>
                <div className={styles.overlay}>
                    <h1 className={styles.textBold}>Viewing articles about {category}</h1>

                </div>
            </div>
            <section>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    articles.map((article, id) => {
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
                            <article key={key}>
                                <h2>{title}</h2>
                                <p>{abstract}</p>
                                <a href={url} target="_blank" rel="noreferrer">Web Resource</a>
                                <p>{lead_paragraph}</p>
                                <ul>
                                    <li>{authorName}</li>
                                    <li>{pub_date}</li>
                                    <li>{section_name}</li>
                                    <li>{source}</li>
                                </ul>
                            </article>
                        );
                    })
                )}
            </section>

        </>)
}

export default Articles;
