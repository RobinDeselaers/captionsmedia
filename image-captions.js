(function() {
  // Function to attach captions to images
  function generateImageCaptions() {
    // Target images in articles that haven't been processed yet
    const images = document.querySelectorAll('.news-detail-post-content img:not(.caption-added)');
    
    images.forEach(img => {
      const altText = img.getAttribute('alt');
      
      // Ignore empty alt tags or Staffbase's default "An image" text
      if (altText && altText.trim() !== "An image" && altText.trim() !== "") {
        
        // Create the caption element
        const caption = document.createElement('span');
        caption.className = 'custom-image-caption';
        caption.textContent = altText.trim();
        
        // Insert the caption directly after the image
        img.parentNode.insertBefore(caption, img.nextSibling);
        
        // Mark the image so the script doesn't duplicate the caption later
        img.classList.add('caption-added');
      }
    });
  }

  // 1. Run immediately for the initial page load
  generateImageCaptions();

  // 2. Set up a MutationObserver for Single Page Application routing
  // This watches the DOM for newly loaded articles and runs the function again
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.addedNodes.length > 0) {
        generateImageCaptions();
      }
    }
  });

  // Start observing the body for changes
  observer.observe(document.body, { childList: true, subtree: true });
})();
