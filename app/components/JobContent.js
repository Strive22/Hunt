import React from 'react';
import { Button, Form, FormControl, FormGroup, ControlLabel, Grid, Col, Row, HelpBlock, Popover, OverlayTrigger } from 'react-bootstrap';
import Notes from './Notes';

// import picker from '../../server/config/picker';

class JobContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //Passing values to Notes
      Jobid: props.jobId,   
      userid: props.userId
    }
  }

  render () {
    const notesPop = (
      <Popover id="notes-pop" title="Add some notes!">Use this area as a place to store your own notes about a job you are interested in or working on.  We will save them and display them here for you every time you open this job.
      </Popover>
    );

    const pickerPop = (
      <Popover id="picker-pop" title="Grab your resume!">Press this button to grab documents you have already saved in Google Docs and associate them with this job.
      </Popover>
    );

    return (
      <div>
        {/*<Form>
          <FormGroup className="modal-form" controlId="notes">*/}
            <OverlayTrigger
              trigger={["hover", "focus"]}
              placement="right"
              overlay={notesPop}
            >
              <ControlLabel>
                  My Notes About This Job
              </ControlLabel>
            </OverlayTrigger>
            <Notes 
              userid={this.state.userid} 
              Jobid={this.state.Jobid}
            />
            {/*<FormControl className="modal-notes" componentClass="textarea" placeholder="Your notes here" />*/}
          {/*</FormGroup>*/}
          {/*<Button className="modal-btns">Save This Note</Button>*/}
        {/*</Form>*/}
        <hr/>
        {/*<OverlayTrigger
          trigger={['hover', 'focus']}
          placement="right"
          overlay={pickerPop}
        >
          <Button  
            className="open-picker"
            onClick={() => Picker(this.props.userId)}
          >
            Select Google Docs to Associate With This Job
          </Button>
        </OverlayTrigger>*/}
      </div>
    )
  }

}

module.exports = JobContent;
