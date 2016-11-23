import React from 'react';
import { Button, Form, FormControl, FormGroup, ControlLabel, Grid, Col, Row, HelpBlock, Popover, OverlayTrigger } from 'react-bootstrap';

class JobContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render () {
    const notesPop = (
      <Popover id="popover-positioned-right" title="Add some notes!"> Use this area as a place to store your own notes about a job you're interested in or working on.  We'll save them and display them here for you every time you open this job.
      </Popover>
    );

    return (
      <div>
        <Form>
          <FormGroup className="modal-form" controlId="notes">
            <OverlayTrigger
              trigger="hover"
              placement="right"
              overlay={notesPop}
            >
              <ControlLabel>
                  My Notes About This Job
              </ControlLabel>
            </OverlayTrigger>
            <FormControl className="modal-notes" componentClass="textarea" placeholder="Your notes here" />
          </FormGroup>
          <Button className="modal-btns">Save This Note</Button>
          <HelpBlock>Your saved notes will be displayed below.</HelpBlock>
        </Form>
        <hr/>
        Some dummy text where other things will go
      </div>
    )
  }

}

module.exports = JobContent;
