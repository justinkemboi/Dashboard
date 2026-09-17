const dashboard = document.getElementById('dashboard')

if (dashboard) {
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return

    const sidePanel = document.getElementById('sidePanel')
    if (sidePanel?.classList.contains('open') && typeof window.closeSidePanel === 'function') {
      window.closeSidePanel()
    }
  })
}
