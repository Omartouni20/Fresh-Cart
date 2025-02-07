import { motion } from "framer-motion";

export default function LoaderScreen() {
  const name = "Omar"; 
  const letters = name.split("");

  return (
    <div className="h-screen flex justify-center items-center bg-white">
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="text-4xl font-bold text-green-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: index * 0.2 }}
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
}
