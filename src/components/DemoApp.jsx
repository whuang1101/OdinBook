import { useMemo, useState } from "react";
import Icon from "@mdi/react";
import {
  mdiAccountGroupOutline,
  mdiBellOutline,
  mdiBookmarkOutline,
  mdiCalendarBlankOutline,
  mdiChevronDown,
  mdiCommentOutline,
  mdiDotsHorizontal,
  mdiHomeVariantOutline,
  mdiImageOutline,
  mdiMagnify,
  mdiMapMarkerOutline,
  mdiMessageOutline,
  mdiPlus,
  mdiSendOutline,
  mdiShareVariantOutline,
  mdiThumbUpOutline,
} from "@mdi/js";
import "../css/demo.css";

const avatar = (initials, from, to) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="160" height="160" rx="80" fill="url(#g)"/><circle cx="125" cy="30" r="42" fill="white" opacity=".12"/><text x="80" y="96" text-anchor="middle" fill="white" font-family="Arial" font-size="52" font-weight="700">${initials}</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const people = {
  you: { name: "Alex Morgan", role: "Product designer", image: avatar("AM", "#5b5ce2", "#9b7bf7") },
  maya: { name: "Maya Chen", role: "Designing thoughtful systems", image: avatar("MC", "#eb6a82", "#f4a261") },
  theo: { name: "Theo James", role: "Frontend engineer", image: avatar("TJ", "#2563eb", "#22c55e") },
  lina: { name: "Lina Patel", role: "Creative developer", image: avatar("LP", "#7c3aed", "#ec4899") },
  noah: { name: "Noah Williams", role: "Photographer", image: avatar("NW", "#0f766e", "#2dd4bf") },
};

const posts = [
  {
    id: 1,
    author: people.maya,
    time: "12 min",
    text: "The best products don’t just solve a problem — they make the solution feel inevitable. Sharing a few notes from our team’s latest design sprint.",
    topic: "Design systems",
    likes: 142,
    comments: 18,
    color: "coral",
  },
  {
    id: 2,
    author: people.theo,
    time: "1 hr",
    text: "A small reminder that progress rarely looks linear. Today’s win: we shipped the accessibility improvements we’ve been testing all month.",
    topic: "Building in public",
    likes: 96,
    comments: 11,
    color: "blue",
  },
];

function Brand() {
  return <div className="demo-brand"><span>O</span><strong>OdinBook</strong></div>;
}

function NavItem({ icon, label, active, onClick, testId }) {
  return (
    <button
      className={`demo-nav-item ${active ? "active" : ""}`}
      data-testid={testId}
      onClick={onClick}
    >
      <Icon path={icon} size={0.92} /><span>{label}</span>
    </button>
  );
}

function Header({ view, setView }) {
  return (
    <header className="demo-header">
      <Brand />
      <label className="demo-search"><Icon path={mdiMagnify} size={0.86} /><input aria-label="Search OdinBook" placeholder="Search conversations" /></label>
      <nav className="demo-top-nav" aria-label="Primary">
        <button className={view === "feed" ? "active" : ""} onClick={() => setView("feed")}><Icon path={mdiHomeVariantOutline} size={1} /></button>
        <button onClick={() => setView("friends")}><Icon path={mdiAccountGroupOutline} size={1} /></button>
        <button><Icon path={mdiMessageOutline} size={1} /></button>
        <button className="has-dot"><Icon path={mdiBellOutline} size={1} /></button>
      </nav>
      <button className="demo-user-menu" onClick={() => setView("profile")}>
        <img src={people.you.image} alt="Alex Morgan" /><span>Alex</span><Icon path={mdiChevronDown} size={0.7} />
      </button>
    </header>
  );
}

function Sidebar({ view, setView }) {
  return (
    <aside className="demo-sidebar">
      <div className="demo-sidebar-user">
        <img src={people.you.image} alt="Alex Morgan" />
        <div><strong>{people.you.name}</strong><span>{people.you.role}</span></div>
      </div>
      <div className="demo-nav-list">
        <NavItem icon={mdiHomeVariantOutline} label="Home" active={view === "feed"} onClick={() => setView("feed")} />
        <NavItem icon={mdiAccountGroupOutline} label="Connections" active={view === "friends"} onClick={() => setView("friends")} testId="connections-nav" />
        <NavItem icon={mdiBookmarkOutline} label="Saved" />
        <NavItem icon={mdiCalendarBlankOutline} label="Events" />
      </div>
      <div className="demo-sidebar-card">
        <span className="demo-eyebrow">YOUR CIRCLE</span>
        <div className="demo-avatar-stack">{[people.maya, people.theo, people.lina, people.noah].map(p => <img key={p.name} src={p.image} alt="" />)}<b>+24</b></div>
        <p>Four friends shared something new today.</p>
        <button onClick={() => setView("friends")}>See updates</button>
      </div>
      <footer><a href="https://github.com/whuang1101/OdinBook">GitHub</a><span>·</span><a href="https://github.com/whuang1101/OdinBook-server">API</a></footer>
    </aside>
  );
}

