import { motion } from "framer-motion";
import React from "react";
import './Marquee.css';

function Marquee() {
  return (
      <div className="text-container">
        <motion.h1 initial={{x: 0}} animate={{x: '-100%'}} transition={{ repeat: Infinity, ease: 'linear', duration: 4}} className='text'>
          Designed and Developed by Sonic
        </motion.h1>
        <motion.h1 initial={{x: 0}} animate={{x: '-100%'}} transition={{ repeat: Infinity, ease: 'linear', duration: 4}} className='text'>
          Designed and Developed by Sonic
        </motion.h1>
        <motion.h1 initial={{x: 0}} animate={{x: '-100%'}} transition={{ repeat: Infinity, ease: 'linear', duration: 4}} className='text'>
          Designed and Developed by Sonic
        </motion.h1>
        <motion.h1 initial={{x: 0}} animate={{x: '-100%'}} transition={{ repeat: Infinity, ease: 'linear', duration: 4}} className='text'>
          Designed and Developed by Sonic
        </motion.h1>
      </div>
  );
}

export default Marquee;
