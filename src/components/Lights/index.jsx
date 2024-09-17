import useStore from '../../store';
import styles from '../HtmlList/Html.module.sass';

export default function Lights () {
  const setLightsEnabled = useStore( ( state ) => state.setLightsEnabled );

  return (
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
  );
}
