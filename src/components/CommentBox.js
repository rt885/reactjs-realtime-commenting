import React, {Component} from 'react';
import axios from 'axios';
import Ably from './Ably';

class CommentBox extends Component {
    constructor(props) {
        super(props)
        this.addComment = this.addComment.bind(this)
    }
    async addComment(e) {
        //Prevent default ehavior of the form submit
        e.preventDefault()
        // Get the value from the comment box
        // and make sure its not empty
        const comment = e.target.elements.comment.value.trim()
        const name = e.target.elements.name.value.trim()
        // Get the current time
        const timestamp = Date.now()
        // retrive a random image from DogAPI
        const avatar = await (
            await axios.get("https://dog.ceo/api/breeds/image/random")
        ).data.message
        // Make sure name and comments are filled
        if (name && comment) {
            const commentObject = {name, comment, timestamp, avatar}
            console.log(commentObject)
            // Publish comment
            const channel = Ably.channels.get("comments")
            channel.publish("add_comment", commentObject, (err) => {
                if (err) {
                    console.log("Unable tu publish. Message err = " + err.message)
                }
            })
            // Clear input fields
            e.target.elements.name.value = ""
            e.target.elements.comment.value = ""
        }
    }
    render() {
        return (
            <div>
                <h1 className=''>Enter your problem</h1>
                <form onSubmit={this.addComment}>
                    <div className='field'>
                        <div className='control'>
                            <input type="text" className='input' name='name' placeholder='Your Name' />
                        </div>
                    </div>
                    <div className='field'>
                        <div className='control'>
                            <textarea className='textarea' name='comment' placeholder='add a comment'></textarea>
                        </div>
                    </div>
                    <div className='field'>
                        <div className='control'>
                            <button className='button is-primary'>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default CommentBox;