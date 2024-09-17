import classNames from 'classnames';
import useStore from '../../store';
import styles from '../HtmlList/Html.module.sass';

export default function Channels () {
  const setTVChannel = useStore( ( state ) => state.setTVChannel );

  return (
    <div
      style={ { height: '36px', display: 'flex', zIndex: 2, gap: '10px' } }
    >
      <label style={ { fontWeight: 'bold' } }>Channels</label>
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
          className={ classNames( styles.uiButton ) }
        >{n}
        </button>
      ) )}
    </div>
  );
}
