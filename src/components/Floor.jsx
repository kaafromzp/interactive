import { useTexture } from '@react-three/drei';
import React from 'react';

function Floor() {
  const [
    map,
    normalMap,
    roughnessMap,
    metalnessMap,
    // aoMap,
    displacementMap
  ] = useTexture( [
    '/assets/map.png',
    '/assets/normalMap.png',
    '/assets/roughnessMap.png',
    '/assets/metalnessMap.png',
    '/assets/aoMap.png',
    '/assets/displacementMap.png'
  ] );


  return (
    <mesh receiveShadow rotation-x={ -Math.PI / 2 } position-y={ -0.525 }>
      <meshStandardMaterial
        map={ map }
        normalMap={ normalMap }
        envMapIntensity={ 0.05 }
        roughnessMap={ roughnessMap }
        metalnessMap={ metalnessMap }
        // aoMap={ aoMap }
        displacementMap={ displacementMap }
      />
      <planeGeometry args={ [
        100,
        100,
        100,
        100
      ] } />
    </mesh>
  );
}

export default Floor;
