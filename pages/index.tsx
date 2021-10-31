import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import Gnomos from '../components/Gnomos';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Brastlewark</title>
      </Head>
      <Gnomos />
    </div>
  );
};

export default Home;
