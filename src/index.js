import { createRoot } from 'react-dom/client';
import App from './components/app/app';
import 'bootstrap/dist/css/bootstrap.css';
import './index.sass';

createRoot(document.getElementById('root')).render(<App />);