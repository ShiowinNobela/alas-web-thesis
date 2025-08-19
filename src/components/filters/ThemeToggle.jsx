import { useTheme } from '@/provider/ThemeProvider';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="rounded-full"
        aria-label="Toggle theme"
      >
        <motion.div
          animate={{
            rotate: isDarkMode ? 360 : 0,
            scale: isDarkMode ? 0.9 : 1,
          }}
          transition={{
            rotate: { duration: 0.5, ease: 'easeInOut' },
            scale: { duration: 0.2 },
          }}
        >
          {/* Keep the element always rendered to preserve animation */}
          {isDarkMode ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </motion.div>
      </Button>
    </motion.div>
  );
}
