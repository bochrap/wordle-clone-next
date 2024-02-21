import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <header className="header">
        <h1>Embark on a Journey with Wordly Game</h1>
        <p>Where Words Come to Life!</p>
      </header>

      <main className="main">
        <p>
          Unleash the power of your vocabulary and explore words waiting to be discovered.
        </p>

        <Link className="playButton" href="/play">Start Your Adventure</Link>

      </main>

      <section className="features">
        <div className="feature">
          <h2>Word Quests</h2>
          <p>Embark on epic word quests, solve puzzles, and unlock your potencial.</p>
        </div>

        <div className="feature">
          <h2>Word Challenges</h2>
          <p>Challenge your friends in thrilling word challenges.</p>
        </div>

        <div className="feature">
          <h2>Word Mastery</h2>
          <p>Improve your vocabulary and become a Wordly Master!</p>
        </div>
      </section>
      
      <footer className="footer">
        <p>© 2024 Wordly Game. All rights reserved.</p>
      </footer>
    </div>
  );
}
