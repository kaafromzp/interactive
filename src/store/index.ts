import create from 'zustand';

const useStore = create( ( set ) => ( {
  // GETTERS
  enabled: true,
  channel: 1,
  mainColor: '#714DF3',
  activeTab: 'Channels',
  lightsEnabled: true,
  hoveredItem: false,
  // SETTERS
  setTVChannel: ( channel: number ) => {
    set( { channel } );
  },
  setActiveTab: ( activeTab: string ) => {
    set( { activeTab } );
  },
  setMainColor: ( mainColor: string ) => {
    set( { mainColor } );
  },
  toggleEnabled: ( ) => {
    set( ( state: any ) => ( { enabled: !state.enabled } ) );
  },
  setHoveredItem: ( hoveredItem: boolean ) => {
    set( { hoveredItem } );
  },
  setLightsEnabled: ( lightsEnabled: boolean ) => {
    set( { lightsEnabled } );
  }
} ) );

export default useStore;
