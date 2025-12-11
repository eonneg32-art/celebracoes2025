document.addEventListener('DOMContentLoaded', () => {
  
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    const navUl = document.querySelector('nav ul');
    const dot = document.querySelector('.dot');
    const activeItem = document.querySelector('nav ul li.active');
    
  
    function getItemCenter(item) {
        const rect = item.getBoundingClientRect();
     
        const navRect = navUl.getBoundingClientRect();
        const itemLeft = item.offsetLeft; 
        const itemWidth = item.offsetWidth;
        
        return itemLeft + itemWidth / 2;
    }

    function getItemBgColor(item) {
        const anchor = item.querySelector('a');
        if (anchor) {
            let bgColor = getComputedStyle(anchor).backgroundColor;
            
        
            if (bgColor === 'transparent' || bgColor === 'rgba(0, 0, 0, 0)') {
              
                const rootStyle = getComputedStyle(document.documentElement);
                const secondaryColor = rootStyle.getPropertyValue('--cor-secundaria').trim();
                
                return secondaryColor || 'default-secondary-color'; 
            }
            return bgColor;
        }
        return null;
    }
    
   
    let initialDotPosition = null;
    let initialDotColor = null;

    function positionDotToActive() {
        if (activeItem && dot) {
            initialDotPosition = getItemCenter(activeItem);
            initialDotColor = getItemBgColor(activeItem);

            dot.style.left = initialDotPosition + 'px';
            if (initialDotColor) {
                dot.style.backgroundColor = initialDotColor;
            }
        }
    }

    if (activeItem) {
        positionDotToActive();
    }

    const navItems = document.querySelectorAll('nav ul li');

    navItems.forEach(item => {
      
        item.addEventListener('mouseenter', function() {
            if (dot) {
                const newLeft = getItemCenter(this);
                const bgColor = getItemBgColor(this);
                
                dot.style.left = newLeft + 'px';
                if (bgColor) {
                    dot.style.backgroundColor = bgColor;
                }
            }
        });
    });

    
    if (navUl && activeItem) {
        navUl.addEventListener('mouseleave', function() {
            if (dot && initialDotPosition !== null && initialDotColor !== null) {
               
                dot.style.left = initialDotPosition + 'px';
                dot.style.backgroundColor = initialDotColor;
            } else if (dot) {
               
                
                positionDotToActive();
            }
        });
    }
});