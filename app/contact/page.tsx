import { LeadForm } from '@/components/LeadForm';
import { site } from '@/lib/site';
export default function Contact(){return <main><section className="section split"><div><p className="eyebrow">Contact us</p><h1>Ready to compare options?</h1><p className="muted">Call us or send a quick request. We’ll help you figure out the next best step.</p><div className="card"><h3>Talk to Money Brain</h3><p><strong>Phone:</strong> <a href={site.phoneHref}>{site.phone}</a></p><p><strong>Email:</strong> <a href={`mailto:${site.email}`}>{site.email}</a></p></div></div><LeadForm /></section></main>}
