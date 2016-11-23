import React from 'react';
import Validation from 'react-validation';


Object.assign(Validation.rules, {

  required: {
    rule: value => {
      return value
    },
    hint: value => {
      return <span className='form-error is-visible'>Please enter your zipcode.</span>
    }
  },

  length: {
    rule: value => {
      return value.length == 5;
    },
    hint: value => {
      return <span className=' whitecolor '>Please enter a 5-digit zipcode.</span>
    }
  },

  number:{
    rule: value => {
      return isNumeric(value);
    },
    hint: value => {
      return <span className='form-error is-visible'>Please enter only numbers.</span>
    }
  },

  email: {
    // Example usage with external 'validator'
    rule: value => {
      return validator.isEmail(value);
    },
    hint: value => {
      return <span className='form-error is-visible'>{value} is not a valid email address.</span>
    }
  },


});

module.exports = Validation ;
