import './App.css';
import Home from './Home';
import ContactList from './ContactList';
import User from './User';
import McDonalds from './McDonalds';
import ContactDetailView from './ContactDetailView';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ContactData from './data.json';
import { v4 as uuidv4 } from 'uuid';

function App() {

  const contacts = ContactData.map(contact => {
    return { ...contact, id: uuidv4() }
  })

  return (
    <BrowserRouter>
      <div>
        <div className="Navbar">
          <Link to="/"><div>Home</div></Link>
          <Link to="/User"><div>User</div></Link>
        </div>
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/User" element={ <User /> } />
          <Route path="/McDonalds" element={ <ContactList contacts={ contacts }/> } />
          <Route path="/contacts" element={ <ContactList contacts={ contacts }/> } >
          <Route path=":contactId" element={ <ContactDetailView contacts={ contacts } /> } />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
