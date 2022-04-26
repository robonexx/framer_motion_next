import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { motion } from 'framer-motion';

let easing = [0.5, -0.06, 0.03, 0.97];

const fadeInUp = {
  initial: {
    y: 70,
    opacity: 0,
    transition: { duration: 0.5, ease: easing },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: easing,
    },
  },
  exit: {
    y: -600,
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const Index = (props) => (
  <motion.div
    initial='initial'
    animate='animate'
    transition={{ duration: 1 }}
    exit={{ x: -500, opacity: 0 }}
  >
    <div className='container'>
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        className='title'
      >
        <h1>OG Locking Pioneers</h1>
      </motion.div>
      <motion.div variants={stagger} className='row'>
        {props.pioneers.map((pioneer) => (
          <Link
            key={pioneer.id}
            href='/pioneer/[id]'
            as={`/pioneer/${pioneer.id}`}
          >
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='card'
            >
              <span className='row-headline'>Locking Pioneer</span>
              <motion.img
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                key={pioneer.image}
                src={pioneer.image}
                width={250}
              />
              <div className='info'>
                <h4>{pioneer.name}</h4>
                <span>{pioneer.steps}</span>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </div>
  </motion.div>
);

Index.getInitialProps = async function () {
  const res = await fetch(
    'https://my-json-server.typicode.com/robonexx/db/pioneers'
  );
  const data = await res.json();
  return {
    pioneers: data,
  };
};

export default Index;
