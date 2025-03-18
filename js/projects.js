document.addEventListener('DOMContentLoaded', () => {
    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const projectSearch = document.getElementById('projectSearch');
    const projectsGrid = document.querySelector('.projects-grid');
    const paginationContainer = document.querySelector('.pagination');
    
    // Constants
    const projectsPerPage = 6; // Number of projects per page
    
    // Initialize projects
    function initializeProjects() {
        // Mark all projects as visible initially
        projectCards.forEach(card => {
            card.setAttribute('data-visible', 'true');
            // Initially hide projects beyond the first page
            card.style.display = 'none';
        });
        
        // Show only first page projects
        const firstPageProjects = Array.from(projectCards).slice(0, projectsPerPage);
        firstPageProjects.forEach(project => {
            project.style.display = 'flex';
            project.style.opacity = '1';
            project.style.transform = 'translateY(0)';
        });
    }
    
    // Filter by category
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            filterProjects(filterValue, projectSearch.value);
        });
    });
    
    // Search functionality
    projectSearch.addEventListener('input', () => {
        const activeFilter = document.querySelector('.filter-btn.active');
        const filterValue = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
        
        filterProjects(filterValue, projectSearch.value);
    });
    
    // Filter projects function
    function filterProjects(category, searchTerm = '') {
        let visibleCount = 0;
        
        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardTitle = card.querySelector('h3').textContent.toLowerCase();
            const cardDesc = card.querySelector('p').textContent.toLowerCase();
            const cardTags = Array.from(card.querySelectorAll('.project-tags span')).map(tag => tag.textContent.toLowerCase());
            
            const matchesCategory = category === 'all' || cardCategory === category;
            const matchesSearch = searchTerm === '' || 
                                 cardTitle.includes(searchTerm.toLowerCase()) || 
                                 cardDesc.includes(searchTerm.toLowerCase()) ||
                                 cardTags.some(tag => tag.includes(searchTerm.toLowerCase()));
            
            // Set a data attribute to track if the card matches the current filter
            if (matchesCategory && matchesSearch) {
                card.setAttribute('data-visible', 'true');
                visibleCount++;
            } else {
                card.setAttribute('data-visible', 'false');
                card.style.display = 'none';
            }
        });
        
        console.log(`Visible projects after filtering: ${visibleCount}`);
        
        // After filtering, update pagination and show first page
        updatePagination();
        showPage(1);
    }
    
    // Update pagination buttons based on number of visible projects
    function updatePagination() {
        const visibleProjects = Array.from(projectCards).filter(card => 
            card.getAttribute('data-visible') === 'true');
        
        const totalPages = Math.ceil(visibleProjects.length / projectsPerPage);
        console.log(`Total pages needed: ${totalPages}`);
        
        // Clear existing pagination buttons
        paginationContainer.innerHTML = '';
        
        // Create page buttons
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = 'page-btn' + (i === 1 ? ' active' : '');
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', () => showPage(i));
            paginationContainer.appendChild(pageBtn);
        }
        
        // Add next button if there are multiple pages
        if (totalPages > 1) {
            const nextBtn = document.createElement('button');
            nextBtn.className = 'page-btn next';
            nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
            nextBtn.addEventListener('click', () => {
                const activePage = parseInt(document.querySelector('.page-btn.active').textContent);
                if (activePage < totalPages) {
                    showPage(activePage + 1);
                }
            });
            paginationContainer.appendChild(nextBtn);
        }
        
        // Show/hide pagination container based on number of pages
        if (totalPages <= 1) {
            paginationContainer.style.display = 'none';
        } else {
            paginationContainer.style.display = 'flex';
        }
    }
    
    // Show specific page
    function showPage(pageNumber) {
        console.log(`Showing page ${pageNumber}`);
        const visibleProjects = Array.from(projectCards).filter(card => 
            card.getAttribute('data-visible') === 'true');
        
        // Calculate start and end indices
        const startIndex = (pageNumber - 1) * projectsPerPage;
        const endIndex = startIndex + projectsPerPage;
        
        // Hide all visible projects first
        visibleProjects.forEach(project => {
            project.style.display = 'none';
        });
        
        // Show only projects for current page
        visibleProjects.slice(startIndex, endIndex).forEach(project => {
            project.style.display = 'flex';
            project.style.opacity = '1';
            project.style.transform = 'translateY(0)';
        });
        
        // Update active page button
        const pageButtons = document.querySelectorAll('.page-btn:not(.next)');
        pageButtons.forEach(btn => {
            btn.classList.remove('active');
            if (parseInt(btn.textContent) === pageNumber) {
                btn.classList.add('active');
            }
        });
    }
    
    // Initialize projects and pagination on page load
    initializeProjects();
    updatePagination();
    
    // Add "View All Projects" link to the main page
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        const projectsSection = document.querySelector('#projects .section-header');
        if (projectsSection) {
            const viewAllLink = document.createElement('a');
            viewAllLink.href = 'projects.html';
            viewAllLink.className = 'view-all-link';
            viewAllLink.innerHTML = 'View All Projects <i class="fas fa-arrow-right"></i>';
            projectsSection.appendChild(viewAllLink);
        }
    }
    
    // Back to top functionality
    const backToTopBtn = document.querySelector('.back-to-top a');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}); 