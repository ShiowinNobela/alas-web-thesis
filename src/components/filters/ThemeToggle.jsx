import { useTheme } from '@/provider/ThemeProvider';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Switch } from '@/components/ui/switch';

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="flex items-center gap-3">
      {/* Sun Icon */}
      <motion.div
        animate={{ opacity: isDarkMode ? 0.4 : 1, scale: isDarkMode ? 0.8 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Sun className="h-4 w-4 text-yellow-500" />
      </motion.div>

      {/* Switch */}
      <Switch
        checked={isDarkMode}
        onCheckedChange={toggleTheme}
        className={`data-[state=checked]:bg-primary/50 data-[state=unchecked]:bg-primary relative transition-colors duration-300`}
      ></Switch>

      {/* Moon Icon */}
      <motion.div
        animate={{ opacity: isDarkMode ? 1 : 0.4, scale: isDarkMode ? 1 : 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <Moon className="h-4 w-4 text-indigo-400" />
      </motion.div>
    </div>
  );
}
