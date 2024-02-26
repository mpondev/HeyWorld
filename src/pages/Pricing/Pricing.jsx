import PageNav from '../../components/PageNav/PageNav.jsx';

// Uses same styles as Product
import styles from '../Product/Product.module.css';

function Pricing() {
  return (
    <main className={styles.product}>
      <PageNav />

      <section>
        <div>
          <h2>
            Simple pricing. <br /> Just $9/month.
          </h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam,
            ipsa necessitatibus asperiores distinctio accusamus nihil. Tempora,
            quia nulla hic blanditiis deleniti distinctio consequatur recusandae
            odio vero consectetur animi, quod ipsa!
          </p>
        </div>

        <img src="img-2.webp" alt="Town with mounatins in the background" />
      </section>
    </main>
  );
}

export default Pricing;
