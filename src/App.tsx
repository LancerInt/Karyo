import Header from './components/Header'
import Hero from './components/Hero'
import Intro from './components/Intro'
import Story from './components/Story'
import CapabilityExplorer from './components/CapabilityExplorer'
import CombinationExplorer from './components/CombinationExplorer'
import Application from './components/Application'
import Kriya from './components/Kriya'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useRevealObserver } from './lib/hooks'
import { PauseMotionButton } from './lib/motion'

export default function App() {
  useRevealObserver()
  return (
    <>
      <a className="skip-link" href="#platform">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Intro />
        <Story />
        <CapabilityExplorer />
        <CombinationExplorer />
        <Application />
        <Kriya />
        <Contact />
      </main>
      <Footer />
      <PauseMotionButton />
    </>
  )
}
