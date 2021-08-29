import styles from '../styles/PokeSpinner.module.css';

export function PokeSpinner() {
  return <img src="/pokeball.png" className={`${styles.pokeball} ${styles.spin}`} />
}