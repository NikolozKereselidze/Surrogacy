"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaBlog, FaUser, FaUserPlus, FaUsers } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import styles from "@/styles/Admin/AdminDashboard.module.css";

interface Counts {
  blog: number;
  egg: number;
  sperm: number;
  surrogate: number;
}

const initialCounts: Counts = { blog: 0, egg: 0, sperm: 0, surrogate: 0 };

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Counts>(initialCounts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCounts = async () => {
      setError("");
      try {
        const responses = await Promise.all([
          fetch("/api/blog/count"),
          fetch("/api/egg-donors/count"),
          fetch("/api/sperm-donors/count"),
          fetch("/api/surrogate-donors/count"),
        ]);
        if (responses.some((response) => !response.ok)) throw new Error("Unable to load dashboard totals");
        const [blog, egg, sperm, surrogate] = await Promise.all(responses.map((response) => response.json()));
        setCounts({ blog: blog.count, egg: egg.count, sperm: sperm.count, surrogate: surrogate.count });
      } catch (requestError) {
        console.error(requestError);
        setError("Some dashboard totals could not be loaded. Refresh the page to try again.");
      } finally {
        setLoading(false);
      }
    };
    void fetchCounts();
  }, []);

  const cards = [
    { label: "Blog posts", value: counts.blog, href: "/admin/blog", icon: <FaBlog />, tone: "blue" },
    { label: "Egg donors", value: counts.egg, href: "/admin/egg-donors", icon: <FaUser />, tone: "violet" },
    { label: "Sperm donors", value: counts.sperm, href: "/admin/sperm-donors", icon: <FaUserPlus />, tone: "teal" },
    { label: "Surrogates", value: counts.surrogate, href: "/admin/surrogates", icon: <MdFamilyRestroom />, tone: "rose" },
  ];

  return (
    <div className={styles.dashboardContent}>
      <header className={styles.dashboardHeader}>
        <div><span className={styles.pageEyebrow}>Overview</span><h1 className={styles.dashboardWelcome}>Welcome back</h1><p>Manage profiles, content, and your public-facing team from one workspace.</p></div>
        <span className={styles.todayLabel}>{new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(new Date())}</span>
      </header>

      {error && <div className={styles.pageError} role="alert">{error}</div>}

      <section aria-labelledby="content-overview">
        <div className={styles.sectionTitle}><h2 id="content-overview">Content overview</h2><span>Live records</span></div>
        <div className={styles.statsRow}>
          {cards.map((card) => (
            <Link key={card.label} href={card.href} className={styles.statCard} data-tone={card.tone}>
              <div className={styles.statCardIcon}>{card.icon}</div>
              <div className={styles.statCardContent}><p className={styles.statCardTitle}>{card.label}</p><strong className={styles.statCardValue}>{loading ? "—" : card.value}</strong></div>
              <span className={styles.statCardLink}>Manage <b aria-hidden="true">→</b></span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="quick-actions">
        <div className={styles.sectionTitle}><h2 id="quick-actions">Quick actions</h2><span>Common tasks</span></div>
        <div className={styles.quickActionGrid}>
          <Link href="/admin/egg-donors"><FaUser /><span><strong>Manage donor profiles</strong><small>Add, update, or review egg donors</small></span><b>→</b></Link>
          <Link href="/admin/blog"><FaBlog /><span><strong>Publish an article</strong><small>Create and manage multilingual posts</small></span><b>→</b></Link>
          <Link href="/admin/team"><FaUsers /><span><strong>Update your team</strong><small>Manage public team member profiles</small></span><b>→</b></Link>
        </div>
      </section>
    </div>
  );
}
