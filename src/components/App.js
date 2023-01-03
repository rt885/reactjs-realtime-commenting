import React, {Component} from "react";
import CommentBox from "./CommentBox";
import Ably from "./Ably";
import ProtectedContent from './ProtectedContent';


class App extends Component {
  constructor(props) {
    super(props)
    this.handleAddComment = this.handleAddComment.bind(this)
    this.state = {
      comments: []
    }
  }
  handleAddComment(comment) {
    this.setState(prevState => {
      return {
        comments: [comment].concat(prevState.comments),
      }
    })
  }
  componentDidMount() {
    const channel = Ably.channels.get("comments")

    channel.attach()
    channel.once("attached", () => {
      channel.history((err, page) => {
        //Create a new array whit comments in reverse order (old to new)
        const comments = Array.from(page.items, (item) => item.data)
        this.setState({comments})
        channel.subscribe((msg) => {
          this.handleAddComment(msg.data)
        })
      })
    })
  }
  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-half is-offset-one-quarter">
              <CommentBox />
              <ProtectedContent comments={this.state.comments} />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default App