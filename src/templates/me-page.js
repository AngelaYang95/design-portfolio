import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import Transition from '../components/Transition'

export const MePageTemplate = ({ 
  title, 
  blurb,
  contact,
  content, 
  contentComponent 
}) => {
  const PageContent = contentComponent || Content

  return (
    <div className="row me-page">
      <div className="col-8">
        <div className="page-title">{title}</div>
        <Transition enter={['fade']}>
          <PageContent className="blurb" content={blurb} />
          <div className="contact">
            <ul>
              <li>{contact.email}</li>
              <li>{contact.mobile}</li>
              <li>@mueslibyangela</li>
            </ul>
          </div>
        </Transition>
      </div>
    </div>
  )
}

MePageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  blurb: PropTypes.string,
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
        blurb={post.frontmatter.blurb}
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
        blurb
        contact {
          email
          mobile
        }
      }
    }
  }
`
