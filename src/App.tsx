import { BrowserRouter } from 'react-router-dom';
import Home from './pages/home/Home';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Home />
      </div>
    </BrowserRouter>
  );
}

export default App;