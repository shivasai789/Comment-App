import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {commentDetails, onUpdateLikeUnliked, onUpdateCommentList} = props
  const {id, name, comment, isLiked, date, initialClassName} = commentDetails
  const postedTime = formatDistanceToNow(date)
  const initial = name ? name[0].toUpperCase() : ''
  const likeLikedImg = !isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'

  const textColor = isLiked ? 'liked-text' : ''

  const onClickUpdate = () => {
    onUpdateLikeUnliked(id)
  }

  const onClickDelete = () => {
    onUpdateCommentList(id)
  }

  return (
    <li>
      <div className="comment-header">
        <div className={initialClassName}>
          <p className="initial">{initial}</p>
        </div>
        <h1
          className="mt-2 mr-5"
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginRight: '10%',
            marginLeft: '10px',
          }}
        >
          {name}
        </h1>
        <p className="mt-2">{postedTime} ago</p>
      </div>
      <p>{comment}</p>
      <div className="comment-header1">
        <div className="comment-header">
          <button type="button" onClick={onClickUpdate} className="like-btn">
            <img src={likeLikedImg} alt="like" />
            <p className={textColor} style={{marginBottom: '5px'}}>
              Like
            </p>
          </button>
        </div>
        <button
          type="button"
          onClick={onClickDelete}
          className="like-btn"
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr />
    </li>
  )
}

export default CommentItem
