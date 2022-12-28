import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

class BlogItemDetails extends Component {
  state = {blogData: {}, isloading: true}

  componentDidMount() {
    this.getBlogItemId()
  }

  getBlogItemId = async () => {
    console.log(this.props)
    const {match} = this.props
    const {params} = match
    const {param} = params
    console.log(param)

    const response = await fetch(`https://apis.ccbp.in/blogs/${param}`)
    const data = await response.json()
    console.log(data)
    const updatedata = {
      title: data.title,
      imageUrl: data.image_url,
      avatarUrl: data.avatar_url,
      content: data.content,
      topic: data.topic,
      author: data.author,
    }
    this.setState({blogData: updatedata, isloading: false})
  }

  renderBlogItemDetails = () => {
    const {blogData} = this.state
    const {title, imageUrl, content, avatarUrl, author} = blogData
    return (
      <div className="blog-info">
        <div className="author-details">
          <img className="author-pic" src={avatarUrl} alt={author} />
          <p className="details-author-name">{author}</p>
        </div>
        <img className="blog-image" src={imageUrl} alt={title} />
        <p className="blog-content">{content}</p>
        <h2 className="blog-details-title">{title}</h2>
      </div>
    )
  }

  render() {
    const {isloading} = this.state
    return (
      <div className="blog-container">
        {isloading ? (
          <Loader type="TailSpin" color="00BFFF" height={50} width={50} />
        ) : (
          this.renderBlogItemDetails()
        )}
      </div>
    )
  }
}

export default BlogItemDetails