function Composer() {
  const [value, setValue] = useState("");
  return (
    <section className="demo-composer">
      <div className="demo-composer-row"><img src={people.you.image} alt="" /><textarea value={value} onChange={e => setValue(e.target.value)} placeholder="Share something with your circle…" /></div>
      <div className="demo-composer-actions">
        <button><Icon path={mdiImageOutline} size={0.82} />Photo</button>
        <button><Icon path={mdiMapMarkerOutline} size={0.82} />Location</button>
        <button><Icon path={mdiCalendarBlankOutline} size={0.82} />Event</button>
        <button className="primary"><Icon path={mdiSendOutline} size={0.72} />Post</button>
      </div>
    </section>
  );
}

function PostCard({ post }) {
  const [liked, setLiked] = useState(false);
  return (
    <article className="demo-post-card">
      <div className="demo-post-head">
        <img src={post.author.image} alt={post.author.name} />
        <div><strong>{post.author.name}</strong><span>{post.author.role} · {post.time}</span></div>
        <button aria-label="Post options"><Icon path={mdiDotsHorizontal} size={0.9} /></button>
      </div>
      <p className="demo-post-copy">{post.text}</p>
      <div className={`demo-post-visual ${post.color}`}>
        <span>{post.topic}</span><strong>{post.id === 1 ? "Ideas become clearer\nwhen we make them together." : "Small steps.\nMeaningful progress."}</strong>
        <i></i><i></i><i></i>
      </div>
      <div className="demo-post-meta"><span><b>♥</b> {post.likes + (liked ? 1 : 0)} appreciations</span><span>{post.comments} comments</span></div>
      <div className="demo-post-actions">
        <button className={liked ? "liked" : ""} onClick={() => setLiked(!liked)}><Icon path={mdiThumbUpOutline} size={0.82} />Appreciate</button>
        <button><Icon path={mdiCommentOutline} size={0.82} />Comment</button>
        <button><Icon path={mdiShareVariantOutline} size={0.82} />Share</button>
      </div>
    </article>
  );
}

function RightRail() {
  return (
    <aside className="demo-right-rail">
      <section className="demo-rail-card">
        <div className="demo-section-heading"><div><span className="demo-eyebrow">DISCOVER</span><h3>People you may know</h3></div><button>See all</button></div>
        {[people.lina, people.noah, people.theo].map((p, index) => (
          <div className="demo-person" key={p.name}><img src={p.image} alt="" /><div><strong>{p.name}</strong><span>{index + 2} mutual connections</span></div><button aria-label={`Connect with ${p.name}`}><Icon path={mdiPlus} size={0.68} /></button></div>
        ))}
      </section>
      <section className="demo-rail-card trends">
        <span className="demo-eyebrow">WHAT’S HAPPENING</span><h3>Trending in your circle</h3>
        <ol><li><span>01</span><div><strong>Creative routines</strong><small>38 conversations</small></div></li><li><span>02</span><div><strong>Build in public</strong><small>24 conversations</small></div></li><li><span>03</span><div><strong>Weekend escapes</strong><small>17 conversations</small></div></li></ol>
      </section>
    </aside>
  );
}

function Feed() {
  return <><main className="demo-feed"><div className="demo-welcome"><div><span className="demo-eyebrow">FRIDAY, JULY 11</span><h1>Good morning, Alex.</h1><p>Here’s what your people are talking about.</p></div><div className="demo-weather"><span>Sunny</span><strong>72°</strong></div></div><Composer />{posts.map(post => <PostCard key={post.id} post={post} />)}</main><RightRail /></>;
}

function FriendsView() {
  return (
    <main className="demo-wide-view" data-testid="connections-view"><div className="demo-page-title"><span className="demo-eyebrow">YOUR NETWORK</span><h1>Connections worth keeping.</h1><p>Stay close to the people who make your world more interesting.</p></div><div className="demo-friend-grid">{[people.maya, people.theo, people.lina, people.noah].map((p, i) => <article key={p.name}><div className={`demo-cover cover-${i}`}></div><img src={p.image} alt="" /><h3>{p.name}</h3><p>{p.role}</p><span>{12 + i * 7} mutual connections</span><button>View profile</button></article>)}</div></main>
  );
}

function ProfileView() {
  return (
    <main className="demo-wide-view profile-view"><div className="demo-profile-hero"><div className="demo-profile-art"><span>MAKE SPACE<br/>FOR GOOD IDEAS.</span></div><div className="demo-profile-summary"><img src={people.you.image} alt=""/><div><h1>{people.you.name}</h1><p>Product designer · New York, NY</p><span>248 connections</span></div><button>Edit profile</button></div></div><div className="demo-profile-columns"><section><span className="demo-eyebrow">ABOUT</span><h2>Designing digital spaces that feel a little more human.</h2><p>I care about accessible systems, thoughtful details, and teams that learn out loud.</p><div className="demo-detail"><Icon path={mdiMapMarkerOutline} size={0.8}/>Lives in New York</div><div className="demo-detail"><Icon path={mdiAccountGroupOutline} size={0.8}/>Followed by 314 people</div></section><section><span className="demo-eyebrow">RECENT THOUGHT</span><PostCard post={posts[1]}/></section></div></main>
  );
}

export default function DemoApp() {
  const initial = useMemo(() => new URLSearchParams(window.location.search).get("view") || "feed", []);
  const [view, setView] = useState(initial);
  return <div className="demo-app" data-testid="showcase-ready"><Header view={view} setView={setView}/><div className="demo-shell"><Sidebar view={view} setView={setView}/>{view === "feed" ? <Feed/> : view === "friends" ? <FriendsView/> : <ProfileView/>}</div></div>;
}
