import useStore from '../../store';
import styles from '../HtmlList/Html.module.sass';

export default function Settings () {
  const setMainColor = useStore( ( state ) => state.setMainColor );

  return (
    <div
      style={ { height: '36px', display: 'flex', zIndex: 2 } }
    >
      <label>Colors</label>
      <button
        onClick={ () => {
          setMainColor( '#735DA5' );
        } }
        className={ styles.uiButton }
      >1
      </button>
      <button
        onClick={ () => {
          setMainColor( '#20948B' );
        } }
        className={ styles.uiButton }
      >2
      </button>
      <button
        onClick={ () => {
          setMainColor( '#7A2048' );
        } }
        className={ styles.uiButton }
      >3
      </button>
      <button
        onClick={ () => {
          setMainColor( '#A1BE95' );
        } }
        className={ styles.uiButton }
      >4
      </button>
      <button
        onClick={ () => {
          setMainColor( '#F98866' );
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
  );
}
