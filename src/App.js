import './App.css';
import Home from './Home';
import User from './User';
import Cart from './Cart';
import Login from './Login';
import CreateAccount from './CreateAccount';
import ContactList from './ContactList';
import ContactListBK from './ContactListBK';
import ContactDetailView from './ContactDetailView';
import ContactDetailViewBK from './ContactDetailViewBK';
import ContactData from './data.json';
import ContactDataBK from './dataBK.json';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function App() {

  const contacts = ContactData.map(contact => {
    return { ...contact, id: uuidv4() }
  })

  const contactsBK = ContactDataBK.map(contactBK => {
    return { ...contactBK, id: uuidv4() }
  })

  return (
    <BrowserRouter>
      <div>
        <div className="Navbar">
          <Link to="/"><div>Home</div></Link>
          <Link to="/User"><div>User</div></Link>
          <Link to="/Cart"><div>Cart</div></Link>
          <Link to="/Login"><div>Login</div></Link>
        </div>
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/User" element={ <User /> } />
          <Route path="/Cart" element={ <Cart /> } />
          <Route path="/Login" element={ <Login /> } />
          <Route path="/CreateAccount" element={ <CreateAccount /> } />
          <Route path="/contacts" element={ <ContactList contacts={ contacts }/> } >
          <Route path=":contactId" element={ <ContactDetailView contacts={ contacts } /> } />
          </Route>
        </Routes>
        <Routes>
          <Route path="/contactsBK" element={ <ContactListBK contactsBK={ contactsBK }/> } >
          <Route path=":contactIdBK" element={ <ContactDetailViewBK contactsBK={ contactsBK } /> } />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
