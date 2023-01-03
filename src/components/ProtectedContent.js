import React, {Component} from "react";
import Comments from "./Comments";

class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            isAuthenticated: false
        };
        this.correctPassword = '1234';  // specify the correct password here
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange = (event) => {
        this.setState({ password: event.target.value });
      }    
    
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.password === this.correctPassword) {
        this.setState({ isAuthenticated: true });
        } else {
        alert('Incorrect password');
        }
    }


    render() {
        console.log(this.props.comments);
        return (
          <div>
            {!this.state.isAuthenticated && (
              <form onSubmit={this.handleSubmit}>
                <label>
                  Password:
                  <input type="password" value={this.state.password} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
              </form>
            )}
            {this.state.isAuthenticated && (
                <Comments comments = {this.props.comments} />  // use this.props.comments instead of this.state.comments
            )}
          </div>
        );
      }    
    
}  

export default MyComponent
  