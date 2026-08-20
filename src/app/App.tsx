import '../App.css';
import WorkspaceEditor from '../features/workspace/WorkspaceEditor';

import { appMetadata } from './appMetadata';

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>{appMetadata.name}</h1>
          <p>{appMetadata.description}</p>
        </div>
      </header>

      <main className="app-content">
        <section aria-labelledby="welcome-heading">
          <h2 id="welcome-heading">Welcome to OpenAPI Studio</h2>
          <p>The application foundation is ready.</p>
        </section>
        <WorkspaceEditor />
      </main>
    </div>
  );
}

export default App;
