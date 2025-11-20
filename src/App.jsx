import { ThemeProvider } from './contexts/ThemeContext';
import SpotifyChatInterface from './components/SpotifyChatInterface';

function App() {
  return (
    <ThemeProvider>
      <SpotifyChatInterface />
    </ThemeProvider>
  );
}

export default App;