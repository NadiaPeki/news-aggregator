import React, {useState, useEffect} from "react"
import styles from './Articles.module.css'

function Articles() {
    const [articles, setArticles] = useState([])
    const [category, setCategory] = useState('everything')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${category}&api-key=${process.env.REACT_APP_NYT_API_KEY}`)
                const articles = await res.json()
                console.log(articles.response.docs)
               setArticles(articles.response.docs) 
            }
            catch (error) {
                console.error(error)
            }
        }
        fetchArticles()
        }, [])

  return (
      <>
          <section>
              {articles.map((article) => {
                  const { abstract, headline:{main}, byline: { original }, lead_paragraph,
                      pub_date, source, section_name,
                      web_url, _id } = article
                  return (
                      <article key={_id}>
                          <h2>{main}</h2>
                          <p>{abstract}</p>
                          <a href={web_url} target="_blank" rel="noreferrer">Web Resource</a>
                          <p>{lead_paragraph}</p>
                          <ul>
                              <li>{original}</li>
                              <li>{pub_date}</li>
                              <li>{section_name}</li>
                              <li>{source}</li>
                          </ul>
                      </article>
                  )
              })}
          </section>
      </>
  )
}

export default Articles
