interface LayoutProps {
  children: React.ReactNode
}

export default async function Layout({ children }: Readonly<LayoutProps>) {
  return (
    <div className="flex items-center justify-center h-screen">{children}</div>
  )
}
