import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MarketingNav, { SiteFooter } from '../components/MarketingNav';
import { checkoutBreakdown, getCourse, inr } from '../data/content';
import { useAppState } from '../context/AppState';

export default function Checkout() {
  const { courseId } = useParams();
  const course = getCourse(courseId);
  const { user, enroll, enrollments } = useAppState();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [details, setDetails] = useState({
    name: user?.name || '',
    email: user?.email || '',
    card: '',
    expiry: '',
    cvv: '',
  });
  const [error, setError] = useState('');

  if (!course) {
    return (
      <div className="marketing">
        <MarketingNav />
        <section className="band"><p>That course is not in the catalog.</p></section>
      </div>
    );
  }

  const bill = checkoutBreakdown(course);
  const already = enrollments.some((item) => item.courseId === course.id);

  const onDetails = (event) => {
    event.preventDefault();
    if (!details.name || !details.email || details.card.replace(/\s/g, '').length < 12 || !details.expiry || details.cvv.length < 3) {
      setError('Enter name, email, a 12-digit demo card, expiry, and CVV. Nothing is charged.');
      return;
    }
    setError('');
    setStep(3);
  };

  const confirm = () => {
    enroll(course.id, {
      description: course.checkoutTitle || course.title,
      amount: bill.total,
    });
    navigate(`/app/classroom/${course.id}`, { replace: true });
  };

  return (
    <div className="marketing checkout-page">
      <MarketingNav />
      <section className="checkout">
        <Link to={`/courses/${course.id}`} className="back-link">← Back to courses</Link>
        <div className="checkout-head">
          <h1>Checkout & Payment</h1>
          <ol className="steps">
            {[1, 2, 3].map((n) => (
              <li key={n} className={step === n ? 'current' : step > n ? 'done' : ''}>{n}</li>
            ))}
          </ol>
        </div>
        <div className="checkout-grid">
          <aside className="order">
            <h2>Order Summary</h2>
            <div className="order-course">
              <span className="thumb" />
              <div>
                <strong>{course.checkoutTitle || course.title}</strong>
                <small>By {course.checkoutAuthor || course.instructor}</small>
              </div>
              <em>{inr(bill.subtotal)}</em>
            </div>
            <dl>
              <div><dt>Subtotal</dt><dd>{inr(bill.subtotal)}</dd></div>
              <div><dt>{bill.discountLabel}</dt><dd>-{inr(bill.discount)}</dd></div>
              <div><dt>{bill.taxLabel}</dt><dd>{inr(bill.tax)}</dd></div>
              <div className="total"><dt>Total</dt><dd>{inr(bill.total)}</dd></div>
            </dl>
          </aside>
          <div className="pay-panel">
            {already && step === 1 && (
              <p className="notice">You already have this course. Continue watching from My Classroom.</p>
            )}
            {step === 1 && (
              <div>
                <h2>Review your order</h2>
                <p>20% off is applied before tax. The next step collects billing details for this demo checkout. No card is charged.</p>
                <ul className="perk-list">
                  <li>Lifetime access to {course.lessonsTotal} lessons</li>
                  <li>Certificate when you finish</li>
                  <li>Pick up in the classroom on any device</li>
                </ul>
                <button type="button" className="btn primary" onClick={() => (already ? navigate(`/app/classroom/${course.id}`) : setStep(2))}>
                  {already ? 'Go to classroom' : 'Continue'}
                </button>
              </div>
            )}
            {step === 2 && (
              <form onSubmit={onDetails}>
                <h2>Payment details</h2>
                <label>Full name<input value={details.name} onChange={(e) => setDetails({ ...details, name: e.target.value })} /></label>
                <label>Email<input type="email" value={details.email} onChange={(e) => setDetails({ ...details, email: e.target.value })} /></label>
                <label>Card number<input inputMode="numeric" placeholder="4242 4242 4242" value={details.card} onChange={(e) => setDetails({ ...details, card: e.target.value })} /></label>
                <div className="split">
                  <label>Expiry<input placeholder="MM/YY" value={details.expiry} onChange={(e) => setDetails({ ...details, expiry: e.target.value })} /></label>
                  <label>CVV<input inputMode="numeric" value={details.cvv} onChange={(e) => setDetails({ ...details, cvv: e.target.value })} /></label>
                </div>
                {error && <p className="form-error">{error}</p>}
                <div className="row-actions">
                  <button type="button" className="btn ghost" onClick={() => setStep(1)}>Back</button>
                  <button type="submit" className="btn primary">Review</button>
                </div>
              </form>
            )}
            {step === 3 && (
              <div>
                <h2>Confirm enrollment</h2>
                <p>{details.name}, {course.title} will be added to My Courses. This demo records a paid receipt and does not charge {inr(bill.total)}.</p>
                <div className="row-actions">
                  <button type="button" className="btn ghost" onClick={() => setStep(2)}>Back</button>
                  <button type="button" className="btn primary" onClick={confirm}>Pay {inr(bill.total)}</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
