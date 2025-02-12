
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import EMSApp from './component/EMSApp';
import AuthProvider from './component/security/AuthContext';

function App() {
  return (
   <>

    <BrowserRouter>

   <EMSApp/>
   </BrowserRouter>

</>
   
  );
}

export default App;
