import reducer from "./Store/reducer";
import { LayoutContainer } from "./hooks/useLayoutContainer";
import LayoutForm from "./Components/LayoutForm";
// import "./App.css";

function App() {
  return (
    <reducer.Provider>
      <LayoutContainer.Provider>
        <div className="App">
          <LayoutForm />
        </div>
      </LayoutContainer.Provider>
    </reducer.Provider>
  );
}

export default App;
