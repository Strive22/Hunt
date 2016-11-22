import React from 'react';
import Validation from 'react-validation'; 




Object.assign(Validation.rules, {
  
    required: {

    	rule: value => {
            return value
        },
       
        hint: value => {
            return <span className='form-error is-visible'>please Enter ZipCode</span>
        }

    },

  lenght: {

        rule: value => {
            return value.length == 5;
        },
       
        hint: value => {
            return <span className=' whitecolor '>please Enter  5 digits ZipCode</span>
        }

    }, 
    number:{
        rule: value => {
            return isNumeric(value);
        },
       
        hint: value => {
            return <span className='form-error is-visible'>please Enter only numbers</span>
        }

    },

    email: {
        // Example usage with external 'validator' 
        rule: value => {
            return validator.isEmail(value);
        },
        hint: value => {
            return <span className='form-error is-visible'>{value} isnt an Email.</span>
        }
    },



	});

module.exports = Validation ;