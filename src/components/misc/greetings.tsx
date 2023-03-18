import React, { useState, useEffect } from 'react';

const Greetings= () => {
  const [swap, setSwap] = useState(false);

  const styles : {[key:string]:any}= {
    chatBox: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      padding: '20px',
      backgroundColor: '#000',
      position: 'relative',
      overflow: 'hidden',
    },
    lineRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px',
    },
    whiteBg: {
      backgroundColor: '#fff',
      width: '100px',
      height: '4px',
      margin: '0px 8px 0px 8px',
      animation: `${swap ? 'slideRight' : 'slideLeft'} 5s ease-in-out infinite`,
    },
    greenBg: {
      backgroundColor: 'green',
      width: '100px',
      height: '4px',
      margin: '0px 8px 0px 8px',
      animation: `${swap ? 'slideLeft' : 'slideRight'} 5s ease-in-out infinite`,
    },
    text: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      opacity: swap ? 0: 1,
      transition: 'opacity 1s ease-in-out'
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSwap(prevSwap => !prevSwap);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.chatBox}>
      <div style={styles.lineRow}>
        <span style={styles.whiteBg}></span>
        <span style={styles.whiteBg}></span>
        <span style={styles.greenBg}></span>
        <span style={styles.greenBg}></span>
      </div>
      <div style={styles.lineRow}>
        <span style={styles.whiteBg}></span>
        <span style={styles.whiteBg}></span>
        <span style={styles.greenBg}></span>
        <span style={styles.greenBg}></span>
      </div>
      <div style={styles.lineRow}>
        <span style={styles.whiteBg}></span>
        <span style={styles.whiteBg}></span>
        <span style={styles.greenBg}></span>
        <span style={styles.greenBg}></span>
      </div>
      <div style={styles.lineRow}>
        <span style={styles.whiteBg}></span>
        <span style={styles.whiteBg}></span>
        <span style={styles.greenBg}></span>
        <span style={styles.greenBg}></span>
      </div>
      <div style={styles.lineRow}>
        <span style={styles.whiteBg}></span>
        <span style={styles.whiteBg}></span>
        <span style={styles.greenBg}></span>
        <span style={styles.greenBg}></span>
      </div>
      <div style={styles.lineRow}>
        <span style={styles.whiteBg}></span>
        <span style={styles.whiteBg}></span>
        <span style={styles.greenBg}></span>
        <span style={styles.greenBg}></span>
      </div>
      <div style={styles.text}>
        <p className='text-background text-center' >Welcome <span className='block text-2xl'>Greenfie</span></p>
      </div>
      <style>
        {`
          @keyframes slideRight {
            0% {
              transform: translateX(0);
            }
            50% {
              transform: translateX(200%);
            }
            100% {
              transform: translateX(0);
            }
          }

          @keyframes slideLeft {
            0% {
              transform: translateX(0);
            }
            50% {
              transform: translateX(-200%);
            }
            100% {
              transform: translateX(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Greetings;
