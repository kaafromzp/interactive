import { Layers } from 'three';

const layersDefault = new Layers();
layersDefault.set( 0 );
const layersRaycast = new Layers();
layersRaycast.set( 1 );
const layersAll = new Layers();
layersAll.enableAll();

export {
  layersDefault,
  layersRaycast,
  layersAll
};
