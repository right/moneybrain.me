import Link from 'next/link';
import { site } from '@/lib/site';

export function Header() {
  return <header className="header"><Link className="brand" href="/"><span>🧠</span>{site.name}</Link></header>;
}
