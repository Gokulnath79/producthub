import {
  CirclePlus,
  Pencil,
  Trash2,
  type LucideIcon,
} from 'lucide-react'

import './RecentActivity.css'

export type ActivityVariant = 'added' | 'updated' | 'deleted'

export interface Activity {
  id: number
  title: string
  description: string
  time: string
  variant: ActivityVariant
}

interface RecentActivityProps {
  activities: Activity[]
}

const activityIcons: Record<ActivityVariant, LucideIcon> = {
  added: CirclePlus,
  updated: Pencil,
  deleted: Trash2,
}

function RecentActivity({
  activities,
}: RecentActivityProps) {
  return (
    <section className="recent-activity">
      <div className="recent-activity__header">
        <div>
          <h2>Recent Activity</h2>
          <p>Latest changes made to your product inventory.</p>
        </div>
      </div>

      <div className="recent-activity__list">
        {activities.length > 0 ? (
          activities.map((activity) => {
            const Icon = activityIcons[activity.variant]

            return (
              <article
                className="recent-activity__item"
                key={activity.id}
              >
                <div
                  className={`recent-activity__icon recent-activity__icon--${activity.variant}`}
                >
                  <Icon size={18} strokeWidth={2} />
                </div>

                <div className="recent-activity__content">
                  <span className="recent-activity__title">
                    {activity.title}
                  </span>

                  <span className="recent-activity__description">
                    {activity.description}
                  </span>
                </div>

                <time className="recent-activity__time">
                  {activity.time}
                </time>
              </article>
            )
          })
        ) : (
          <div className="recent-activity__empty">
            No recent product activity.
          </div>
        )}
      </div>
    </section>
  )
}

export default RecentActivity