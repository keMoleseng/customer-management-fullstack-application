import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import ListCustomers from './components/ListCustomers';
import Header from './components/Header';
import Footer from './components/Footer';
import CreateCustomer from './components/CreateCustomer';
import ViewCustomer from './components/ViewCustomer';

function App() {
  return (
      <Router>
        <Header />
        <div class="container">
          <Routes>
            <Route path="/viewCustomer/:id" element={<ViewCustomer />} />
            <Route path="/add-customer/:id" element={<CreateCustomer />} />
            <Route path="/" element={<ListCustomers />} />
          </Routes>
        </div>
        <Footer />

      </Router>
    
  );
}

export default App;
