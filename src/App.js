import './index.css';
import Navbar from './components/Navbar';
import { Route, Routes, } from 'react-router-dom';
import Transaction from './components/Transaction';
import TransactionAdd from './components/TransactionAdd';
import TransactionEdit from './components/TransactionEdit';
function App() {
  return (
    <div >
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Transaction />} ></Route>
        <Route path='/add' element={<TransactionAdd />} ></Route>
        <Route path='/edit/:id' element={<TransactionEdit />} ></Route>
      </Routes>
    </div>
  );
}

export default App;
