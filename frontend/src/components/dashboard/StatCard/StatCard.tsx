import type { LucideIcon } from 'lucide-react'
import './StatCard.css'

type StatCardVariant = 'primary' | 'success' | 'warning' | 'danger'

interface StatCardProps {
  title: string
  value: number
  description: string
  icon: LucideIcon
  variant: StatCardVariant
}

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  variant,
}: StatCardProps) {
  return (
    <article className="stat-card">
      <div className={`stat-card__icon stat-card__icon--${variant}`}>
        <Icon size={22} strokeWidth={2} />
      </div>

      <div className="stat-card__content">
        <span className="stat-card__title">{title}</span>

        <strong className="stat-card__value">
          {value.toLocaleString()}
        </strong>

        <span className="stat-card__description">
          {description}
        </span>
      </div>
    </article>
  )
}

export default StatCard