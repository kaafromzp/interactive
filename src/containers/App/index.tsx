import React from 'react';
import './index.css';
import { Canvas } from '@react-three/fiber';
import { Box } from '@react-three/drei';

function App() {
  return (
    <div className='canvasContainer'>
      <Canvas>
        <Box />
      </Canvas>
    </div>
  );
}

export default App;
