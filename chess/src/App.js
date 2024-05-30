import './App.css';
import Chessboard from './ChessBoard';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <Chessboard />
      </div>
    </DndProvider>
  );
}

export default App;