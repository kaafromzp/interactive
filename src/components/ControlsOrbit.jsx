import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React, { useEffect, useState } from 'react';
import useStore from '../store';

function ControlsOrbit() {
  const hoveredItem = useStore( ( state ) => state.hoveredItem );

  const { gl } = useThree();

  const [mouseDown, setMouseDown] = useState( false );

  // const canvas = useMemo( () => document.getElementById( 'canvas' ), [] );
  useEffect( () => {
    gl.domElement.style.cursor = mouseDown ? 'grabbing' : ( hoveredItem ? 'pointer' : 'grab' );
  }, [
    gl.domElement,
    hoveredItem,
    mouseDown
  ] );

  useEffect( () => {
    const onMouseUp = () => {
      setMouseDown( false );
      window.removeEventListener( 'mouseup', onMouseUp );
    };

    const onMouseDown = ( e ) => {
      if ( e.buttons !== 1 ) {
        return;
      }

      setMouseDown( true );
      window.addEventListener( 'mouseup', onMouseUp );
    };

    gl.domElement.addEventListener( 'mousedown', onMouseDown );

    return () => {
      if ( gl.domElement ) {
        gl.domElement.removeEventListener( 'mousedown', onMouseDown );
      }
    };
  }, [gl.domElement, setMouseDown] );

  return <OrbitControls/>;
}

export default ControlsOrbit;
