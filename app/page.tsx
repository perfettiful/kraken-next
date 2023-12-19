import Image from 'next/image'
import Link from 'next/link'
import krakenLogo from '../public/kraken_logo_w.webp'


export default function Home() {

  return (
    <div className="landing">
      <div className="content">
        <br />
        <h1>KrakenNext</h1>
        <br />
        <p>
          KrakenNext is a full-stack application built using Node.js and Next.js, featuring a REST API for managing cryptocurrency trades via the Kraken platform.

          This app provides a seamless interface for accessing and managing Kraken account information, creating, and updating trading orders in real-time.
        </p>
        <br />

        <Link href="https://github.com/perfettiful/kraken-next">
          GitHub Repo 🔗
        </Link>

        <div className="logo">
          <Image
            src={krakenLogo}
            height={400} alt={'Kraken logo'} />
        </div>
      </div>
    </div>
  )
}