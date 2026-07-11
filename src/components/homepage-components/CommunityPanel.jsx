import Icon from "@mdi/react";
import { mdiArrowTopRight, mdiPlus } from "@mdi/js";

const people = [
  { initials: "LP", name: "Lina Patel", detail: "2 mutual connections", tone: "violet" },
  { initials: "NW", name: "Noah Williams", detail: "3 mutual connections", tone: "teal" },
  { initials: "EC", name: "Elaine Cole", detail: "Works in research", tone: "coral" },
];

const trends = [
  ["01", "Creative routines", "38 conversations"],
  ["02", "Building in public", "24 conversations"],
  ["03", "Weekend escapes", "17 conversations"],
];

export default function CommunityPanel() {
  return (
    <aside className="community-panel" aria-label="Community highlights">
      <section className="community-card discover-card">
        <div className="eyebrow">Discover</div>
        <div className="panel-heading-row">
          <h2>People you may know</h2>
          <button type="button" className="text-action">See all</button>
        </div>
        <div className="people-list">
          {people.map((person) => (
            <div className="person-row" key={person.name}>
              <span className={`initial-avatar ${person.tone}`}>{person.initials}</span>
              <span className="person-copy">
                <strong>{person.name}</strong>
                <small>{person.detail}</small>
              </span>
              <button type="button" className="add-person" aria-label={`Connect with ${person.name}`}>
                <Icon path={mdiPlus} size={0.75} />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="community-card trends-card">
        <div className="eyebrow">What&apos;s happening</div>
        <div className="panel-heading-row">
          <h2>Trending in your circle</h2>
          <Icon path={mdiArrowTopRight} size={0.8} />
        </div>
        <div className="trend-list">
          {trends.map(([number, title, detail]) => (
            <div className="trend-row" key={number}>
              <span>{number}</span>
              <div><strong>{title}</strong><small>{detail}</small></div>
            </div>
          ))}
        </div>
      </section>

      <section className="circle-pulse">
        <span className="eyebrow">Your circle</span>
        <div className="circle-avatars" aria-hidden="true">
          {people.map((person) => <span className={`initial-avatar ${person.tone}`} key={person.initials}>{person.initials}</span>)}
          <span className="initial-avatar more">+5</span>
        </div>
        <strong>Eight people shared something new today.</strong>
        <span>Drop into a thread and say hello.</span>
      </section>
    </aside>
  );
}
