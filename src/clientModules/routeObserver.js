export function onRouteDidUpdate({location, previousLocation}) {
  if (location.pathname !== previousLocation?.pathname) {
    // Wait for React to finish rendering the new route
    setTimeout(() => {
      if (window.google && window.google.translate && window.googleTranslateElementInit) {
        const el = document.getElementById('google_translate_element');
        // If the navbar re-rendered and wiped our translate widget, re-initialize it
        if (el && el.innerHTML === '') {
           window.googleTranslateElementInit();
        }
      }
    }, 100);
  }
}
