import fetch from 'isomorphic-unfetch';
import { motion } from 'framer-motion';
import Link from 'next/link';

let easing = [0.6, -0.05, 0.01, 0.99];

const stagger = {
  animate: {
    transition: {
      delay: 0.3,
      staggerChildren: 0.1,
    },
  },
};

const fadeInUp = {
  initial: {
    x: -60,
    opacity: 0,
    transition: { delay: 0.4, duration: 0.3, ease: easing },
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

const Pioneer = (props) => (
  <motion.div initial='initial' animate='animate' exit={{ opacity: 0 }}>
    <div className='fullscreen'>
      <Link href='/'>
        <motion.div
          initial={{ x: -1000, y: 0 }}
          animate={{ x: 0, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <a className='go-back'>Back to pioneers</a>
        </motion.div>
      </Link>

      <div className='f-card'>
        <motion.div
          className='img'
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
        >
          <motion.img
            key={props.pioneer.image}
            src={`../${props.pioneer.image}`}
            animate={{ x: 0, opacity: 1 }}
            initial={{ x: -400, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
        </motion.div>
        <div className='details'>
          <motion.div variants={stagger} className='inner'>
            {/* <Link href='/'>
              <motion.div variants={fadeInUp}>
                <a className='go-back'>Back to pioneers</a>
              </motion.div>
            </Link> */}
            <motion.div variants={fadeInUp}>
              <span className='title'>O.G</span>
            </motion.div>
            <motion.h1 variants={fadeInUp}>{props.pioneer.name}</motion.h1>
            <motion.p variants={fadeInUp}>{props.pioneer.details}</motion.p>
            <motion.div variants={fadeInUp} className='additonals'>
              <span>Style: </span>
              <span>Locking</span>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <span className='steps'>{props.pioneer.steps}</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  </motion.div>
);

Pioneer.getInitialProps = async function (context) {
  const { id } = context.query;
  const res = await fetch(
    `https://my-json-server.typicode.com/robonexx/db/pioneers/${id}`
  );
  const pioneer = await res.json();
  return { pioneer };
};

export default Pioneer;
