import './App.css';
import Home from './Home';
import User from './User';
import Settings from './Settings';
import ContactList from './ContactList';
import ContactListBK from './ContactListBK';
import ContactListHS from './ContactListHS';
import ContactDetailView from './ContactDetailView';
import ContactDetailViewBK from './ContactDetailViewBK';
import ContactDetailViewHS from './ContactDetailViewHS';
import ContactData from './data.json';
import ContactDataBK from './dataBK.json';
import ContactDataHS from './dataHS.json';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function App() {

  const contacts = ContactData.map(contact => {
    return { ...contact, id: uuidv4() }
  })

  const contactsBK = ContactDataBK.map(contactBK => {
    return { ...contactBK, id: uuidv4() }
  })

  const contactsHS = ContactDataHS.map(contactHS => {
    return { ...contactHS, id: uuidv4() }
  })

  return (
    <BrowserRouter>
      <div>
        <div className="Navbar">
          <Link to="/"><div><img class="navbarIcons" src="../Images/HomeIcon.png" alt="HomeIcon"/>Home</div></Link>
          <Link to="/User"><div><img class="navbarIcons" src="../Images/UserIcon.png" alt="UserIcon"/>User</div></Link>
        </div>
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/User" element={ <User /> } />
          <Route path="/Settings" element={ <Settings /> } />
          <Route path="/contacts" element={ <ContactList contacts={ contacts }/> } >
          <Route path=":contactId" element={ <ContactDetailView contacts={ contacts } /> } />
          </Route>
        </Routes>
        <Routes>
          <Route path="/contactsBK" element={ <ContactListBK contactsBK={ contactsBK }/> } >
          <Route path=":contactIdBK" element={ <ContactDetailViewBK contactsBK={ contactsBK } /> } />
          </Route>
        </Routes>
        <Routes>
          <Route path="/contactsHS" element={ <ContactListHS contactsHS={ contactsHS }/> } >
          <Route path=":contactIdHS" element={ <ContactDetailViewHS contactsHS={ contactsHS } /> } />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
