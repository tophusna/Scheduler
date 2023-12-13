import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux'
import store from './redux/store';
import bgImage from './assets/images/leather.jpg'

import './styles/App.css';
import 'font-awesome/css/font-awesome.min.css'; // Импорт стилей Font Awesome
import 'roboto-fontface/css/roboto/roboto-fontface.css'; // Импорт стилей Roboto
import PROJECT_ROUTES from './routes/PROJECT_ROUTES';

function App() {

  useEffect(() => {
    document.body.style.backgroundImage = `url(${bgImage})`;
  }, [])


  return (
    <div className="App">
      <header className="App-header">
        <ReduxProvider store={store}>
          <Router>
            <Routes>
              {PROJECT_ROUTES.map(({ path, component }) => <Route path={path} element={component} key={path} />)}
            </Routes>
          </Router>
        </ReduxProvider>
      </header>
    </div>
  );
}
export default App;

