import React from 'react';
import { Html } from '@react-three/drei';
import styles from './Html3D.module.scss';

export default function Html3D( { position, rotation, scale, component, zIndexRange } ) {
  return (
    <group position={ position } rotation-y={ rotation } scale={ scale }>
      <Html transform prepend zIndexRange={ zIndexRange } className={ styles.containerStyle }>
        <div
          className={ styles.fullSizeStyle }
        >
          {component()}
        </div>
      </Html>
    </group>
  );
}
