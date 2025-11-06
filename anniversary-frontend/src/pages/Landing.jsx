export default function Landing() {
  const startDate = new Date("2021-11-06"); // your anniversary
  const today = new Date();
  const daysTogether = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Happy Anniversary ❤️</h1>
      <p>We’ve been together for {daysTogether} days!</p>
      <p>Here’s to all the memories and adventures to come.</p>
    </div>
  );
}
