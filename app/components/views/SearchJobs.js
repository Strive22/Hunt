import React from 'react';
import { Button, Checkbox, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

export default (props) => {

    return (
      <div className="selectbox">
        <h2>Search<br/>for Jobs</h2>
        <FormGroup
            controlId="formBasicText"
          >
            <ControlLabel>Keyword Search</ControlLabel>
            <FormControl
              type="text"
              placeholder="ex: developer/Javascript"
              onChange={props.keywordChange}
            />
            <FormControl.Feedback />

            <ControlLabel>Pick a Job Service</ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="select"
              onChange={props.providerChange}
            >
              <option value="github">GitHub</option>
              <option value="indeed">Indeed</option>
              <option value="authentic">Authentic Jobs</option>
            </FormControl>

            <Button type="submit">Get Hired!</Button>
            <Button onClick={props.logIt}>check state</Button>
          </FormGroup>
      </div>
    );
};
