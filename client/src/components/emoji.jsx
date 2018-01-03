/*import React from 'react';
import EmojiPicker from 'emoji-picker';
import emojiMap from 'react-emoji-picker/lib/emojiMap';

var emojiPickerStyles = {
  position: 'absolute',
  left: 0, top: '3.9rem',
  backgroundColor: 'white',
  width: '100%',
  padding: '.3em .6em',
  border: '1px solid #0074d9',
  borderTop: 'none',
  zIndex: '2'
};

class MyEmojiInput extends React.Component{
  getInitialState (){
    return {
      emoji: null,
      showEmojiPicker: false,
    }
  }
 
  componentDidMount () {
    document.addEventListener('click', this.toggleEmojiPicker, false)
  }
 
  componentWillUnmount () {
    document.removeEventListener('click', this.toggleEmojiPicker, false)
  }
 
  toggleEmojiPicker(e) {
    if(this.refs.emoji.contains(e.target)) {
      this.setState({showEmojiPicker: true});
    } else {
      setTimeout(this.validateEmoji, 10)
      this.setState({showEmojiPicker: false});
    }
  }
 
  validateEmoji () {
    var matched = emojiMap.filter(function(emoji) {
      return `:${emoji.name}:` === this.state.emoji
    })
 
    if(matched.length === 0) {
      this.setState({emoji: null})
    }
  }
 
  updateState(e) {
    this.setState({emoji: e.target.value})
  }
 
  setEmoji(emoji){
    this.setState({emoji: emoji})
  }
 
  // allows selecting first emoji by pressing "Enter" without submitting form 
  grabKeyPress(e) {
    if(e.keyCode === 13) {
      e.preventDefault()
    }
  }
 
  emojiPicker(){
    if(this.state.showEmojiPicker) {
      return (
        <EmojiPicker
          style={emojiPickerStyles} onSelect={this.setEmoji}
          query={this.state.emoji}
        />
      )
    }
  }
 
  render() {
    return (
      <p ref="emoji">
        <label htmlFor="emoji">Emoji</label>
        <input name="emoji" id="emoji" value={this.state.emoji} autoComplete="off"
          type={this.state.showEmojiPicker ? "search" : "text"}
          onChange={this.updateState} onKeyDown={this.grabKeyPress}/>
        {this.emojiPicker()}
      </p>
    )
  }
}
 
export default MyEmojiInput;

*/
