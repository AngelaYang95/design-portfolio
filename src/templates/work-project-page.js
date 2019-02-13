import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import Transition from '../components/Transition'

export const WorkProjectTemplate = ({ title, content, contentComponent}) => {
  const PageContent = contentComponent || Content

  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              Project
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

WorkProjectTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const WorkProjectPage = ({data}) => {
  const { markdownRemark: post } = data
  return (
    <Layout>
      <WorkProjectTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
      />
    </Layout>
  )
}

WorkProjectPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default WorkProjectPage

export const workProjectPageQuery = graphql`
  query WorkProjectPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`
