import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { INTERESTS } from '../../utils/constants';
import Button from '../../Components/Buttons/Button';
import toast from 'react-hot-toast';
import styles from './Register.module.css';

const TOTAL_STEPS = 4;

export default function Register() {

  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    bio: '',
    age: '',
    interests: [],
    agreed: false,
  });

  const set = (field) => (e) => {

    const val =
      e.target.type === 'checkbox'
        ? e.target.checked
        : e.target.value;

    setForm((prev) => ({
      ...prev,
      [field]: val,
    }));
  };

  const toggleInterest = (id) => {

    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter((i) => i !== id)
        : [...prev.interests, id],
    }));
  };

  const next = () => {

    if (step === 1) {

      if (!form.name || !form.email || !form.password) {

        toast.error('Fill all required fields');
        return;
      }

      if (form.password !== form.confirmPassword) {

        toast.error('Passwords do not match');
        return;
      }

      if (!form.agreed) {

        toast.error('Accept Terms & Privacy Policy');
        return;
      }
    }

    if (step === 3 && form.interests.length === 0) {

      toast.error('Select at least 1 interest');
      return;
    }

    setStep((s) => s + 1);
  };

  const handleSubmit = async () => {

    setLoading(true);

    navigator.geolocation.getCurrentPosition(

      async (position) => {

        try {

          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          const res = await axios.post(
            "https://nerabybackend-6.onrender.com/api/auth/register",
            {
              ...form,
              lat,
              lng
            }
          );

          localStorage.setItem(
            "token",
            res.data.token
          );

          localStorage.setItem(
            "user",
            JSON.stringify(res.data.user)
          );

          toast.success("Registration Success");

          navigate("/home");

        } catch (err) {

          console.log(err);

          toast.error(
            err.response?.data?.message ||
            "Registration Failed"
          );

        } finally {

          setLoading(false);

        }

      },

      () => {

        toast.error("Location permission denied");

        setLoading(false);

      }

    );
  };

  return (

    <div className={styles.page}>

      <div className={styles.card}>

        <div className={styles.logo}>
          ConnectNearby
        </div>

        <div className={styles.progress}>

          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (

            <div
              key={i}
              className={`${styles.progDot} ${i < step ? styles.progDone : ''}`}
            />

          ))}

        </div>

        <p className={styles.stepLabel}>
          Step {step} of {TOTAL_STEPS}
        </p>

        {step === 1 && (

          <div className={styles.stepContent}>

            <h2 className={styles.heading}>
              Create account
            </h2>

            <p className={styles.sub}>
              Basic info
            </p>

            <input
              className={styles.input}
              placeholder="Full name"
              value={form.name}
              onChange={set('name')}
            />

            <input
              className={styles.input}
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={set('email')}
            />

            <input
              className={styles.input}
              type="tel"
              placeholder="Phone number"
              value={form.phone}
              onChange={set('phone')}
            />

            <input
              className={styles.input}
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={set('password')}
            />

            <input
              className={styles.input}
              type="password"
              placeholder="Confirm password"
              value={form.confirmPassword}
              onChange={set('confirmPassword')}
            />

            <label className={styles.checkRow}>

              <input
                type="checkbox"
                checked={form.agreed}
                onChange={set('agreed')}
                className={styles.checkbox}
              />

              <span className={styles.checkLabel}>
                I agree to Terms & Privacy Policy
              </span>

            </label>

          </div>
        )}

        {step === 2 && (

          <div className={styles.stepContent}>

            <h2 className={styles.heading}>
              Your profile
            </h2>

            <p className={styles.sub}>
              Tell people about yourself
            </p>

            <input
              className={styles.input}
              type="number"
              placeholder="Age"
              value={form.age}
              onChange={set('age')}
            />

            <textarea
              className={styles.textarea}
              placeholder="Short bio"
              value={form.bio}
              onChange={set('bio')}
              rows={3}
            />

          </div>
        )}

        {step === 3 && (

          <div className={styles.stepContent}>

            <h2 className={styles.heading}>
              Your interests
            </h2>

            <div className={styles.interestGrid}>

              {INTERESTS.map(({ id, label, icon, color, bg }) => {

                const sel = form.interests.includes(id);

                return (

                  <button
                    key={id}
                    type="button"
                    onClick={() => toggleInterest(id)}
                    className={`${styles.interestBtn} ${sel ? styles.interestSel : ''}`}
                    style={
                      sel
                        ? {
                            background: bg,
                            borderColor: color,
                            color
                          }
                        : {}
                    }
                  >

                    <span className={styles.intIcon}>
                      {icon}
                    </span>

                    <span className={styles.intLabel}>
                      {label}
                    </span>

                  </button>
                );
              })}

            </div>

          </div>
        )}

        {step === 4 && (

          <div className={styles.stepContent}>

            <h2 className={styles.heading}>
              Enable location
            </h2>

            <p className={styles.sub}>
              Allow location to find nearby users
            </p>

          </div>
        )}

        <div className={styles.actions}>

          {step > 1 && (

            <Button
              variant="ghost"
              onClick={() => setStep((s) => s - 1)}
            >
              Back
            </Button>
          )}

          {step < TOTAL_STEPS ? (

            <Button
              fullWidth={step === 1}
              onClick={next}
            >
              Continue →
            </Button>

          ) : (

            <Button
              onClick={handleSubmit}
              loading={loading}
            >
              Get Started 🎉
            </Button>

          )}

        </div>

        {step === 1 && (

          <p className={styles.footer}>

            Have an account?

            <Link
              to="/login"
              className={styles.footerLink}
            >
              Login
            </Link>

          </p>

        )}

      </div>

    </div>
  );
}