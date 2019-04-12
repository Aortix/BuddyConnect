import React, { Component } from "react";
import CreateComment from "./../CreateComment/CreateComment";
import { Redirect } from "react-router-dom";

class Post extends Component {
  componentDidMount = () => {
    console.log("Post component mounted!");
  };
  state = {
    profileClick: false,
    currentProfile: ""
  };

  changeToProfilePage = pageId => {
    this.props.getAndStoreAProfile(pageId);
    this.setState({ profileClick: true, currentProfile: pageId });
  };

  changeCurrentFocusedPost = postId => {
    this.props.changeCurrentFocusedPost(postId);
  };

  render() {
    return this.props.posts === null ? (
      <h1>Loading</h1>
    ) : (
      <div>
        {this.props.posts.map(post => {
          return (
            <div key={post._id}>
              <strong
                onClick={() => {
                  //this.changeToProfilePage(post.p_id);
                  {
                    //this.props.getAndStoreAProfile(post.p_id);
                    this.props.changeLocation(post.p_id);
                  }
                }}
              >
                {post.name}
              </strong>
              <br />
              {post.post}
              {post.comments.map(comments => {
                return (
                  <div key={comments._id}>
                    <em
                      onClick={() => {
                        //this.changeToProfilePage(comments.commenterP_id);
                        {
                          //this.props.getAndStoreAProfile(comments.commenterP_id);
                          this.props.changeLocation(comments.commenterP_id);
                        }
                      }}
                    >
                      {comments.commenterName}
                    </em>
                    <br />
                    {comments.commenterComment}
                  </div>
                );
              })}
              <br />
              {post._id !== this.props.currentPost ? (
                <button
                  onClick={() => {
                    this.changeCurrentFocusedPost(post._id);
                  }}
                >
                  Add Comment
                </button>
              ) : (
                <div>
                  <button
                    onClick={() => {
                      this.changeCurrentFocusedPost("");
                    }}
                  >
                    Close Comment.
                  </button>
                  <CreateComment
                    createComment={this.props.createComment}
                    changeCurrentFocusedPost={this.changeCurrentFocusedPost}
                    currentPost={this.props.currentPost}
                    currentProfile={this.props.currentProfile}
                  />
                </div>
              )}
              <br />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Post;
