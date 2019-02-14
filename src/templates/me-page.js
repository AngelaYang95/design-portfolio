import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import Transition from '../components/Transition'

export const MePageTemplate = ({ 
  title, 
  contact,
  content, 
  contentComponent 
}) => {
  const PageContent = contentComponent || Content

  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="row">
          <div className="col-8">
            <div className="page-title">{title}</div>
            <Transition enter={['fade']}>
              <PageContent className="blurb" content={content} />
              <div className="footer">
                <ul>
                  <li>{contact.email}</li>
                  <li>{contact.mobile}</li>
                  <li>@mueslibyangela</li>
                </ul>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>
  )
}

MePageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const MePage = ({ data }) => {
  const { markdownRemark: post } = data
  return (
    <Layout>
      <MePageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        contact={post.frontmatter.contact}
        content={post.html}
      />
    </Layout>
  )
}

MePage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default MePage

export const mePageQuery = graphql`
  query MePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        contact {
          email
          mobile
        }
      }
    }
  }
`
