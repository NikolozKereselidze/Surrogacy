import styles from "@/styles/Partners/Partners.module.css";
import Image from "next/image";

const partners = [
  {
    name: "Partner 1",
    image: "/img/home/test.jpg",
  },
];

const Partners = () => {
  return (
    <section className="section">
      <div className="content">
        <h2 className="title">Partners</h2>
      </div>

      <div className={styles.partnersGrid}>
        {partners.map((partner) => (
          <div className={styles.partnerCard} key={partner.name}>
            <Image
              className={styles.partnerImage}
              src={partner.image}
              alt={partner.name}
              width={100}
              height={100}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Partners;
