interface SectionBadgeProps {
  children: React.ReactNode
  icon?: React.ReactNode
}

export default function SectionBadge({ children, icon }: SectionBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
      style={{
        background: 'rgba(59,130,246,0.1)',
        border: '1px solid rgba(59,130,246,0.25)',
        color: '#60A5FA',
      }}
    >
      {icon && <span className="text-base">{icon}</span>}
      {children}
    </div>
  )
}
