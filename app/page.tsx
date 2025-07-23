"use client"

import React, { useState, useContext, useEffect } from "react"

// Theme System
const theme = {
  colors: {
    electricCyan: "#00CED1",
    bgBase: "#0A0A0A",
    bgSurface: "#0F0F0F",
    bgRaised: "#141414",
    bgHover: "#1A1A1A",
    textPrimary: "#FFFFFF",
    textSecondary: "#D1D5DB",
    textMuted: "#9CA3AF",
    borderDefault: "#1A1A1A",
    statusSuccess: "#10B981",
    statusWarning: "#F59E0B",
    statusError: "#EF4444",
    overlayLight: "rgba(255, 255, 255, 0.05)",
  },
  gradients: {
    primaryButton: "linear-gradient(135deg, #00CED1 0%, #00A8AA 100%)",
    navActive: "linear-gradient(90deg, rgba(0, 206, 209, 0.08) 0%, transparent 60%)",
    navHover: "linear-gradient(90deg, rgba(255, 255, 255, 0.02) 0%, transparent 60%)",
  },
  motion: {
    fast: "150ms",
    normal: "250ms",
    ease: "cubic-bezier(0.16, 1, 0.3, 1)",
  },
  spacing: {
    xs: "8px",
    sm: "16px",
    md: "24px",
    lg: "32px",
    xl: "48px",
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    sizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "2rem",
    },
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  layout: {
    sidebarWidth: "280px",
    headerHeight: "64px",
  },
  shadows: {
    sm: "0 2px 4px rgba(0, 0, 0, 0.1)",
    md: "0 4px 12px rgba(0, 0, 0, 0.2)",
    lg: "0 10px 25px rgba(0, 0, 0, 0.5)",
    cyanSm: "0 2px 8px rgba(0, 206, 209, 0.3)",
    cyanMd: "0 4px 16px rgba(0, 206, 209, 0.4)",
  },
  radius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "20px",
  },
}

