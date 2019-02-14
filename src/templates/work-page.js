import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import Transition from '../components/Transition'

export const WorkPageTemplate = ({
  title,
  works,
  content,
  contentComponent,
}) => {
  const PageContent = contentComponent || Content

  return (
    <section className="section section--gradient">
      <div className="page-title">{title}</div>
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              {works.map((work, i) => {
                return (
                  <div className="column">
                    <div
                      className="col-3"
                      key={i}
                      alt=""
                      style={{
                        height: '100px',
                        width: '100px',
                        backgroundImage: `url(${
                          !!work.image.childImageSharp
                            ? work.image.childImageSharp.fluid.src
                            : work.image
                        })`,
                      }}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

WorkPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  works: PropTypes.array,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const WorkPage = ({ data }) => {
  const { markdownRemark: post } = data
  return (
    <Layout>
      <WorkPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        works={post.frontmatter.works}
        content={post.html}
      />
    </Layout>
  )
}

WorkPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default WorkPage

export const workPageQuery = graphql`
  query WorkPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        works {
          image {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
