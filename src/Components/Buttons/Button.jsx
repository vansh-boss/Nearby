import styles from './Buttons.module.css';


export default function Button({
  children, variant = 'primary', size = 'md',
  fullWidth = false, loading = false, disabled = false,
  icon, onClick, type = 'button', className = '',
}) {
  return (
    <button
      type={type} onClick={onClick} disabled={disabled || loading}
      className={[styles.btn, styles[variant], styles[size],
        fullWidth ? styles.full : '', loading ? styles.loading : '', className].join(' ')}
    >
      {loading ? (
        <span className={styles.dots}><span/><span/><span/></span>
      ) : (
        <>{icon && <span className={styles.icon}>{icon}</span>}{children}</>
      )}
    </button>
  );
}