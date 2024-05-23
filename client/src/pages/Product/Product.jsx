import PageNav from '../../components/PageNav/PageNav.jsx';

import styles from './Product.module.css';

function Product() {
  return (
    <main className={styles.product}>
      <PageNav />

      <section>
        <div className={styles['wrapper-img']}>
          <img src="img-1.webp" alt="mountains with lake" />
        </div>
        <div className={styles['wrapper-text']}>
          <h2>About HeyWorld</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est
            dicta illum vero culpa cum quaerat architecto sapiente eius non
            soluta, molestiae nihil laborum, placeat debitis, laboriosam at fuga
            perspiciatis?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
            doloribus libero sunt expedita ratione iusto, magni, id sapiente
            sequi officiis et.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Product;
