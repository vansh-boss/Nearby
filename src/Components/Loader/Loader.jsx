import styles from './Loader.module.css';

export default function Loader({ size = 'md', fullscreen = false }) {
  const el = (
    <div className={`${styles.spinner} ${styles[size]}`}>
      <div /><div /><div />
    </div>
  );
  if (fullscreen) {
    return (
      <div className={styles.fullscreen}>
        <span className={styles.logo}>ConnectNearby</span>
        {el}
      </div>
    );
  }
  return el;
}