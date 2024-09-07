import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { FiltersProvider } from './context/Filters.jsx'
import './index.css'
import { UserProvider } from './context/User.jsx'
import Modal from 'react-modal';

Modal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById('root')).render(
<UserProvider> 
<FiltersProvider>     
    <App />
 </FiltersProvider> 
</UserProvider>

)
