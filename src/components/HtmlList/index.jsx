import React, { useEffect, useRef } from 'react';
import styles from './Html.module.sass';
import classnames from 'classnames';
import useStore from '../../store';
import { hexToRgb } from '../../helpers/color';

function List() {
  const activeTab = useStore( ( state ) => state.activeTab );
  const mainColor = useStore( ( state ) => state.mainColor );
  const channel = useStore( ( state ) => state.channel );

  const setActiveTab = useStore( ( state ) => state.setActiveTab );
  const setTVChannel = useStore( ( state ) => state.setTVChannel );
  const setMainColor = useStore( ( state ) => state.setMainColor );
  const setLightsEnabled = useStore( ( state ) => state.setLightsEnabled );

  const ref = useRef( null );
  console.log( 'List', channel );
  useEffect( () => {
    if ( ref.current ) {
      ref.current.style.setProperty( '--mainColor', mainColor );
      ref.current.style.setProperty( '--mainColorRGB', hexToRgb( mainColor ) );
    }
  }, [mainColor] );

  return (
    <div ref={ ref } style={ { width: '100%', height: '100%' } }>
      <div style={ { position: 'absolute', width: '100%', height: '100%', zIndex: 1 } }>
        <video
          key ={ `/assets/${ channel }.mp4` }
          muted
          autoPlay
          loop
          style={ { width: '100%', height: '100%', zIndex: 1, cursor: 'grab' } }
        >
          <source src={ `/assets/${ channel }.mp4` } type='video/mp4'/>
        </video>
      </div>
      <div
        style={ {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        } }>
        <div style={ { height: '36px', display: 'flex', zIndex: 2 } }>
          <button
            onClick={ () => {
              setActiveTab( 'Channels' );
            } }
            className={ classnames( styles.uiButton ) }
          >Channels
          </button>
          <button
            onClick={ () => {
              setActiveTab( 'Settings' );
            } }
            className={ `${ styles.uiButton }` }
          >Settings
          </button>
          <button
            onClick={ () => {
              setActiveTab( 'Lights' );
            } }
            className={ styles.uiButton }
          >Lights
          </button>
        </div>
        {
          activeTab === 'Channels' && (
            <div
              style={ { height: '36px', display: 'flex', zIndex: 2 } }
            >
              {[
                1,
                2,
                3,
                4,
                5,
                6
              ].map( ( n ) => (
                <button
                  key={ n }
                  onClick={ () => {
                    setTVChannel( n );
                  } }
                  className={ classnames( styles.uiButton ) }
                >{n}
                </button>
              ) )}
            </div>
          )
        }
        {
          activeTab === 'Settings' && (
            <div
              style={ { height: '36px', display: 'flex', zIndex: 2 } }
            >
              <label>Colors</label>
              <button
                onClick={ () => {
                  setMainColor( '#620290' );
                } }
                className={ styles.uiButton }
              >1
              </button>
              <button
                onClick={ () => {
                  setMainColor( '#714DF3' );
                } }
                className={ styles.uiButton }
              >2
              </button>
              <button
                onClick={ () => {
                  setMainColor( '#974D05' );
                } }
                className={ styles.uiButton }
              >3
              </button>
              <button
                onClick={ () => {
                  setMainColor( '#25A017' );
                } }
                className={ styles.uiButton }
              >4
              </button>
              <button
                onClick={ () => {
                  setMainColor( '#757211' );
                } }
                className={ styles.uiButton }
              >5
              </button>
              <button
                onClick={ () => {
                  setMainColor( '#901433' );
                } }
                className={ styles.uiButton }
              >6
              </button>
            </div>
          )
        }
        {
          activeTab === 'Lights' && (
            <div
              style={ { height: '36px', display: 'flex', zIndex: 2 } }
            >
              <label>Lights</label>
              <button
                onClick={ () => {
                  setLightsEnabled( true );
                } }
                className={ styles.uiButton }
              >Enable
              </button>
              <button
                onClick={ () => {
                  setLightsEnabled( false );
                } }
                className={ styles.uiButton }
              >Disable
              </button>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default List;
