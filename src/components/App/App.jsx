import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const elements = useSelector(store => store.elementList);
  const [newElement, setNewElement] = useState('');

  const getElements = () => {
    fetch('/api/element')
      .then(response => response.json())
      .then((elements) => {
        dispatch({ type: 'SET_ELEMENTS', payload: elements });
      })
      .catch(error => {
        console.log('error with element get request', error);
      });
  };

  useEffect(() => {
    getElements();
  }, []);

  const addElement = () => {
    fetch('/api/element', {
      method: 'POST',
      body: JSON.stringify({ name: newElement }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(() => {
        // getElements();
        dispatch({ type: 'FETCH_ELEMENTS' });
        setNewElement('');
      })
      .catch(error => {
        console.log('error with element get request', error);
      });
  };

  return (
    <div>
      <h1>Atomic Elements</h1>

      <ul>
        {elements.map(element => (
          <li key={element}>
            {element}
          </li>
        ))}
      </ul>

      <input
        value={newElement}
        onChange={evt => setNewElement(evt.target.value)}
      />
      <button onClick={addElement}>Add Element</button>
    </div>
  );
}

export default App;
