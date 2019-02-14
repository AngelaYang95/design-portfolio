import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Navbar from '../components/Navbar'
import { TransitionProvider } from '../components/TransitionContext'
import './all.sass'

const TemplateWrapper = ({ children }) => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={data => (
      <div>
        <Helmet>
          <html lang="en" />
          <title>{data.site.siteMetadata.title}</title>
          <meta
            name="description"
            content={data.site.siteMetadata.description}
          />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/img/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            href="/img/favicon-32x32.png"
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href="/img/favicon-16x16.png"
            sizes="16x16"
          />

          <link
            rel="mask-icon"
            href="/img/safari-pinned-tab.svg"
            color="#ff4400"
          />
          <meta name="theme-color" content="#fff" />

          <meta property="og:type" content="business.business" />
          <meta property="og:title" content={data.site.siteMetadata.title} />
          <meta property="og:url" content="/" />
          <meta property="og:image" content="/img/og-image.jpg" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Lato"
          />
        </Helmet>
        <div className="corners">
          <span className="top-right corner">angela yang</span>
          <span className="bottom-right corner">design portfolio</span>
          <span className="bottom-left corner">_</span>
        </div>
        <TransitionProvider>
          <div className="split-container">
            <Navbar className="col-6" />
            <div className="main col-6">{children}</div>
          </div>
        </TransitionProvider>
      </div>
    )}
  />
)

export default TemplateWrapper
