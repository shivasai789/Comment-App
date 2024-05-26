import {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

const initialCommentsList = []

class Comments extends Component {
  state = {
    commentsList: initialCommentsList,
    name: '',
    comment: '',
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {name, comment} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: uuidv4(),
      name,
      comment,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }
    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      name: '',
      comment: '',
    }))
  }

  onUpdateCommentList = id => {
    const {commentsList} = this.state
    const newComment = commentsList.filter(eachItem => eachItem.id !== id)
    this.setState({commentsList: newComment})
  }

  onUpdateLikeUnliked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isLiked: !eachItem.isLiked}
        }
        return eachItem
      }),
    }))
  }

  updateName = event => {
    this.setState({name: event.target.value})
  }

  updateComment = event => {
    this.setState({comment: event.target.value})
  }

  render() {
    const {commentsList, name, comment} = this.state
    return (
      <div>
        <div className="bg-container">
          <h1 className="mb-5">Comments</h1>
          <p>Say something about 4.0 Technologies</p>
          <div className="Form-container">
            <div className="container">
              <div className="row">
                <div className="col-12 col-md-6">
                  <form onSubmit={this.onSubmitForm}>
                    <input
                      onChange={this.updateName}
                      value={name}
                      placeholder="Your Name"
                    />
                    <br /> <br />
                    <textarea
                      onChange={this.updateComment}
                      value={comment}
                      rows="4"
                      cols="50"
                      placeholder="Your Comment"
                    />
                    <br /> <br />
                    <button type="submit" onClick={this.preventDefault}>
                      Add Comment
                    </button>
                  </form>
                </div>
                <div className="col-12 col-md-6">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
                    alt="comments"
                    className="comments-img"
                  />
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div>
            <div className="comments-heading">
              <p style={{marginRight: '10px'}}>{commentsList.length}</p>
              <p>Comments</p>
            </div>
            <ul style={{listStyleType: 'none'}}>
              {commentsList.map(eachItem => (
                <CommentItem
                  commentDetails={eachItem}
                  key={eachItem.id}
                  onUpdateLikeUnliked={this.onUpdateLikeUnliked}
                  onUpdateCommentList={this.onUpdateCommentList}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Comments
