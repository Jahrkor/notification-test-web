import "./App.css";
import "primeicons/primeicons.css";
import "/node_modules/primeflex/primeflex.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import SubmissionForm from "./components/SubmissionForm.tsx";
import LogHistory from "./components/LogHistory.tsx";

function App() {
  return (
    <>
      <div>
        <h1>Notification Test</h1>
      </div>
      <SubmissionForm></SubmissionForm>
      <LogHistory></LogHistory>
    </>
  );
}

export default App;
