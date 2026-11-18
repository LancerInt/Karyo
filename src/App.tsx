import Header from './components/Header'
import Hero from './components/Hero'
import WhatKaryo from './components/WhatKaryo'
import Capabilities from './components/Capabilities'
import Combinations from './components/Combinations'
import Application from './components/Application'
import Kriya from './components/Kriya'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useRevealObserver } from './lib/hooks'

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
        <WhatKaryo />
        <Capabilities />
        <Combinations />
        <Application />
        <Kriya />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
