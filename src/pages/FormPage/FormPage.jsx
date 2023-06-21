import React from 'react';
import Form from '../../components/Form/Form';
import './FormPage.css';


function FormPage(data) {
  return (
    <div>
        <Form data={data}/>
    </div>
  );
}

export default FormPage;