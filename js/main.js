// IT Audit Hub - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Dashboard functionality
    initializeDashboard();
    
    // Audit checklist functionality
    initializeChecklistFeatures();
    
    // Search functionality
    initializeSearch();
});

function initializeDashboard() {
    // Add any dashboard-specific initialization here
    console.log('Dashboard initialized');
}

function initializeChecklistFeatures() {
    // Add checklist-specific functionality
    const checklistItems = document.querySelectorAll('.checklist-item');
    checklistItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
}

function initializeSearch() {
    // Add search functionality across the site
    const searchInput = document.getElementById('global-search');
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }
}

function performSearch(query) {
    // Simple search implementation - in a real app this would connect to the API
    console.log('Searching for:', query);
    // This would typically send an AJAX request to the backend
}

// Utility functions
function showAlert(message, type = 'info') {
    // Create and show an alert message
    const alertHtml = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    
    // Insert alert at the top of the main content area
    const mainContent = document.querySelector('main');
    mainContent.insertAdjacentHTML('afterbegin', alertHtml);
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('ko-KR', options);
}

// Audit status management
function updateAuditStatus(auditId, newStatus) {
    // In a real application, this would send an AJAX request to update the status
    console.log(`Updating audit ${auditId} to status: ${newStatus}`);
    
    // Update UI immediately
    const statusElement = document.querySelector(`#audit-${auditId} .status-badge`);
    if (statusElement) {
        statusElement.textContent = getKoreanStatus(newStatus);
        statusElement.className = `status-badge status-${getStatusClass(newStatus)}`;
    }
}

function getStatusClass(status) {
    switch(status) {
        case 'completed': return 'completed';
        case 'progress': return 'progress';
        case 'upcoming': return 'upcoming';
        default: return 'upcoming';
    }
}

function getKoreanStatus(status) {
    switch(status) {
        case 'completed': return '완료';
        case 'progress': return '진행중';
        case 'upcoming': return '준비';
        default: return status;
    }
}

// Export functions for use in other modules
window.ITAuditHub = {
    showAlert: showAlert,
    formatDate: formatDate,
    updateAuditStatus: updateAuditStatus
};