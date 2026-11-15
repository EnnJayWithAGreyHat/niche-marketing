import Link from 'next/link';
import {brand} from '@/lib/brand';

export default function SiteFooter(){return <footer className="footer"><div className="wrap">
  <div className="footer-main">
    <div className="footer-intro"><Link className="brand" href="/"><span className="brand-mark">N.</span>{brand.name}</Link><p>Thoughtful websites and service workflows for the people keeping commercial kitchens running.</p><Link className="footer-email" href="mailto:njbusinesschandler@gmail.com">Email the studio <span aria-hidden="true">↗</span></Link></div>
    <div className="footer-group"><h2>Explore</h2><Link href="/services">Services</Link><Link href="/industries">Industries</Link><Link href="/how-it-works">How it works</Link></div>
    <div className="footer-group"><h2>Studio</h2><Link href="/about">About</Link><Link href="/contact">Start a conversation</Link><Link href="/privacy">Privacy</Link></div>
  </div>
  <div className="footer-bottom"><span>© {new Date().getFullYear()} {brand.name}</span><span>Built around clear next steps.</span><a href="#top">Back to top ↑</a></div>
</div></footer>}
