import React from 'react';
import { toast } from 'react-toastify';
import {
  ModalContent,
  ModalActions,
  Button,
  Header,
  Icon,
  Modal,
} from 'semantic-ui-react';

const ModalDelete = ({ handleDeleteUser, id }) => {

  const [open, setOpen] = React.useState(false);



  const handleDeleteConfirmation = async () => {
    await handleDeleteUser(id);
    setOpen(false);
    toast.warning('Delete User')
  };


  return (
    <Modal
      closeIcon
      open={open}
      trigger={<Button negative>Delete</Button>}

      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon='trash red' content='Delete User' />
      <ModalContent>
        <p>Are you sure you want to delete your user?</p>
      </ModalContent>
      <ModalActions>
        <Button color='red' onClick={() => setOpen(false)}>
          <Icon name='remove' /> No
        </Button>
        <Button color='green' onClick={handleDeleteConfirmation} >
          <Icon name='checkmark' /> Yes
        </Button>
      </ModalActions>
    </Modal>
  );
};

export default ModalDelete;
