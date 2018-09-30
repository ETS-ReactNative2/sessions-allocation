import React, { Component } from 'react';
import { Form } from '../../../../components/Forms';
import { FlexItem, FlexContainer } from '../../../../components/Layout';
import ExaminersFormContent from './ExaminersFormContent';

class VenuesForm extends Component {
  componentDidMount(){
    // const { selectedVenue } = this.props;
    // selectedVenue && this.props.handlers.fetchRecord(selectedVenue);
  }

  componentWillUnmount(){
    // this.props.clearSelectedVenue();
  }
  
  render() {
    const { handlers, values, shouldValidate, selectedExaminer } = this.props;
    const label = selectedExaminer !== null ? 'Save changes' : 'Add examiner';
    return (
        <Form handlers={handlers} label={label}>
          <FlexContainer>
            <FlexItem>
              <ExaminersFormContent 
                values={values} 
                handlers={handlers} 
                shouldValidate={shouldValidate} 
                group={1} />    
            </FlexItem>
            <FlexItem>
              <ExaminersFormContent 
                values={values} 
                handlers={handlers} 
                shouldValidate={shouldValidate} 
                group={2} />    
            </FlexItem>
          </FlexContainer>
        </Form>
    )
  }
};


export default VenuesForm;

