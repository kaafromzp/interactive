import React from 'react';
import './index.css';
import { Canvas } from '@react-three/fiber';
import { layersAll, layersRaycast } from '../../helpers/layers';
import ControlsOrbit from '../../components/ControlsOrbit';
import Scene from '../../components/Scene';

function App() {
  return (
    <div className='canvasContainer'>
      <Canvas
        camera={ {
          layers: layersAll,
          position: [
            40,
            40,
            40
          ]
        } }
        raycaster={ { layers: layersRaycast } }
      >
        <Scene/>
        <ControlsOrbit/>
      </Canvas>
    </div>
  );
}

export default App;
