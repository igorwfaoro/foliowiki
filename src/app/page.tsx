import {
  ArrowRight,
  BookOpen,
  FolderTree,
  Github,
  LockKeyhole,
} from "lucide-react";
import Link from "next/link";
import { auth } from "@/auth";

const features = [
  {
    icon: FolderTree,
    title: "Your structure, preserved",
    text: "Folders and Google Docs become a clean wiki tree without moving your content.",
  },
  {
    icon: LockKeyhole,
    title: "Drive stays authoritative",
    text: "FolioWiki does not invent another permission system or broaden access.",
  },
  {
    icon: BookOpen,
    title: "Built for reading",
    text: "Documents become calm wiki pages while editing stays in Google Docs.",
  },
];

export default async function Home() {
  const session = await auth();

  return (
    <main>
      <header className="nav">
        <Link className="brand" href="/">
          Folio<span>Wiki</span>
        </Link>
        <nav>
          <a href="#principles">Principles</a>
          <a href="https://github.com/igorwfaoro/foliowiki">
            <Github size={18} /> GitHub
          </a>
        </nav>
      </header>
      <section className="hero">
        <div className="eyebrow">OPEN SOURCE · GOOGLE DRIVE NATIVE</div>
        <h1>
          Your docs are already written.
          <br />
          <em>Make them a wiki.</em>
        </h1>
        <p>
          FolioWiki turns a Google Drive folder into a beautiful knowledge base.
          No migration. No duplicate content. No second editor.
        </p>
        <div className="actions">
          <a className="primary" href={session ? "/wiki" : "/signin"}>
            {session ? "Open your wiki" : "Sign in with Google"}{" "}
            <ArrowRight size={18} />
          </a>
          <a className="secondary" href="#principles">
            How it works
          </a>
        </div>
        <div className="mock">
          <aside>
            <b>FolioWiki</b>
            <small>PRODUCT</small>
            <span>▾ Getting started</span>
            <span>　Overview</span>
            <span>　Installation</span>
            <small>ENGINEERING</small>
            <span>▾ Architecture</span>
            <span>　Providers</span>
            <span>　Permissions</span>
          </aside>
          <article>
            <small>Engineering / Architecture</small>
            <h2>Architecture</h2>
            <p>
              FolioWiki keeps your existing documents where they belong: in
              Google Drive.
            </p>
            <h3>Drive is the source of truth</h3>
            <p>
              The knowledge provider reads structure, content and access from
              the source. FolioWiki focuses on presenting it beautifully.
            </p>
            <blockquote>Write in Google Docs. Read in FolioWiki.</blockquote>
          </article>
        </div>
      </section>
      <section id="principles" className="features">
        {features.map(({ icon: Icon, title, text }) => (
          <div key={title}>
            <Icon />
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </section>
      <footer>
        FolioWiki · Open source knowledge layer for your documents.
      </footer>
    </main>
  );
}
