import React, { useState } from 'react';
import { ModalContent, ModalActions, Button, Header, Icon, Modal } from 'semantic-ui-react';
import FormExampleSubcomponentControl from './Form';
import { toast } from 'react-toastify';

//SERVICE
import { createUser } from '../service/user.service'


const ModalExampleCloseIcon = ({addNewUser}) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const handleDataChange = (data) => {
    setFormData(data);
  };

  const handleSubmit = async () => {

    const name = formData.name;
    const description = formData.description;
    if (name === undefined || description === undefined) {
      toast.error('Error ...')
    } else {
      let res = await createUser(name, description);
      addNewUser(res.data.data)
      setFormData('')
      setOpen(false)
      toast.success('User Created Successfully');
    }


  };


  return (
    <Modal
      closeIcon
      open={open}
      trigger={<Button className='btn-add'>Add New User - Todo</Button>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon='tags green' content='Add new User - Todo' />
      <ModalContent>
        <FormExampleSubcomponentControl onDataChange={handleDataChange} />
      </ModalContent>
      <ModalActions>
        <Button color='grey' onClick={() => setOpen(false)}>
          <Icon name='remove' /> Cancel
        </Button>
        <Button color='green' onClick={handleSubmit}>
          <Icon name='checkmark' /> Submit
        </Button>
      </ModalActions>
    </Modal>
  );
};

export default ModalExampleCloseIcon;