import { Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import styles from './About.module.css';

const STEPS = [
  {
    n: 1,
    title: 'Create account',
    desc: 'Register with your name, email & interests'
  },
  {
    n: 2,
    title: 'Find nearby people',
    desc: 'See users around your 2km location radius'
  },
  {
    n: 3,
    title: 'Chat & connect',
    desc: 'Send shoutouts, notes and start conversations'
  },
];

export default function About() {

  return (

    <div className={styles.page}>

      <div className={styles.logo}>
        Metivo
      </div>

      <h1 className={styles.heading}>
        Meet people nearby 👋
      </h1>

      <p className={styles.sub}>
        A simple social app to discover and connect with people around you.
      </p>

      {/* HOW APP WORKS */}

      <section className={styles.section}>

        <h2 className={styles.sectionTitle}>
          How to use
        </h2>

        {STEPS.map(({ n, title, desc }) => (

          <div
            key={n}
            className={styles.step}
          >

            <div className={styles.stepNum}>
              {n}
            </div>

            <div className={styles.stepText}>
              <strong>{title}</strong>
              <br />
              {desc}
            </div>

          </div>

        ))}

      </section>

      {/* FEATURES */}

      <section className={styles.section}>

        <h2 className={styles.sectionTitle}>
          Features
        </h2>

        <div className={styles.featureBox}>

          <div className={styles.feature}>
            <span>📍</span>
            <p>Nearby users</p>
          </div>

          <div className={styles.feature}>
            <span>💬</span>
            <p>Live chat</p>
          </div>

          <div className={styles.feature}>
            <span>📣</span>
            <p>Shoutouts</p>
          </div>

          <div className={styles.feature}>
            <span>📝</span>
            <p>Private notes</p>
          </div>

        </div>

      </section>

      {/* SOCIAL CONNECTION */}

      <section className={styles.section}>

        <h2 className={styles.sectionTitle}>
          Connect like
        </h2>

        <div className={styles.socialRow}>

          <div className={styles.socialCard}>
            📸 Instagram
          </div>

          <div className={styles.socialCard}>
            ✈️ Telegram
          </div>

          <div className={styles.socialCard}>
            💬 WhatsApp
          </div>

        </div>

      </section>

      {/* SAFETY */}

      <section className={styles.section}>

        <h2 className={styles.sectionTitle}>
          Safety
        </h2>

        <div className={styles.warnBox}>

          <span className={styles.warnIcon}>
            ⚠️
          </span>

          <p className={styles.warnText}>
            Never share your OTP or password with anyone.
          </p>

        </div>

      </section>

      <Link
        to="/register"
        className={styles.ctaBtn}
      >
        Register Now 🚀
      </Link>

      <Navbar />

    </div>

  );
}