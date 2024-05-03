import React from 'react';
import {
  ModalContent,
  ModalActions,
  Button,
  Header,
  Icon,
  Modal,
} from 'semantic-ui-react';
import FormExampleSubcomponentControl from './Form';

//IMPORT SERVICE
import {updateUser} from'../service/user.service'
import { toast } from 'react-toastify';

const ModalUpdate = ({handleGetData, name: initialName, description: initialDescription, _id}) => {

  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(initialName);
    setDescription(initialDescription);
  }, [initialName, initialDescription]);



  const hanldeGetDataComfirtion = async () => {
    await handleGetData(name, description);
    setOpen(true);
  }

  const handleUpdateUser = async () => {

   const res =  await updateUser(_id, name, description);
    setOpen(false);
    toast.success('User Update Succesfully')
   setTimeout(()=>{
    window.location.reload()
   },4000)

    
  }

  return (
    <Modal
      closeIcon
      open={open}
      trigger={<Button primary onClick={hanldeGetDataComfirtion}>Edit</Button>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon='edit' content='Update User'/>
      <ModalContent>
        <FormExampleSubcomponentControl
          name={name}
          description={description}
          onDataChange={({ name, description }) => {
            setName(name);
            setDescription(description);
          }}
        />
      </ModalContent>
      <ModalActions>
        <Button color='red' onClick={() => setOpen(false)}>
          <Icon name='remove' /> Cancel
        </Button>
        <Button color='green' onClick={handleUpdateUser}>
          <Icon name='checkmark' refs="true" /> Submit
        </Button>
      </ModalActions>
    </Modal>
  );
};

export default ModalUpdate;
