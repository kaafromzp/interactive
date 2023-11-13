import { Environment } from '@react-three/drei';
import React, { Suspense } from 'react';
import Floor from './Floor';
import Lamp, { Instances } from './Lamp';
import { TV } from './TV';

function Scene() {
  return (
    <>
      <Environment map={ './assets/map.hdr' } />
      <Floor/>
      {/* <Effects/> */}
      <Suspense fallback={ null }>
        <TV/>
        <Instances>
          <Lamp
            position={ [
              0,
              0,
              40
            ] }
            scale={ [
              0.5,
              0.5,
              0.5
            ] }
          />
          <Lamp
            position={ [
              0,
              0,
              -40
            ] }
            scale={ [
              0.5,
              0.5,
              0.5
            ] }
          />
        </Instances>
      </Suspense>
    </>
  );
}

export default Scene;
