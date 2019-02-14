import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import Transition from '../components/Transition'
import TransitionLink from '../components/TransitionLink'

export const WorkPageTemplate = ({
  title,
  works,
  content,
  contentComponent,
}) => {
  const PageContent = contentComponent || Content

  return (
    <section className="section section--gradient work">
      <div className="page-title">{title}</div>
      <div className="container">
        <div className="section">
          {works.map((work, i) => {
            return (
              <div className="row" key={i}>
                <div className={`col-8 ${i % 2 == 0 ? '' : 'off-2'}`}>
                  <TransitionLink to="/me" onClick="true">
                    <Image fluid={!!work.image.childImageSharp
                              ? work.image.childImageSharp.fluid
                              : work.image} alt="Jellyfish" />
                  </TransitionLink>
                </div>
                <div className="col-4 details">
                  <h2>{work.id}</h2>
                  <h4>{work.name}</h4>
                  <h5>{work.description}</h5>
                </div>
              </div>
            )
          })}
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
          id
          image {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          name
          description
        }
      }
    }
  }
`