// Global styles
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: ${theme.typography.fontFamily};
    background: ${theme.colors.bgBase};
    color: ${theme.colors.textPrimary};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`

// Button Component
const Button = React.memo(
  ({ variant = "primary", size = "medium", children, onClick, disabled, style = {}, ...props }) => {
    const sizeStyles = {
      small: { padding: "8px 16px", fontSize: theme.typography.sizes.xs },
      medium: { padding: "12px 24px", fontSize: theme.typography.sizes.sm },
      large: { padding: "16px 32px", fontSize: theme.typography.sizes.base },
    }

    const variantStyles = {
      primary: {
        background: theme.gradients.primaryButton,
        color: "#FFFFFF",
        border: "none",
        boxShadow: theme.shadows.cyanSm,
      },
      secondary: {
        background: "transparent",
        color: theme.colors.textPrimary,
        border: `1px solid rgba(255, 255, 255, 0.2)`,
      },
      ghost: {
        background: "transparent",
        color: theme.colors.textMuted,
        border: "none",
      },
    }

    const [isHovered, setIsHovered] = useState(false)

    return (
      <button
        onClick={onClick}
        disabled={disabled}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          ...sizeStyles[size],
          ...variantStyles[variant],
          borderRadius: theme.radius.md,
          fontWeight: theme.typography.weights.semibold,
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.5 : 1,
          transition: `all ${theme.motion.normal} ${theme.motion.ease}`,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: theme.spacing.xs,
          fontFamily: theme.typography.fontFamily,
          transform: isHovered && !disabled ? "translateY(-1px)" : "translateY(0)",
          boxShadow:
            isHovered && !disabled && variant === "primary" ? theme.shadows.cyanMd : variantStyles[variant].boxShadow,
          ...style,
        }}
        {...props}
      >
        {children}
      </button>
    )
  },
)

// Input Component
const Input = React.memo(({ type = "text", placeholder, value, onChange, style = {}, ...props }) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style={{
        width: "100%",
        padding: "12px 16px",
        background: isFocused ? theme.colors.bgBase : theme.colors.bgRaised,
        border: `1px solid ${isFocused ? "rgba(0, 206, 209, 0.5)" : theme.colors.borderDefault}`,
        borderRadius: theme.radius.md,
        color: theme.colors.textPrimary,
        fontSize: theme.typography.sizes.sm,
        outline: "none",
        transition: `all ${theme.motion.fast} ${theme.motion.ease}`,
        fontFamily: theme.typography.fontFamily,
        ...style,
      }}
      {...props}
    />
  )
})

// Card Component
const Card = React.memo(({ children, hoverable = false, onClick, style = {} }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => hoverable && setIsHovered(true)}
      onMouseLeave={() => hoverable && setIsHovered(false)}
      style={{
        background: theme.colors.bgSurface,
        border: `1px solid ${isHovered ? "rgba(255, 255, 255, 0.15)" : theme.colors.borderDefault}`,
        borderRadius: theme.radius.lg,
        padding: theme.spacing.md,
        transition: `all ${theme.motion.normal} ${theme.motion.ease}`,
        cursor: onClick ? "pointer" : "default",
        transform: isHovered && hoverable ? "translateY(-1px)" : "translateY(0)",
        boxShadow: isHovered && hoverable ? theme.shadows.md : "none",
        ...style,
      }}
    >
      {children}
    </div>
  )
})

// Badge Component
const Badge = React.memo(({ variant = "default", children, style = {} }) => {
  const variantStyles = {
    default: {
      background: "rgba(255, 255, 255, 0.1)",
      color: theme.colors.textPrimary,
      border: "1px solid rgba(255, 255, 255, 0.2)",
    },
    success: {
      background: "rgba(16, 185, 129, 0.1)",
      color: theme.colors.statusSuccess,
      border: "1px solid transparent",
    },
    warning: {
      background: "rgba(245, 158, 11, 0.1)",
      color: theme.colors.statusWarning,
      border: "1px solid transparent",
    },
    error: {
      background: "rgba(239, 68, 68, 0.1)",
      color: theme.colors.statusError,
      border: "1px solid transparent",
    },
  }

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 12px",
        borderRadius: theme.radius.xl,
        fontSize: theme.typography.sizes.xs,
        fontWeight: theme.typography.weights.semibold,
        lineHeight: 1,
        ...variantStyles[variant],
        ...style,
      }}
    >
      {children}
    </span>
  )
})

// Context
const AppContext = React.createContext(null)

const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    return {
      currentFlow: "businessContext",
      setFlow: () => {},
      handleLogout: () => {},
    }
  }
  return context
}

// Icons
const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
)

const SaveIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9,11 12,14 22,4" />
    <path d="M21,12v7a2,2 0 0,1-2,2H5a2,2 0 0,1-2-2V5a2,2 0 0,1,2-2h11" />
  </svg>
)

const CancelIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const AddIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const DeleteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3,6 5,6 21,6" />
    <path d="M19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
)

const BuildingIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
    <path d="M6 12h4m0 0h4m-4 0v6m-4-3h8" />
  </svg>
)

const BriefcaseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
)

const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

// Sidebar Component
const Sidebar = React.memo(({ currentFlow }) => {
  const { setFlow } = useApp()

  const navItems = [
    {
      id: "visibilityScore",
      label: "Visibility Score",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M1 12s4-8 9-8 9 8 9 8-4 8-9 8-9-8-9-8z" />
          <circle cx="10" cy="12" r="3" />
        </svg>
      ),
    },
    {
      id: "citations",
      label: "Citations",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M13 7l3 3m0 0l-3 3m3-3H8m0 0a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      id: "recommendations",
      label: "Recommendations",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M10 2v6m0 0l3-3m-3 3L7 5" />
          <rect x="3" y="10" width="14" height="8" rx="2" />
        </svg>
      ),
    },
    {
      id: "businessContext",
      label: "Business Context",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="10" cy="10" r="8" />
          <circle cx="10" cy="10" r="5" />
        </svg>
      ),
    },
  ]

  return (
    <nav
      style={{
        width: theme.layout.sidebarWidth,
        background: theme.colors.bgSurface,
        borderRight: `1px solid ${theme.colors.borderDefault}`,
        padding: `${theme.spacing.md} ${theme.spacing.sm}`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: `0 ${theme.spacing.sm}`,
          marginBottom: theme.spacing.lg,
        }}
      >
        <div
          style={{
            fontSize: theme.typography.sizes.xl,
            fontWeight: theme.typography.weights.bold,
            color: theme.colors.electricCyan,
          }}
        >
          VisibilityStack
        </div>
      </div>

      {navItems.map((item) => {
        const isActive = currentFlow === item.id

        return (
          <div
            key={item.id}
            onClick={() => setFlow(item.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 16px",
              paddingLeft: "14px",
              marginBottom: "4px",
              borderRadius: theme.radius.md,
              borderLeft: `2px solid ${isActive ? theme.colors.electricCyan : "transparent"}`,
              background: isActive ? theme.gradients.navActive : "transparent",
              color: isActive ? theme.colors.textPrimary : theme.colors.textMuted,
              cursor: "pointer",
              transition: `all ${theme.motion.fast} ${theme.motion.ease}`,
              fontSize: theme.typography.sizes.sm,
              fontWeight: isActive ? theme.typography.weights.medium : theme.typography.weights.regular,
            }}
          >
            {item.icon}
            {item.label}
          </div>
        )
      })}
    </nav>
  )
})

// Header Component
const Header = React.memo(() => {
  const { setFlow } = useApp()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <header
      style={{
        height: theme.layout.headerHeight,
        background: theme.colors.bgSurface,
        borderBottom: `1px solid ${theme.colors.borderDefault}`,
        padding: `0 ${theme.spacing.lg}`,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <div style={{ position: "relative" }}>
        <div
          onClick={() => setDropdownOpen(!dropdownOpen)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: theme.spacing.xs,
            color: theme.colors.textMuted,
            cursor: "pointer",
            fontSize: theme.typography.sizes.sm,
          }}
        >
          john.doe@company.com
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {dropdownOpen && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              right: 0,
              minWidth: "200px",
              background: theme.colors.bgRaised,
              border: `1px solid ${theme.colors.borderDefault}`,
              borderRadius: theme.radius.md,
              boxShadow: theme.shadows.lg,
              padding: theme.spacing.xs,
              zIndex: 100,
            }}
          >
            <div
              onClick={() => {
                setFlow("settings")
                setDropdownOpen(false)
              }}
              style={{
                padding: `${theme.spacing.xs} 12px`,
                color: theme.colors.textSecondary,
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: theme.typography.sizes.sm,
              }}
            >
              Settings
            </div>
            <div
              style={{
                height: "1px",
                background: theme.colors.borderDefault,
                margin: `${theme.spacing.xs} 0`,
              }}
            />
            <div
              onClick={() => setDropdownOpen(false)}
              style={{
                padding: `${theme.spacing.xs} 12px`,
                color: theme.colors.textSecondary,
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: theme.typography.sizes.sm,
              }}
            >
              Sign Out
            </div>
          </div>
        )}
      </div>
    </header>
  )
})

// Company Profile Component
const CompanyProfile = ({ data, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(data)

  const handleSave = () => {
    onUpdate(formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData(data)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: theme.spacing.md,
          }}
        >
          <h3 style={{ fontSize: theme.typography.sizes.lg, fontWeight: theme.typography.weights.semibold }}>
            Company Profile
          </h3>
          <div style={{ display: "flex", gap: theme.spacing.xs }}>
            <Button size="small" onClick={handleSave}>
              <SaveIcon />
              Save
            </Button>
            <Button variant="ghost" size="small" onClick={handleCancel}>
              <CancelIcon />
              Cancel
            </Button>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: theme.spacing.md,
            marginBottom: theme.spacing.md,
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontSize: theme.typography.sizes.sm,
                color: theme.colors.textMuted,
                marginBottom: theme.spacing.xs,
              }}
            >
              Company Name
            </label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter company name"
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                fontSize: theme.typography.sizes.sm,
                color: theme.colors.textMuted,
                marginBottom: theme.spacing.xs,
              }}
            >
              Website
            </label>
            <Input
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="https://example.com"
            />
          </div>
        </div>

        <div>
          <label
            style={{
              display: "block",
              fontSize: theme.typography.sizes.sm,
              color: theme.colors.textMuted,
              marginBottom: theme.spacing.xs,
            }}
          >
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe what your company does..."
            style={{
              width: "100%",
              padding: "12px 16px",
              background: theme.colors.bgRaised,
              border: `1px solid ${theme.colors.borderDefault}`,
              borderRadius: theme.radius.md,
              color: theme.colors.textPrimary,
              fontSize: theme.typography.sizes.sm,
              fontFamily: theme.typography.fontFamily,
              resize: "vertical",
              minHeight: "100px",
              outline: "none",
            }}
          />
        </div>
      </Card>
    )
  }

  return (
    <Card>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: theme.spacing.md,
        }}
      >
        <h3 style={{ fontSize: theme.typography.sizes.lg, fontWeight: theme.typography.weights.semibold }}>
          Company Profile
        </h3>
        <Button variant="secondary" size="small" onClick={() => setIsEditing(true)}>
          <EditIcon />
          Edit Profile
        </Button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: theme.spacing.md,
          marginBottom: theme.spacing.md,
        }}
      >
        <div>
          <label
            style={{
              display: "block",
              fontSize: theme.typography.sizes.sm,
              color: theme.colors.textMuted,
              marginBottom: theme.spacing.xs,
            }}
          >
            Company Name
          </label>
          <div style={{ color: theme.colors.textPrimary }}>{data.name}</div>
        </div>
        <div>
          <label
            style={{
              display: "block",
              fontSize: theme.typography.sizes.sm,
              color: theme.colors.textMuted,
              marginBottom: theme.spacing.xs,
            }}
          >
            Website
          </label>
          <div style={{ color: theme.colors.textPrimary }}>{data.website}</div>
        </div>
      </div>

      <div>
        <label
          style={{
            display: "block",
            fontSize: theme.typography.sizes.sm,
            color: theme.colors.textMuted,
            marginBottom: theme.spacing.xs,
          }}
        >
          Description
        </label>
        <div style={{ color: theme.colors.textPrimary, lineHeight: 1.6 }}>{data.description}</div>
      </div>
    </Card>
  )
}

// ICP Card Component
const ICPCard = ({ icp, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(icp)

  const handleSave = () => {
    onUpdate(formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData(icp)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <Card style={{ marginBottom: theme.spacing.md }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: theme.spacing.md,
          }}
        >
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="ICP Name"
            style={{ fontSize: theme.typography.sizes.lg, fontWeight: theme.typography.weights.semibold }}
          />
          <div style={{ display: "flex", gap: theme.spacing.xs }}>
            <Button size="small" onClick={handleSave}>
              <SaveIcon />
              Save
            </Button>
            <Button variant="ghost" size="small" onClick={handleCancel}>
              <CancelIcon />
              Cancel
            </Button>
          </div>
        </div>

        <div>
          <label
            style={{
              display: "block",
              fontSize: theme.typography.sizes.sm,
              color: theme.colors.textMuted,
              marginBottom: theme.spacing.xs,
            }}
          >
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe this ideal customer profile..."
            style={{
              width: "100%",
              padding: "12px 16px",
              background: theme.colors.bgRaised,
              border: `1px solid ${theme.colors.borderDefault}`,
              borderRadius: theme.radius.md,
              color: theme.colors.textPrimary,
              fontSize: theme.typography.sizes.sm,
              fontFamily: theme.typography.fontFamily,
              resize: "vertical",
              minHeight: "80px",
              outline: "none",
            }}
          />
        </div>
      </Card>
    )
  }

  return (
    <Card style={{ marginBottom: theme.spacing.md }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: theme.spacing.md,
        }}
      >
        <div style={{ flex: 1 }}>
          <h4
            style={{
              fontSize: theme.typography.sizes.lg,
              fontWeight: theme.typography.weights.semibold,
              marginBottom: theme.spacing.xs,
            }}
          >
            {icp.name}
          </h4>
          <div style={{ marginBottom: theme.spacing.sm }}>
            <Badge>{icp.type}</Badge>
          </div>
        </div>
        <div style={{ display: "flex", gap: theme.spacing.xs }}>
          <Button variant="secondary" size="small" onClick={() => setIsEditing(true)}>
            <EditIcon />
            Edit
          </Button>
          <Button variant="ghost" size="small" onClick={() => onDelete(icp.id)}>
            <DeleteIcon />
            Delete
          </Button>
        </div>
      </div>

      <div>
        <h5
          style={{ fontSize: theme.typography.sizes.sm, color: theme.colors.textMuted, marginBottom: theme.spacing.xs }}
        >
          Description
        </h5>
        <p style={{ color: theme.colors.textPrimary, lineHeight: 1.6 }}>{icp.description}</p>
      </div>
    </Card>
  )
}

// Business Context Screen
const BusinessContextScreen = () => {
  const [activeTab, setActiveTab] = useState("profile")
  const [isAddingICP, setIsAddingICP] = useState(false)
  const [newICP, setNewICP] = useState({
    name: "",
    type: "Enterprise",
    description: "",
  })

  // Mock data
  const [companyData, setCompanyData] = useState({
    name: "VisibilityStack.ai",
    website: "https://visibilitystack.ai",
    description:
      "Agentic AI platform that automates AI Search Optimization (AISO). Our AI Agents use deep AISO expertise to help businesses track, optimize, and dominate their AI visibility across platforms like ChatGPT, Claude, and Perplexity.",
  })

  const [icps, setIcps] = useState([
    {
      id: 1,
      name: "B2B SaaS Companies",
      type: "Enterprise",
      description:
        "B2B SaaS companies seeking to dominate AI search results and increase brand visibility across AI platforms like ChatGPT, Claude, and Perplexity.",
    },
    {
      id: 2,
      name: "Digital Marketing Agencies",
      type: "Agency",
      description:
        "Digital marketing agencies looking to offer AI Search Optimization as a premium service to their clients.",
    },
  ])

  const [competitors] = useState([
    { id: 1, name: "BrightEdge", website: "https://brightedge.com", type: "Indirect" },
    { id: 2, name: "Conductor", website: "https://conductor.com", type: "Indirect" },
    { id: 3, name: "Searchmetrics", website: "https://searchmetrics.com", type: "Indirect" },
  ])

  const tabs = [
    { id: "profile", label: "Company Profile", icon: <BuildingIcon /> },
    { id: "icps", label: "Company ICPs", icon: <BriefcaseIcon /> },
    { id: "competitors", label: "Competitors", icon: <UsersIcon /> },
  ]

  const deleteICP = (id) => {
    setIcps(icps.filter((icp) => icp.id !== id))
  }

  const updateICP = (updatedICP) => {
    setIcps(icps.map((icp) => (icp.id === updatedICP.id ? updatedICP : icp)))
  }

  const saveNewICP = () => {
    if (newICP.name.trim()) {
      const icp = {
        ...newICP,
        id: Date.now(),
      }
      setIcps([...icps, icp])
      setNewICP({
        name: "",
        type: "Enterprise",
        description: "",
      })
      setIsAddingICP(false)
    }
  }

  const cancelNewICP = () => {
    setNewICP({
      name: "",
      type: "Enterprise",
      description: "",
    })
    setIsAddingICP(false)
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: theme.spacing.xl }}>
        <h1
          style={{
            fontSize: theme.typography.sizes["2xl"],
            fontWeight: theme.typography.weights.bold,
            marginBottom: theme.spacing.xs,
          }}
        >
          Business Context
        </h1>
        <p style={{ fontSize: theme.typography.sizes.sm, color: theme.colors.textMuted }}>
          Information below helps AI Agents provide better recommendations and choose optimal prompts to monitor
        </p>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: theme.spacing.lg,
          borderBottom: `1px solid ${theme.colors.borderDefault}`,
          marginBottom: theme.spacing.lg,
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: theme.spacing.xs,
              padding: "12px 0",
              fontSize: theme.typography.sizes.sm,
              color: activeTab === tab.id ? theme.colors.textPrimary : theme.colors.textMuted,
              cursor: "pointer",
              position: "relative",
              transition: `all ${theme.motion.fast} ${theme.motion.ease}`,
              fontWeight: activeTab === tab.id ? theme.typography.weights.medium : theme.typography.weights.regular,
              border: "none",
              background: "none",
              fontFamily: theme.typography.fontFamily,
            }}
          >
            {tab.icon}
            {tab.label}
            {activeTab === tab.id && (
              <div
                style={{
                  position: "absolute",
                  bottom: "-1px",
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: theme.colors.electricCyan,
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "profile" && <CompanyProfile data={companyData} onUpdate={setCompanyData} />}

      {activeTab === "icps" && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: theme.spacing.md,
            }}
          >
            <div>
              <h3 style={{ fontSize: theme.typography.sizes.lg, fontWeight: theme.typography.weights.semibold }}>
                Company ICPs
              </h3>
              <p style={{ fontSize: theme.typography.sizes.sm, color: theme.colors.textMuted, marginTop: "4px" }}>
                Ideal customer profiles define your target market segments
              </p>
            </div>
            <Button onClick={() => setIsAddingICP(true)}>
              <AddIcon />
              Add ICP
            </Button>
          </div>

          {isAddingICP && (
            <Card style={{ marginBottom: theme.spacing.md }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: theme.spacing.md,
                }}
              >
                <h4 style={{ fontSize: theme.typography.sizes.lg, fontWeight: theme.typography.weights.semibold }}>
                  New ICP
                </h4>
                <div style={{ display: "flex", gap: theme.spacing.xs }}>
                  <Button size="small" onClick={saveNewICP}>
                    <SaveIcon />
                    Save
                  </Button>
                  <Button variant="ghost" size="small" onClick={cancelNewICP}>
                    <CancelIcon />
                    Cancel
                  </Button>
                </div>
              </div>

              <div style={{ marginBottom: theme.spacing.md }}>
                <label
                  style={{
                    display: "block",
                    fontSize: theme.typography.sizes.sm,
                    color: theme.colors.textMuted,
                    marginBottom: theme.spacing.xs,
                  }}
                >
                  ICP Name
                </label>
                <Input
                  value={newICP.name}
                  onChange={(e) => setNewICP({ ...newICP, name: e.target.value })}
                  placeholder="e.g., B2B SaaS Companies"
                />
              </div>

              <div style={{ marginBottom: theme.spacing.md }}>
                <label
                  style={{
                    display: "block",
                    fontSize: theme.typography.sizes.sm,
                    color: theme.colors.textMuted,
                    marginBottom: theme.spacing.xs,
                  }}
                >
                  Company Type
                </label>
                <select
                  value={newICP.type}
                  onChange={(e) => setNewICP({ ...newICP, type: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    background: theme.colors.bgRaised,
                    border: `1px solid ${theme.colors.borderDefault}`,
                    borderRadius: theme.radius.md,
                    color: theme.colors.textPrimary,
                    fontSize: theme.typography.sizes.sm,
                    fontFamily: theme.typography.fontFamily,
                    outline: "none",
                  }}
                >
                  <option value="Enterprise">Enterprise</option>
                  <option value="SMB">SMB</option>
                  <option value="Startup">Startup</option>
                  <option value="Agency">Agency</option>
                </select>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: theme.typography.sizes.sm,
                    color: theme.colors.textMuted,
                    marginBottom: theme.spacing.xs,
                  }}
                >
                  Description
                </label>
                <textarea
                  value={newICP.description}
                  onChange={(e) => setNewICP({ ...newICP, description: e.target.value })}
                  placeholder="Describe the ideal customer profile..."
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    background: theme.colors.bgRaised,
                    border: `1px solid ${theme.colors.borderDefault}`,
                    borderRadius: theme.radius.md,
                    color: theme.colors.textPrimary,
                    fontSize: theme.typography.sizes.sm,
                    fontFamily: theme.typography.fontFamily,
                    resize: "vertical",
                    minHeight: "80px",
                    outline: "none",
                  }}
                />
              </div>
            </Card>
          )}

          {icps.map((icp) => (
            <ICPCard key={icp.id} icp={icp} onUpdate={updateICP} onDelete={deleteICP} />
          ))}
        </div>
      )}

      {activeTab === "competitors" && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: theme.spacing.md,
            }}
          >
            <div>
              <h3 style={{ fontSize: theme.typography.sizes.lg, fontWeight: theme.typography.weights.semibold }}>
                Competitor Analysis
              </h3>
              <p style={{ fontSize: theme.typography.sizes.sm, color: theme.colors.textMuted, marginTop: "4px" }}>
                Companies you track for competitive intelligence
              </p>
            </div>
            <Button>
              <AddIcon />
              Add Competitor
            </Button>
          </div>

          <Card>
            <div style={{ display: "grid", gap: theme.spacing.sm }}>
              {competitors.map((competitor) => (
                <div
                  key={competitor.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 120px 80px",
                    gap: theme.spacing.sm,
                    alignItems: "center",
                    padding: theme.spacing.sm,
                    background: theme.colors.bgRaised,
                    border: `1px solid ${theme.colors.borderDefault}`,
                    borderRadius: theme.radius.md,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontWeight: theme.typography.weights.medium,
                        color: theme.colors.textPrimary,
                        marginBottom: "4px",
                      }}
                    >
                      {competitor.name}
                    </div>
                    <div style={{ fontSize: theme.typography.sizes.sm, color: theme.colors.textMuted }}>
                      {competitor.website}
                    </div>
                  </div>
                  <Badge variant={competitor.type === "Direct" ? "default" : "warning"}>{competitor.type}</Badge>
                  <div style={{ display: "flex", gap: "4px", justifyContent: "flex-end" }}>
                    <Button variant="ghost" size="small">
                      <EditIcon />
                    </Button>
                    <Button variant="ghost" size="small">
                      <DeleteIcon />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

// Simple placeholder screens
const VisibilityScoreScreen = () => (
  <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
    <h1 style={{ fontSize: theme.typography.sizes["2xl"], marginBottom: theme.spacing.md }}>Visibility Score</h1>
    <Card>
      <p style={{ color: theme.colors.textSecondary }}>Visibility Score dashboard coming soon...</p>
    </Card>
  </div>
)

const CitationsScreen = () => (
  <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
    <h1 style={{ fontSize: theme.typography.sizes["2xl"], marginBottom: theme.spacing.md }}>Citations</h1>
    <Card>
      <p style={{ color: theme.colors.textSecondary }}>Citation analysis dashboard coming soon...</p>
    </Card>
  </div>
)

const RecommendationsScreen = () => (
  <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
    <h1 style={{ fontSize: theme.typography.sizes["2xl"], marginBottom: theme.spacing.md }}>Recommendations</h1>
    <Card>
      <p style={{ color: theme.colors.textSecondary }}>AI-powered recommendations coming soon...</p>
    </Card>
  </div>
)

const SettingsScreen = () => (
  <div style={{ maxWidth: "800px", margin: "0 auto" }}>
    <h1 style={{ fontSize: theme.typography.sizes["2xl"], marginBottom: theme.spacing.md }}>Settings</h1>
    <Card>
      <p style={{ color: theme.colors.textSecondary }}>Account settings and preferences coming soon...</p>
    </Card>
  </div>
)

// Main App
export default function App() {
  const [currentFlow, setCurrentFlow] = useState("businessContext")

  // Inject global styles
  useEffect(() => {
    const styleElement = document.createElement("style")
    styleElement.textContent = globalStyles
    document.head.appendChild(styleElement)
    return () => {
      if (document.head.contains(styleElement)) {
        document.head.removeChild(styleElement)
      }
    }
  }, [])

  const contextValue = {
    currentFlow,
    setFlow: setCurrentFlow,
    handleLogout: () => console.log("Logout clicked"),
  }

  return (
    <AppContext.Provider value={contextValue}>
      <div
        style={{
          display: "flex",
          height: "100vh",
          background: theme.colors.bgBase,
          color: theme.colors.textPrimary,
        }}
      >
        <Sidebar currentFlow={currentFlow} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Header />
          <main
            style={{
              flex: 1,
              overflow: "auto",
              padding: theme.spacing.lg,
            }}
          >
            {currentFlow === "visibilityScore" && <VisibilityScoreScreen />}
            {currentFlow === "citations" && <CitationsScreen />}
            {currentFlow === "recommendations" && <RecommendationsScreen />}
            {currentFlow === "businessContext" && <BusinessContextScreen />}
            {currentFlow === "settings" && <SettingsScreen />}
          </main>
        </div>
      </div>
    </AppContext.Provider>
  )
}
