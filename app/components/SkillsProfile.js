import React from 'react';
const ReactBootstrap = require('react-bootstrap');
import axios from 'axios';
const Grid = ReactBootstrap.Grid,
      Row = ReactBootstrap.Row,
      Col = ReactBootstrap.Col,
      Form = ReactBootstrap.Form,
      FormGroup = ReactBootstrap.FormGroup,
      ControlLabel = ReactBootstrap.ControlLabel,
      FormControl = ReactBootstrap.FormControl,
      HelpBlock = ReactBootstrap.HelpBlock;

class Skills extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      value: '',
      prompt: "List your tech skills -- separated by commas"
    }
    this.handleChange = this.handleChange.bind(this);
  }

  checkValue(){
    var result = 0;
    for(var i = 0; i<this.state.value.length; i++){
      if(this.state.value[i] === ","){result += 1;}
    } return result;
  }
  getValidationState () {
    const length = this.state.value.length;
    if (length > 0) return 'success';
    else if (length === 0) return 'error';
    // else if (length > 0) return 'error';
  }
  commaCount(){
    // const monkey = this.getValidationState();
    const commas = this.checkValue()
    if(commas === 1){
      this.setState({prompt: "Cool, what else can you do?"})
    } else if(commas === 2){
        this.setState({prompt: "Terrific, keep going!"})
      } else if (commas >= 3) {
        this.setState({prompt: "Wow, you got skills.. Can you think of any more?" })
        } else if (commas === 0) {this.setState({ prompt: "List your tech skills -- separated by commas"})}
  }
  handleChange (event) {
    this.setState({ value: event.target.value});
    this.commaCount();
  }
  render () {

    return (
      <Form>

        <FormGroup
            controlId="formBasicText"
            validationState={this.getValidationState()}
          >
            <ControlLabel>{this.state.prompt}</ControlLabel>
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="List Your Tech Skills"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>

      </Form>
    )
  }
}
module.exports = Skills


