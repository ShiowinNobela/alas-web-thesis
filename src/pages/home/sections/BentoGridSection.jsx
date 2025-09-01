import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'backOut',
    },
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

const BentoGrid = () => {
  const mainItems = [
    {
      src: 'https://res.cloudinary.com/drq2wzvmo/image/upload/v1749302419/alas_uploads/ffgfhv57rvygxjkriw9e.jpg',
      name: 'Call Me Debra',
      col: 'col-span-2',
      row: 'row-span-2',
      overlay: 'bg-gradient-to-br from-purple-900/40 to-pink-500/30 z-10',
      border: 'border-2 border-white/20 hover:border-pink-400/50',
      textStyle: 'text-white text-3xl font-bold text-shadow-lg',
      rounded: 'rounded-xl',
      animation: {
        whileHover: {
          rotate: -1,
          boxShadow: '0 10px 25px -5px rgba(236, 72, 153, 0.2)',
        },
        animate: {
          scale: [1, 1.01, 1],
          transition: { duration: 8, repeat: Infinity },
        },
      },
    },
    {
      src: 'https://res.cloudinary.com/drq2wzvmo/image/upload/v1749428840/alas_uploads/oiozltbt0elfb21gutjx.jpg',
      name: 'Hikari',
      col: 'col-span-1',
      row: 'row-span-1',
      overlay: 'bg-gradient-to-t from-amber-500/50 to-transparent',
      border: 'border-2 border-amber-300/10 hover:border-amber-300/50',
      textStyle: 'text-amber-100 font-medium',
      rounded: 'rounded-2xl',
      animation: {
        whileHover: {
          scale: 1.03,
          boxShadow: '0 10px 25px -5px rgba(245, 158, 11, 0.3)',
        },
        animate: {
          y: [0, -10, 0],
          transition: { duration: 6, repeat: Infinity },
        },
      },
    },
    {
      src: 'https://res.cloudinary.com/drq2wzvmo/image/upload/v1749429258/alas_uploads/tt7sizbzygeudeg38x4u.jpg',
      name: 'Lé Blanc',
      col: 'col-span-1',
      row: 'row-span-1',
      overlay: 'bg-gradient-to-tr from-white/10 to-blue-300/20',
      border: 'border-2 border-white/5 hover:border-blue-400/50',
      textStyle: 'text-white font-bold tracking-wider',
      rounded: 'rounded-lg',
      animation: {
        whileHover: {
          y: -5,
          boxShadow: '0 10px 25px -5px rgba(96, 165, 250, 0.2)',
        },
        animate: {
          y: [0, -15, 0],
          transition: {
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        },
      },
    },
    {
      src: 'https://res.cloudinary.com/drq2wzvmo/image/upload/v1749302297/alas_uploads/gzl6lzcevjp8uhyza6h8.jpg',
      name: 'Birds Eye Gambit',
      col: 'col-span-2',
      row: 'row-span-1',
      overlay: 'bg-gradient-to-r from-black/60 to-red-900/50',
      border: 'border-2 border-red-500/20 hover:border-red-500/70',
      textStyle: 'text-red-100 font-extrabold uppercase tracking-widest',
      rounded: 'rounded-3xl',
      animation: {
        whileHover: {
          skewX: -5,
          boxShadow: '0 10px 25px -5px rgba(239, 68, 68, 0.4)',
        },
        animate: {
          scale: [1, 1.02, 1],
          transition: { duration: 3, repeat: Infinity },
        },
      },
    },
    {
      src: 'https://res.cloudinary.com/drq2wzvmo/image/upload/v1749302469/alas_uploads/y3alljz8lpsne23jbdm2.jpg',
      name: 'Grin',
      col: 'col-span-1',
      row: 'row-span-1',
      overlay: 'bg-gradient-to-b from-indigo-900/70 to-purple-900/60',
      border: 'border-2 border-indigo-400/30 hover:border-indigo-400/80',
      textStyle: 'text-indigo-100 font-light italic',
      rounded: 'rounded-full',
      animation: {
        whileHover: {
          scale: 0.95,
          boxShadow: '0 10px 25px -5px rgba(129, 140, 248, 0.3)',
        },
        animate: {
          rotate: 360,
          transition: {
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          },
        },
      },
    },
    {
      src: 'https://res.cloudinary.com/drq2wzvmo/image/upload/v1749302550/alas_uploads/zgb62etqzs0pmyohucar.jpg',
      name: 'Gypsy Bu',
      col: 'col-span-1',
      row: 'row-span-2',
      overlay: 'bg-gradient-to-t from-red-900/70 via-black/40 to-transparent',
      border: 'border-2 border-red-900/30 hover:border-red-600/80',
      textStyle: 'text-red-100 font-bold text-2xl',
      rounded: 'rounded-xl',
      animation: {
        whileHover: {
          x: -4,
          boxShadow: '0 10px 25px -5px rgba(153, 27, 27, 0.5)',
        },
        animate: {
          y: [0, -15, 0],
          transition: { duration: 8, repeat: Infinity },
        },
      },
    },
  ];

  const extraItems = [
    {
      src: 'https://res.cloudinary.com/drq2wzvmo/image/upload/v1749430659/alas_uploads/gdnrmuifue2oitvhudi8.jpg',
      name: 'Swan Song',
      col: 'col-span-1',
      row: 'row-span-1',
      overlay: 'bg-gradient-to-b from-emerald-900/60 to-teal-500/40',
      border: 'border-2 border-teal-400/20 hover:border-teal-400/70',
      textStyle: 'text-teal-50 font-medium',
      rounded: 'rounded-xl',
      animation: {
        whileHover: {
          rotate: 2,
          boxShadow: '0 10px 25px -5px rgba(20, 184, 166, 0.3)',
        },
        animate: {
          y: [0, -10, 0],
          transition: { duration: 7, repeat: Infinity },
        },
      },
      button: true,
    },
    {
      src: 'https://res.cloudinary.com/drq2wzvmo/image/upload/v1749302380/alas_uploads/gpdvbwvqnx1l2ri4fbx9.jpg',
      name: 'Cabron',
      col: 'col-span-1',
      row: 'row-span-1',
      overlay: 'bg-gradient-to-tr from-violet-900/70 to-fuchsia-500/50',
      border: 'border-2 border-purple-400/20 hover:border-purple-400/70',
      textStyle: 'text-purple-50 font-bold',
      rounded: 'rounded-2xl',
      animation: {
        whileHover: {
          scale: 1.05,
          boxShadow: '0 10px 25px -5px rgba(192, 132, 252, 0.4)',
        },
        animate: {
          scale: [1, 1.02, 1],
          transition: { duration: 4, repeat: Infinity },
        },
      },
      button: true,
    },
    {
      src: 'https://res.cloudinary.com/drq2wzvmo/image/upload/v1749302191/alas_uploads/jhoewzaufjiglbxcfdvx.jpg',
      name: 'Ballad of Q',
      col: 'col-span-2',
      row: 'row-span-1',
      overlay: 'bg-gradient-to-r from-amber-900/60 to-yellow-500/50',
      border: 'border-2 border-amber-400/20 hover:border-amber-400/70',
      textStyle: 'text-amber-50 font-extrabold text-xl',
      rounded: 'rounded-3xl',
      animation: {
        whileHover: {
          skewY: 2,
          boxShadow: '0 10px 25px -5px rgba(245, 158, 11, 0.5)',
        },
        animate: {
          y: [0, -15, 0],
          transition: {
            duration: 6,
            repeat: Infinity,
            type: 'spring',
            damping: 5,
          },
        },
      },
      button: true,
    },
  ];

  return (
    <section className="bg-neutral font-heading min-h-screen px-6 py-24 text-center sm:px-10">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-content font-heading mb-10 text-4xl font-extrabold drop-shadow sm:text-5xl"
      >
        "Tikman mo yung Alas!"
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="mx-auto grid max-w-5xl auto-rows-[200px] grid-cols-2 gap-4 sm:grid-cols-4"
      >
        {mainItems.map((prod, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover="hover"
            {...prod.animation}
            className={`relative flex cursor-pointer flex-col items-center justify-center overflow-hidden backdrop-blur-sm ${prod.col} ${prod.row} ${prod.border} ${prod.rounded}`}
          >
            <motion.img
              src={prod.src}
              alt={prod.name}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />

            <div className={`absolute inset-0 ${prod.overlay}`} />
            <motion.div
              className="relative z-10 flex h-full w-full flex-col items-center justify-end p-4"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              <p className={`${prod.textStyle}`}>{prod.name}</p>
              {prod.name && (
                <motion.button
                  className="mt-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold tracking-wide text-black uppercase"
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  View
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        ))}

        {extraItems.map((prod, i) => (
          <motion.div
            key={`extra-${i}`}
            variants={itemVariants}
            whileHover="hover"
            {...prod.animation}
            className={`relative flex cursor-pointer flex-col items-center justify-center overflow-hidden backdrop-blur-sm ${prod.col} ${prod.row} ${prod.border} ${prod.rounded}`}
          >
            <motion.img
              src={prod.src}
              alt={prod.name}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.7 }}
            />
            <motion.div
              className={`absolute inset-0 ${prod.overlay}`}
              whileHover={{ opacity: 0.9 }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className="relative z-10 flex h-full w-full flex-col items-center justify-center p-4"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              <motion.p
                className={`mb-2 ${prod.textStyle}`}
                whileHover={{ marginBottom: '1rem', scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {prod.name}
              </motion.p>
              {prod.button && (
                <motion.button
                  className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold tracking-wide text-black"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  Add to Cart
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default BentoGrid;
