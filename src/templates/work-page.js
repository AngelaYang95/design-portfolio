import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import Transition from '../components/Transition'
import TransitionLink from '../components/TransitionLink'
import { TransitionConsumer } from '../components/TransitionContext'

export const WorkPageTemplate = ({
  transition,
  title,
  works,
  content,
  contentComponent,
}) => {
  const PageContent = contentComponent || Content
  console.log('transition is ', transition)
  return (
    <section className={`work ${transition.navOpen ? '' : 'expand'}`}>
      <div className="page-title">{title}</div>
      <div className="container">
        <div className="section">
          <div className="row">
            {works.map((work, i) => {
              return (
                <div className="col-3 item" key={i}>
                  <TransitionLink to="/me" focusOnHover={false}>
                    <Image backgroundColor="black" 
                        className="thumbnail"
                        fluid={!!work.image.childImageSharp
                              ? work.image.childImageSharp.fluid
                              : work.image} alt="Jellyfish" />
                    <div className="details">
                      <h4>{`${work.id} ${work.name}`}</h4>
                      <h5>{work.description}</h5>
                    </div>
                  </TransitionLink>
                </div>
              )
            })}
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

/* Wrap our page in a consumer nav state context as props. */
const WorkPage = ({ data }) => {
  const { markdownRemark: post } = data
  return (
    <Layout>
      <TransitionConsumer>
      {({ transition }) => (
        <WorkPageTemplate
          transition={transition}
          contentComponent={HTMLContent}
          title={post.frontmatter.title}
          works={post.frontmatter.works}
          content={post.html}
        />
      )}
      </TransitionConsumer>
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
