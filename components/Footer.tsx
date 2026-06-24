import Link from 'next/link';
import { site } from '@/lib/site';
export function Footer(){return <footer className="footer"><div><strong>{site.name}</strong><p>Plain-English help finding savings on insurance, home services, and loans.</p></div><div><Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/privacy">Privacy Policy</Link></div></footer>}
