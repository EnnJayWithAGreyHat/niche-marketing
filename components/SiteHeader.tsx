'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {brand} from '@/lib/brand';

export default function SiteHeader(){
  const pathname=usePathname();
  return <header className="site-header" id="top"><div className="wrap nav">
    <Link className="brand" href="/" aria-label={`${brand.name}, home`}><span className="brand-mark">N.</span><span>{brand.name}<small>WEB + SERVICE WORKFLOWS</small></span></Link>
    <nav className="nav-links" aria-label="Main navigation">
      {brand.navigation.map(item=><Link key={item.href} href={item.href} aria-current={pathname===item.href?'page':undefined}>{item.label}</Link>)}
      <Link className="btn" href="/contact">Talk through a project <span className="arrow">↗</span></Link>
    </nav>
  </div></header>
}
