import { motion } from 'framer-motion'
interface ProgressBarProps {
  progress: number // 0 to 100
  showLabel?: boolean
  color?: string
  height?: number
}
export function ProgressBar({
  progress,
  showLabel = false,
  color = '#10B981',
  height = 8,
}: ProgressBarProps) {
  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-xs font-medium text-gray-700">Progress</span>
          <span className="text-xs font-medium text-gray-700">
            {Math.round(progress)}%
          </span>
        </div>
      )}
      <div
        className="w-full bg-gray-200 rounded-full overflow-hidden"
        style={{
          height,
        }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            backgroundColor: color,
          }}
          initial={{
            width: 0,
          }}
          animate={{
            width: `${progress}%`,
          }}
          transition={{
            duration: 0.5,
            ease: 'easeOut',
          }}
        />
      </div>
    </div>
  )
}
