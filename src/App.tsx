import Nav from './components/Nav'
import Hero from './components/Hero'
import Platform from './components/Platform'
import Story from './components/Story'
import Capabilities from './components/Capabilities'
import Combinations from './components/Combinations'
import Delivery from './components/Delivery'
import KriyaRelation from './components/KriyaRelation'
import Enquiry from './components/Enquiry'
import Footer from './components/Footer'
import { useRevealObserver } from './lib/hooks'

export default function App() {
  useRevealObserver()
  return (
    <>
      <a className="skip-link" href="#platform">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Platform />
        <Story />
        <Capabilities />
        <Combinations />
        <Delivery />
        <KriyaRelation />
        <Enquiry />
      </main>
      <Footer />
    </>
  )
}
