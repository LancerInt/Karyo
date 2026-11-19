import Header from './components/Header'
import Hero from './components/Hero'
import PlatformStatement from './components/PlatformStatement'
import Sequence from './components/Sequence'
import ActiveSystems from './components/ActiveSystems'
import Capabilities from './components/Capabilities'
import Partnership from './components/Partnership'
import Footer from './components/Footer'
import { useReveal } from './lib/hooks'

export default function App() {
  useReveal()
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <PlatformStatement />
        <Sequence />
        <ActiveSystems />
        <Capabilities />
        <Partnership />
      </main>
      <Footer />
    </>
  )
}
