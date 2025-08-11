import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function ShowcaseButton({
  children,
  icon,
  className,
  bgColor = 'bg-amber-100',
  textColor = 'text-amber-600',
  hoverBgHex = '#f59e0b',
  hoverTextColor = '#fff',
  ...rest
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.7 }}
    >
      <Button
        asChild
        className={cn(
          `group font-heading inline-flex w-fit items-center gap-2 rounded-lg px-5 py-3 font-medium transition-all`,
          bgColor,
          textColor,
          className
        )}
        {...rest}
      >
        <motion.a
          whileHover={{
            x: 5,
            backgroundColor: hoverBgHex,
            color: hoverTextColor,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="flex items-center gap-2"
        >
          {children}
          {icon && (
            <span className="transition-transform group-hover:translate-x-1">
              {icon}
            </span>
          )}
        </motion.a>
      </Button>
    </motion.div>
  );
}
