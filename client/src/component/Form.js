import React, { useState,useEffect } from 'react';
import { FormTextArea, FormInput, FormGroup, Form } from 'semantic-ui-react';

const FormExampleSubcomponentControl = ({ onDataChange, name:initialName, description:initialDescription }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');


  useEffect(() => {
    setName(initialName);
    setDescription(initialDescription);
}, [initialName, initialDescription]);

  const handleNameChange = (e) => {
    setName(e.target.value);
    onDataChange({ name: e.target.value, description });
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    onDataChange({ name, description: e.target.value });
  };

  const handleSubmit = () => {
    onDataChange({ name: name, email: description });
};



  return (
    <Form>
    <FormGroup widths='equal'>
      <FormInput
        fluid
        label='Name'
        placeholder='Name'
        value={name}
        onChange={handleNameChange}
      />
    </FormGroup>
    <FormTextArea
      label='Description'
      placeholder='Software Engineer'
      value={description}
      onChange={handleDescriptionChange}
    />
  </Form>
  );
};

export default FormExampleSubcomponentControl;
