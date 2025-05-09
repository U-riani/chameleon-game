import "./App.css";
import { AppProvider } from "./contexts/AppContext";
import Game from "./views.js/Game";

function App() {
  return (
    <AppProvider>
      <>
        <div className="App bg-cyan-50 w-screen h-screen overflow-hidden">
          <Game />
        </div>
      </>
    </AppProvider>
  );
}

export default App;
