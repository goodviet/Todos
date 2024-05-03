import 'semantic-ui-css/semantic.min.css'
import TableList from './component/TableList';
import { Container } from 'semantic-ui-react';
import NotifySuccess from './component/notifysuccess';
import Navigation from './component/nav';


function App() {
  return (
    <>
      <div className='app-container'>

      <Navigation/>

        <Container>
        <h1 className='bn-text'>TODO's</h1>
          <TableList />
        </Container>
      </div>
      <NotifySuccess />


    </>
  );
}

export default App;
