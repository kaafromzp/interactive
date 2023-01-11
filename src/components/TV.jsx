import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import List from './HtmlList';
import Html3D from './Html3D/Html3D';
import { MeshBasicMaterial, NoBlending, FrontSide, Raycaster, Vector2 } from 'three';
import { layersAll, layersRaycast } from '../helpers/layers';
import { useFrame, useThree } from '@react-three/fiber';
import useStore from '../store';

export function TV() {
  const enabled = useStore( ( state ) => state.enabled );

  const toggleEnabled = useStore( ( state ) => state.toggleEnabled );
  const setHoveredItem = useStore( ( state ) => state.setHoveredItem );

  const { nodes, materials } = useGLTF( '/assets/LG.glb' );

  const holeMaterial = useMemo( () => new MeshBasicMaterial( {
    color: 'black',
    transparent: true,
    opacity: 0,
    blending: NoBlending,
    side: FrontSide
  } ), [] );

  const { scene, camera } = useThree();
  window.scene = scene;
  window.camera = camera;

  // const onPDown = useCallback( ( e ) => {
  //   const raycaster = new Raycaster();
  //   raycaster.layers = layersAll;
  //   raycaster.setFromCamera( new Vector2(), camera );
  //   const intersections = raycaster.intersectObject( scene, true );
  //   console.log( intersections );
  // }, [camera, scene] );

  // useEffect( () => {
  //   window.addEventListener( 'pointerdown', onPDown );

  //   return () => {
  //     window.removeEventListener( 'pointerdown', onPDown );
  //   };
  // }, [onPDown] );

  useFrame( () => {
    const index = camera.position.x >= 0 ? 1 : -1;
    if ( ( index ) !== zIndex ) {
      setIndex( index );
    }
  } );

  const [zIndex, setIndex] = useState( 1 );

  const setHovered = useCallback( ( bool ) => ( e ) => {
    e.stopPropagation();
    setHoveredItem( bool );
  }, [setHoveredItem] );

  const onPointerDown = useCallback( ( e ) => {
    e.stopPropagation();
    toggleEnabled();
  }, [toggleEnabled] );

  return (
    <group>
      <group>
        <mesh
          layers={ layersRaycast }
          onPointerDown={ onPointerDown }
          onPointerOver={ setHovered( true ) }
          onPointerOut={ setHovered( false ) }
          geometry={ nodes.samsungLG_ultra_HD_primitive0.geometry }
          material={ materials.tv_logo_white }
        />
        <mesh
          layers={ layersRaycast }
          onPointerDown={ onPointerDown }
          onPointerOver={ setHovered( true ) }
          onPointerOut={ setHovered( false ) }
          geometry={ nodes.samsungLG_ultra_HD_primitive1.geometry }
          material={ materials.tv_logo_red }
        />
        <mesh
          geometry={ nodes.samsungLG_ultra_HD_primitive2.geometry }
          material={ materials.tv_legs_top }
        />
        <mesh
          layers={ layersRaycast }
          geometry={ nodes.samsungLG_ultra_HD_primitive3.geometry }
          material={ holeMaterial }
        />
        <mesh
          geometry={ nodes.samsungLG_ultra_HD_primitive4.geometry }
          material={ materials.tv_back_side }
        />
        <mesh
          geometry={ nodes.samsungLG_ultra_HD_primitive5.geometry }
          material={ materials.tv_front_side }
        />
        <mesh
          layers={ layersRaycast }
          onPointerDown={ onPointerDown }
          onPointerOver={ setHovered( true ) }
          onPointerOut={ setHovered( false ) }
          geometry={ nodes.samsungLG_ultra_HD_primitive6.geometry }
          material={ materials.tv_front_bottom_side }
        />
        <mesh
          geometry={ nodes.samsungLG_ultra_HD_primitive7.geometry }
          material={ materials.tv_legs_bottom }
        />
      </group>
      {enabled && <Html3D
        zIndexRange={ [zIndex, zIndex] }
        scale={ [
          2,
          2,
          2
        ] }
        rotation={ Math.PI / 2 }
        position={ [
          1.15,
          16.2285,
          0
        ] }
        component={ List }
      />
      }
    </group>
  );
}

useGLTF.preload( '/assets/LG.glb' );
