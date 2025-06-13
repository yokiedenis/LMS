// AnimatedHeader.tsx
import { motion } from "framer-motion";

interface AnimatedHeaderProps {
  title: string;
}

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({ title }) => {
  return (
    <motion.h1
      className="font-semibold"
      style={{
        color: 'yellow', // Text color
        backgroundColor: '#6A0DAD', // Background color
        padding: '12px 20px', // Padding for spacing
        borderRadius: '8px', // Rounded corners
      }}
      animate={{ scale: [1, 1.1, 1] }} // Popping effect
      transition={{ duration: 0.3, ease: "easeInOut", repeat: Infinity }} // Animation settings
    >
      {title}
    </motion.h1>
  );
};

export default AnimatedHeader;
