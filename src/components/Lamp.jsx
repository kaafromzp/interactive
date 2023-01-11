import { useMemo, useContext, createContext, useRef, useEffect } from 'react';
import { useGLTF, Merged } from '@react-three/drei';
import useStore from '../store';
import { Color } from 'three';

const context = createContext();
export function Instances( { children, ...props } ) {
  const { nodes } = useGLTF( '/assets/blacklamp.glb' );
  const instances = useMemo(
    () => ( {
      Plane: nodes.Plane005,
      Torus: nodes.Torus001
    } ),
    [nodes]
  );

  return (
    <Merged meshes={ instances } { ...props }>
      {( instances ) => <context.Provider value={ instances } children={ children } />}
    </Merged>
  );
}

export default function Lamp( props ) {
  const lightsEnabled = useStore( ( state ) => state.lightsEnabled );
  const mainColor = useStore( ( state ) => state.mainColor );

  const instances = useContext( context );
  const { nodes, materials } = useGLTF( '/assets/blacklamp.glb' );
  const ref = useRef( null );
  const spotRef = useRef( null );
  const pointRef = useRef( null );

  const lightColor = useMemo( () => new Color().set( mainColor )
    .convertSRGBToLinear()
    .lerp( new Color().setColorName( 'white' ), 0.015 )
  , [mainColor] );

  useEffect( () => {
    if ( spotRef.current ) {
      spotRef.current.color = lightColor;
    }
    if ( pointRef.current ) {
      pointRef.current.color = lightColor;
    }
  }, [lightColor] );

  return (
    <group ref={ ref } { ...props }>
      {
        lightsEnabled && (
          <group
            position={ [
              -1.2586,
              41.383,
              -0.9225
            ] }>
            <spotLight
              ref={ spotRef }
              color={ lightColor }
              angle={ Math.PI / 6 }
              penumbra={ 0.9 }
              target={ ref.current }
              intensity={ 10 }
            />
            <pointLight ref={ pointRef } color={ lightColor } intensity={ 1 }/>
          </group>
        )}
      <group rotation={ [
        Math.PI / 2,
        0,
        0
      ] }>
        <group position={ [
          0,
          0,
          -25.93
        ] } rotation={ [
          -Math.PI / 2,
          0,
          0
        ] }>
          <group position={ [
            0,
            16.52,
            0
          ] } rotation={ [
            0,
            -0.7,
            0
          ] }>
            <group position={ [
              0,
              0.56,
              0
            ] }>
              <mesh
                geometry={ nodes.Box002.geometry }
                material={ materials[ 'METAL::Smooth::Stainless Steel' ] }
                position={ [
                  -1.62,
                  -24.36,
                  0.22
                ] } rotation={ [
                  Math.PI / 2,
                  0,
                  -2.09
                ] } />
              <mesh
                geometry={ nodes.Cylinder006.geometry }
                material={ materials[ 'METAL::Smooth::Stainless Steel' ] }
                position={ [
                  -1.55,
                  -8.79,
                  0.15
                ] } />
              <instances.Plane position={ [
                -1.55,
                0.22,
                0.15
              ] } />
              <instances.Plane position={ [
                -1.55,
                0.22,
                0.15
              ] } rotation={ [
                -Math.PI,
                1.02,
                -Math.PI
              ] } />
              <instances.Plane position={ [
                -1.55,
                0.22,
                0.15
              ] } rotation={ [
                Math.PI,
                -1.04,
                Math.PI
              ] } />
              <instances.Torus position={ [
                -1.55,
                -7.42,
                0.15
              ] } />
              <instances.Torus position={ [
                -1.55,
                -6.45,
                0.15
              ] } scale={ [
                0.66,
                1,
                0.66
              ] } />
              <mesh
                geometry={ nodes.Torus002.geometry }
                material={ materials[ 'METAL::Smooth::Stainless Steel' ] }
                position={ [
                  -1.55,
                  8.44,
                  0.15
                ] } />
            </group>
            <mesh
              geometry={ nodes.Tube006.geometry }
              material={ materials[ 'METAL::Smooth::Stainless Steel' ] }
              position={ [
                -1.55,
                -7.95,
                0.15
              ] } />
          </group>
          <mesh
            geometry={ nodes.Box003.geometry }
            material={ materials[ 'METAL::Smooth::Stainless Steel' ] }
            position={ [
              1.95,
              -22.91,
              2.28
            ] } rotation={ [
              0,
              -0.7,
              0
            ] } />
          <mesh
            geometry={ nodes.Box004.geometry }
            material={ materials[ 'METAL::Smooth::Stainless Steel' ] }
            position={ [
              -0.29,
              -22.91,
              -5.29
            ] } rotation={ [
              0,
              1.4,
              0
            ] } />
          <mesh
            geometry={ nodes.Box005.geometry }
            material={ materials[ 'METAL::Smooth::Stainless Steel' ] }
            position={ [
              -5.63,
              -22.91,
              0.34
            ] } rotation={ [
              Math.PI,
              -Math.PI / 9,
              Math.PI
            ] } />
          <mesh
            geometry={ nodes.Cylinder002.geometry }
            material={ materials[ 'METAL::Smooth::Stainless Steel' ] }
            position={ [
              -1.26,
              -7.43,
              -0.92
            ] } scale={ [
              1.27,
              1,
              1.27
            ] } />
          <mesh
            geometry={ nodes.Object003.geometry }
            material={ materials[ 'METAL::Smooth::Stainless Steel' ] }
            position={ [
              -1.28,
              -7.43,
              -0.88
            ] } rotation={ [
              0,
              -0.7,
              0
            ] } scale={ [
              1.27,
              1,
              1.27
            ] } />
          <mesh
            geometry={ nodes.Sphere003.geometry }
            material={ materials[ '18 - Default' ] }
            position={ [
              -1.26,
              14.38,
              -0.92
            ] } />
          <mesh
            geometry={ nodes.Tube004.geometry }
            material={ materials[ 'METAL::Smooth::Stainless Steel' ] }
            position={ [
              -1.28,
              17.3,
              -0.88
            ] } rotation={ [
              0,
              0.09,
              0
            ] } />
          <mesh
            geometry={ nodes.Tube007.geometry }
            material={ materials[ 'METAL::Smooth::Stainless Steel' ] }
            position={ [
              -1.28,
              -25.93,
              -0.88
            ] } rotation={ [
              0,
              -0.7,
              0
            ] } scale={ [
              0.91,
              1,
              0.91
            ] } />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload( '/assets/blacklamp.glb' );
