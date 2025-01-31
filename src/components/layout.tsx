import type React from "react"

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <h1 className="title">Pokédex</h1>
        </div>
      </header>
      <main className="main-content">{children}</main>
    </div>
  )
}

export default Layout

