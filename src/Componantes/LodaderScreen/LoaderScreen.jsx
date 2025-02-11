import { Bars, ThreeDots } from 'react-loader-spinner';

export default function LoaderScreen() {
  //const name = "Omar"; 

  return (
    //<div className="h-screen flex justify-center items-center bg-white">
    //  {letters.map((letter, index) => (
    //    <motion.span
    //      key={index}
    //      className="text-4xl font-bold text-green-400"
    //      initial={{ opacity: 0, y: 20 }}
    //      animate={{ opacity: 1, y: 0 }}
    //      transition={{ duration: 0.7, delay: index * 0.2 }}
    //    >
    //      {letter}
    //    </motion.span>
    //  ))}
    //</div>
    <div className="flex items-center justify-center h-screen bg-gray-100">
    <Bars
      height="80"
      width="80"
      color="#34D399" 
      ariaLabel="bars-loading"
      wrapperClass="loader-wrapper"
      visible={true}
      wrapperStyle={{}} 
    />
  </div>
  );
}
