import styles from "@/styles/LegalDocument.module.css";

export type LegalSection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
};

type LegalDocumentProps = {
  eyebrow: string;
  title: string;
  introduction: string;
  sections: LegalSection[];
};

export default function LegalDocument({
  eyebrow,
  title,
  introduction,
  sections,
}: LegalDocumentProps) {
  return (
    <article className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1>{title}</h1>
        <p className={styles.updated}>Effective: September 15, 2026</p>
        <p className={styles.introduction}>{introduction}</p>
      </header>

      <div className={styles.content}>
        {sections.map((section) => (
          <section key={section.title} className={styles.section}>
            <h2>{section.title}</h2>
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.items && (
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </article>
  );
}
