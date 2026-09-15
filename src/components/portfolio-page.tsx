import { useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Cloud,
  Code2,
  Container,
  Download,
  Github,
  GitBranch,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Network,
  Phone,
  Send,
  Server,
  Terminal,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import portrait from "@/assets/adnan-portrait-placeholder.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const navItems = [
  ["Home", "home"],
  ["About", "about"],
  ["Skills", "skills"],
  ["Projects", "projects"],
  ["Career Focus", "career"],
  ["Contact", "contact"],
] as const;

const pipeline = [
  { label: "Developer", icon: Code2 },
  { label: "Git", icon: GitBranch },
  { label: "CI/CD", icon: Terminal },
  { label: "Docker", icon: Container },
  { label: "Cloud", icon: Cloud },
  { label: "Production", icon: Server },
];

const skills = [
  {
    title: "DevOps & Automation",
    icon: Terminal,
    status: "Learning",
    copy: "CI/CD concepts, workflow automation, delivery pipelines, and reliable deployment practices.",
    tags: ["CI/CD", "Automation", "Bash"],
  },
  {
    title: "Containers & Version Control",
    icon: Container,
    status: "Developing Skills",
    copy: "Container fundamentals, image workflows, repositories, branching, and collaborative source control.",
    tags: ["Docker", "Git", "GitHub"],
  },
  {
    title: "Cloud Fundamentals",
    icon: Cloud,
    status: "Learning",
    copy: "Core cloud concepts across compute, storage, identity, networking, and shared responsibility.",
    tags: ["AWS", "Azure", "Cloud"],
  },
  {
    title: "Operating Systems",
    icon: Server,
    status: "Developing Skills",
    copy: "Linux command line, Fedora, permissions, processes, services, and system administration fundamentals.",
    tags: ["Linux", "Fedora", "CLI", "SysAdmin"],
  },
  {
    title: "Networking",
    icon: Network,
    status: "Learning",
    copy: "DNS, forward and reverse lookup, records, hosts and resolver configuration, and troubleshooting.",
    tags: ["DNS", "/etc/hosts", "/etc/resolv.conf"],
  },
  {
    title: "Programming",
    icon: Code2,
    status: "Developing Skills",
    copy: "Python fundamentals and practical scripting for repetitive tasks and infrastructure workflows.",
    tags: ["Python", "Scripting", "Logic"],
  },
];

const roles = [
  "DevOps Engineer",
  "Cloud Engineer",
  "Cloud Support",
  "Linux / System Admin",
  "Technical Support",
];

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email.").max(255),
  subject: z.string().trim().min(3, "Please add a subject.").max(120),
  message: z.string().trim().min(10, "Please write at least 10 characters.").max(1000),
});

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs font-medium uppercase text-primary">
      {number} — {children}
    </p>
  );
}

function ResumeButton({ compact = false }: { compact?: boolean }) {
  const handleClick = () => {
    toast.info("Resume coming soon", {
      description: "Adnan’s verified resume will be available here once it is supplied.",
    });
  };

  return (
    <Button
      type="button"
      variant="outline"
      size={compact ? "sm" : "default"}
      onClick={handleClick}
      className="border-primary/40 bg-transparent text-primary shadow-none hover:bg-primary hover:text-primary-foreground"
    >
      <Download aria-hidden="true" />
      Download Resume
    </Button>
  );
}

