import {useEffect, useRef} from 'react'
import {scroller} from 'react-scroll'
import {useNavigate} from "react-router-dom";

function useScrollSpy(sectionId, path) {
  const ref = useRef(null)
  const hasScrolledOnLoad = useRef(false)

  const navigate = useNavigate()
  // Scroll to section on load if path matches

  useEffect(() => {
    if (window.location.pathname === path && !hasScrolledOnLoad.current) {
      scroller.scrollTo(sectionId, {
        duration: 0,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: 0 // usable for sticky header
      })
      hasScrolledOnLoad.current = true
    }
  }, [sectionId, path])
  // Update URL on scroll when section is in view
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const newUrl = path
          if (window.location.pathname !== newUrl) {

            // window.history.replaceState(null, '', newUrl)
            navigate(path, {replace: false})
          }
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.8 // 80% percent of component has to be visible to change url
      }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
    }
  }, [path])

  return ref
}

export default useScrollSpy