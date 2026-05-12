// components/ShoutoutCard/ShoutoutCard.jsx

import styles from "./ShoutoutCard.module.css";

export default function ShoutoutCard({
  shoutout
}) {

  return (

    <div className={styles.card}>

      <div className={styles.top}>

        <div className={styles.avatar}>

          {
            shoutout.user?.name?.[0]
              ?.toUpperCase()
          }

        </div>

        <div>

          <h3 className={styles.name}>

            {
              shoutout.user?.name
              || "Unknown"
            }

          </h3>

          <p className={styles.time}>
            {shoutout.timing}
          </p>

        </div>

      </div>

      <p className={styles.msg}>
        {shoutout.message}
      </p>

      <div className={styles.tag}>
        #{shoutout.interest}
      </div>

    </div>

  );

}