export function PortfolioPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    const result = contactSchema.safeParse(values);

    if (!result.success) {
      const nextErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !nextErrors[key]) nextErrors[key] = issue.message;
      }
      setErrors(nextErrors);
      toast.error("Please check the highlighted fields.");
      return;
    }

    setErrors({});
    form.reset();
    toast.success("Message ready", {
      description: "The form works locally. Connect an email address to deliver submissions.",
    });
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-background font-body text-foreground selection:bg-primary/30">
      <div className="tech-grid pointer-events-none fixed inset-0 z-0" aria-hidden="true" />

      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto grid h-20 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 sm:px-8">
          <a href="#home" className="flex min-w-0 items-center gap-3" aria-label="Adnan Qureshi home">
            <span className="grid size-9 shrink-0 place-items-center border border-primary/50 bg-primary font-head text-sm font-semibold text-primary-foreground">
              AQ
            </span>
            <span className="min-w-0 truncate font-head text-sm font-semibold text-bright sm:text-base">
              Adnan Qureshi
            </span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            <nav className="flex items-center" aria-label="Primary navigation">
              {navItems.map(([label, id]) => (
                <a key={id} href={`#${id}`} className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-bright">
                  {label}
                </a>
              ))}
            </nav>
            <ResumeButton compact />
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {menuOpen && (
          <div className="border-t border-border bg-background px-5 py-4 lg:hidden">
            <nav className="mx-auto grid max-w-7xl gap-1" aria-label="Mobile navigation">
              {navItems.map(([label, id]) => (
                <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-surface hover:text-bright">
                  {label}
                </a>
              ))}
              <div className="mt-2"><ResumeButton /></div>
            </nav>
          </div>
        )}
      </header>

      <main className="relative z-10">
        <section id="home" className="relative scroll-mt-16 overflow-hidden">
          <div className="diagonal-light pointer-events-none absolute inset-0" aria-hidden="true" />
           <div className="mx-auto grid min-h-[760px] max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 md:grid-cols-12 md:py-28">
             <div className="md:col-span-8">
               <div className="inline-flex items-center gap-2 border-b border-primary/35 pb-2">
                <span className="relative flex size-2" aria-hidden="true">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-primary" />
                </span>
                <span className="font-head text-xs font-semibold uppercase text-primary">Open to entry-level opportunities</span>
              </div>
               <h1 className="mt-8 max-w-[12ch] font-head text-6xl font-semibold leading-[0.9] text-bright sm:text-7xl lg:text-8xl">
                Adnan Qureshi
              </h1>
               <p className="mt-7 max-w-[28ch] font-head text-2xl font-medium leading-snug text-primary sm:text-3xl">
                Aspiring DevOps &amp; Cloud Engineer
              </p>
              <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
                B.Tech Computer Science Engineering graduate passionate about DevOps, Cloud Computing, Linux, automation, containerization, and modern infrastructure technologies.
              </p>
              <p className="mt-3 max-w-[58ch] text-sm leading-relaxed text-subtle">
                A motivated 2025 fresher building real-world skills through focused, hands-on learning.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg"><a href="#skills">View My Skills <ArrowDown /></a></Button>
                <Button asChild size="lg" variant="outline"><a href="#contact">Contact Me <ArrowRight /></a></Button>
                <ResumeButton />
              </div>
              <div className="mt-9 flex flex-wrap gap-2" aria-label="Core technologies">
                {["Linux", "Git", "Docker", "Cloud", "CI/CD"].map((tag) => (
                  <span key={tag} className="rounded-md border border-border bg-surface/60 px-3 py-1.5 font-mono text-xs text-foreground">{tag}</span>
                ))}
              </div>
            </div>

             <div className="md:col-span-4 md:pt-16">
              <div className="portrait-shell relative mx-auto max-w-[390px]">
                 <div className="overflow-hidden rounded-t-[48%_38%] border border-primary/40 bg-surface p-2 shadow-portrait">
                   <img src={portrait} alt="Anonymous portrait placeholder for Adnan Qureshi" width={1024} height={1280} className="aspect-[4/5] w-full rounded-t-[46%_36%] object-cover grayscale-[25%]" />
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-2 py-3">
                    <span className="min-w-0 truncate font-mono text-xs uppercase text-subtle">profile_placeholder</span>
                    <span className="flex shrink-0 items-center gap-1.5 text-xs text-primary"><span className="size-1.5 rounded-full bg-primary" />available</span>
                  </div>
                </div>
                <div className="absolute -bottom-3 right-2 rounded-md border border-primary/30 bg-background/90 px-3 py-2 font-mono text-xs text-foreground shadow-glow backdrop-blur-md">
                  <span className="text-primary">›</span> learning continuously
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-surface/40 py-10" aria-label="DevOps pipeline">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-5 flex items-center gap-3"><span className="font-mono text-xs uppercase text-primary">Infrastructure flow</span><span className="h-px flex-1 bg-border" /></div>
            <ol className="pipeline-grid grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {pipeline.map(({ label, icon: Icon }, index) => (
                 <li key={label} className="pipeline-node relative flex items-center gap-3 border border-border bg-background/65 p-3">
                   <span className="grid size-8 shrink-0 place-items-center bg-primary/10 text-primary"><Icon className="size-4" /></span>
                  <span className="min-w-0 font-head text-xs font-medium text-foreground">{label}</span>
                  {index < pipeline.length - 1 && <ChevronRight className="pipeline-arrow absolute -right-3 z-10 hidden size-4 text-primary lg:block" aria-hidden="true" />}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="about" className="scroll-mt-16 border-b border-border">
           <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:grid-cols-12 md:py-32">
            <div className="md:col-span-7">
              <SectionLabel number="01">About me</SectionLabel>
               <h2 className="mt-5 max-w-[18ch] font-head text-4xl font-semibold leading-[1.05] text-bright sm:text-5xl">A focused, honest starting point</h2>
              <p className="mt-6 max-w-[62ch] text-base leading-relaxed text-muted-foreground">
                I graduated in 2025 with a B.Tech in Computer Science Engineering from G H Raisoni Institute of Engineering and Technology, Nagpur. As a fresher, I am building strong foundations in Linux, cloud platforms, containers, networking, automation, and delivery workflows—without overstating experience I have not yet earned.
              </p>
              <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-muted-foreground">
                I am looking for a team where curiosity, discipline, and reliable fundamentals matter, and where I can contribute while learning from real systems and experienced engineers.
              </p>
            </div>
            <aside className="glass-panel p-6 md:col-span-5">
              <h3 className="font-head text-sm font-semibold uppercase text-foreground">Quick info</h3>
              <dl className="mt-5 space-y-4 text-sm">
                {[
                  ["Education", "B.Tech, Computer Science Engineering"],
                  ["Year", "2025"],
                  ["Institution", "G H Raisoni Institute of Engineering and Technology, Nagpur"],
                  ["Experience", "Fresher"],
                  ["Career focus", "DevOps & Cloud Engineering"],
                ].map(([term, value]) => (
                  <div key={term} className="grid grid-cols-[7rem_minmax(0,1fr)] gap-3 border-b border-border pb-4 last:border-0 last:pb-0">
                    <dt className="text-subtle">{term}</dt><dd className="text-right font-medium text-foreground">{value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </section>

        <section id="skills" className="scroll-mt-16 border-b border-border bg-surface/20">
           <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
            <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
               <div><SectionLabel number="02">Technical skills</SectionLabel><h2 className="mt-5 font-head text-4xl font-semibold leading-[1.05] text-bright sm:text-5xl">Capabilities, honestly staged</h2></div>
              <p className="max-w-[38ch] text-sm text-subtle">No percentage bars or inflated claims—only clear areas of active learning and development.</p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {skills.map(({ title, icon: Icon, status, copy, tags }) => (
                 <article key={title} className="skill-card group relative overflow-hidden border border-border bg-card/70 p-7 backdrop-blur-sm">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="flex items-start justify-between gap-4"><span className="grid size-10 shrink-0 place-items-center rounded-md bg-primary/10 text-primary"><Icon className="size-5" /></span><span className="rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 font-head text-[10px] font-semibold uppercase text-primary">{status}</span></div>
                  <h3 className="mt-5 font-head text-lg font-semibold text-bright">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy}</p>
                  <div className="mt-5 flex flex-wrap gap-2">{tags.map((tag) => <span key={tag} className="rounded-md bg-muted px-2.5 py-1 font-mono text-[11px] text-foreground">{tag}</span>)}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="scroll-mt-16 border-b border-border">
             <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
            <SectionLabel number="03">Projects</SectionLabel>
             <h2 className="mt-5 font-head text-4xl font-semibold leading-[1.05] text-bright sm:text-5xl">Projects Coming Soon</h2>
            <p className="mt-4 max-w-[65ch] leading-relaxed text-muted-foreground">I’m currently building hands-on projects in DevOps, Cloud, Linux, Docker, networking, and CI/CD. Each project will be documented here when it is ready to share honestly.</p>
            <div className="terminal-panel mt-9 overflow-hidden border border-border bg-background/85 font-mono text-sm shadow-panel">
              <div className="flex items-center gap-2 border-b border-border bg-surface/70 px-4 py-3"><span className="size-2.5 rounded-full bg-subtle" /><span className="size-2.5 rounded-full bg-subtle/60" /><span className="size-2.5 rounded-full bg-primary" /><span className="ml-2 text-xs text-subtle">adnan@cloud-lab: ~/projects</span></div>
              <div className="grid gap-8 p-5 md:grid-cols-[minmax(0,1fr)_auto] md:p-8">
                <div className="space-y-2 leading-relaxed"><p><span className="text-primary">$</span> ls --status ./portfolio-projects</p><p className="text-subtle">No published entries yet — building deliberately.</p><p className="pt-3"><span className="text-primary">$</span> current_focus --all</p><p className="text-muted-foreground">linux · docker · networking · cloud · ci/cd</p><p className="pt-3"><span className="text-primary">$</span> <span className="terminal-cursor inline-block h-4 w-2 translate-y-0.5 bg-primary" /></p></div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-2">
                  {["Learn", "Build", "Deploy", "Document"].map((step, i) => <div key={step} className="min-w-28 rounded-md border border-border bg-surface/50 p-3"><span className="text-xs text-primary">0{i + 1}</span><p className="mt-2 text-foreground">{step}</p><span className="mt-1 block text-[10px] text-subtle">{i === 0 ? "ACTIVE" : "QUEUED"}</span></div>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="career" className="scroll-mt-16 border-b border-border bg-surface/20">
           <div className="mx-auto grid max-w-7xl gap-16 px-5 py-24 sm:px-8 lg:grid-cols-2 md:py-32">
            <div>
              <SectionLabel number="04">Career focus</SectionLabel>
               <h2 className="mt-5 font-head text-4xl font-semibold leading-[1.05] text-bright sm:text-5xl">Ready for the first professional chapter</h2>
              <p className="mt-5 max-w-[58ch] leading-relaxed text-muted-foreground">I am seeking an entry-level opportunity where I can apply my foundations, learn from production environments, and grow into a dependable infrastructure professional.</p>
              <div className="mt-7 grid gap-2 sm:grid-cols-2">{roles.map((role) => <div key={role} className="flex items-center gap-3 rounded-md border border-border bg-card/50 px-4 py-3 text-sm text-foreground"><Check className="size-4 shrink-0 text-primary" />{role}</div>)}</div>
              <Button asChild size="lg" className="mt-8"><a href="#contact">Let’s Connect <ArrowRight /></a></Button>
            </div>
            <div className="grid gap-4">
              <article className="glass-panel p-6"><BriefcaseBusiness className="size-6 text-primary" /><p className="mt-5 text-xs uppercase text-subtle">Professional experience</p><h3 className="mt-2 font-head text-xl font-semibold text-bright">Fresher — 2025 Graduate</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Seeking a first professional role. No fabricated employment history or client claims.</p></article>
              <article className="glass-panel p-6"><GraduationCap className="size-6 text-primary" /><p className="mt-5 text-xs uppercase text-subtle">Education</p><h3 className="mt-2 font-head text-xl font-semibold text-bright">B.Tech Computer Science Engineering</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">G H Raisoni Institute of Engineering and Technology, Nagpur · Graduated 2025</p></article>
            </div>
          </div>
        </section>

        <section className="border-b border-border">
           <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
            <SectionLabel number="05">What I’m building</SectionLabel>
             <h2 className="mt-5 font-head text-4xl font-semibold leading-[1.05] text-bright sm:text-5xl">Learning with an operator’s mindset</h2>
            <div className="mt-9 grid gap-8 border-l border-primary/25 pl-6 md:grid-cols-3 md:border-l-0 md:border-t md:pl-0 md:pt-8">
              {[
                ["Reliable Linux foundations", "Daily command-line practice, processes, permissions, services, and troubleshooting."],
                ["Repeatable delivery workflows", "Connecting Git, CI/CD, containers, and cloud concepts into understandable systems."],
                ["Clear technical documentation", "Recording configurations, decisions, failures, and fixes so learning becomes reusable."],
              ].map(([title, copy], i) => <article key={title} className="relative md:px-5"><span className="absolute -left-[31px] top-1 size-3 rounded-full border-2 border-background bg-primary md:-top-[39px] md:left-5" /><span className="font-mono text-xs text-primary">0{i + 1}</span><h3 className="mt-3 font-head text-lg font-semibold text-bright">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy}</p></article>)}
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-16">
           <div className="mx-auto grid max-w-7xl gap-16 px-5 py-24 sm:px-8 lg:grid-cols-12 md:py-32">
            <div className="lg:col-span-5">
              <SectionLabel number="06">Contact</SectionLabel>
               <h2 className="mt-5 max-w-[16ch] font-head text-4xl font-semibold leading-[1.05] text-bright sm:text-5xl">Let’s Build Something Together</h2>
              <p className="mt-5 max-w-[45ch] leading-relaxed text-muted-foreground">Reach out about an entry-level role, a learning opportunity, or a conversation about cloud and infrastructure.</p>
              <div className="mt-8 space-y-3">
                {[
                  [Mail, "Email", "To be added"], [Phone, "Phone", "To be added"], [Linkedin, "LinkedIn", "Profile link coming soon"], [Github, "GitHub", "Profile link coming soon"], [MapPin, "Location", "Nagpur, Maharashtra, India"],
                ].map(([Icon, label, value]) => {
                  const ContactIcon = Icon as typeof Mail;
                  return <div key={label as string} className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-md border border-border bg-card/45 px-4 py-3"><ContactIcon className="size-4 text-primary" /><div className="min-w-0"><p className="text-xs text-subtle">{label as string}</p><p className="truncate text-sm text-foreground">{value as string}</p></div></div>;
                })}
              </div>
              <div className="mt-6"><ResumeButton /></div>
            </div>
            <form onSubmit={submitContact} noValidate className="glass-panel p-6 sm:p-8 lg:col-span-7">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" name="name" error={errors["name"]}><Input id="name" name="name" maxLength={100} placeholder="Your name" aria-invalid={Boolean(errors["name"])} /></Field>
                <Field label="Email" name="email" error={errors["email"]}><Input id="email" name="email" type="email" maxLength={255} placeholder="you@example.com" aria-invalid={Boolean(errors["email"])} /></Field>
              </div>
              <div className="mt-5"><Field label="Subject" name="subject" error={errors["subject"]}><Input id="subject" name="subject" maxLength={120} placeholder="Opportunity or topic" aria-invalid={Boolean(errors["subject"])} /></Field></div>
              <div className="mt-5"><Field label="Message" name="message" error={errors["message"]}><Textarea id="message" name="message" rows={5} maxLength={1000} placeholder="Tell me what you’d like to discuss" aria-invalid={Boolean(errors["message"])} /></Field></div>
              <Button type="submit" size="lg" className="mt-6">Send Message <Send /></Button>
            </form>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-border bg-surface/25">
        <div className="mx-auto grid max-w-7xl gap-7 px-5 py-9 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:px-8">
          <div><p className="font-head font-semibold text-bright">AQ · Adnan Qureshi</p><p className="mt-1 text-xs text-subtle">© 2026 Adnan Qureshi. Aspiring DevOps & Cloud Engineer.</p></div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">{[["Home", "home"], ["Skills", "skills"], ["Projects", "projects"], ["Contact", "contact"]].map(([label, id]) => <a key={id} href={`#${id}`} className="hover:text-primary">{label}</a>)}</div>
        </div>
      </footer>
    </div>
  );
}

function Field({ label, name, error, children }: { label: string; name: string; error: string | undefined; children: React.ReactNode }) {
  return (
    <label htmlFor={name} className="block">
      <span className="font-head text-xs font-semibold uppercase text-muted-foreground">{label}</span>
      <span className="mt-2 block">{children}</span>
      {error && <span className="mt-1.5 block text-xs text-destructive">{error}</span>}
    </label>
  );
}