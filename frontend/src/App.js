import './App.css';
import { ContextProvider } from './context/Context';
import { Router } from './router/Router';

function App() {
  return (
    <ContextProvider>
      <div className="App">
        <Router />
      </div>
    </ContextProvider>
  );
}

export default App;
