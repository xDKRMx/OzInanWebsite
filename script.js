document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const filterToggle = document.getElementById('filterToggle');
    const filterPanel = document.getElementById('filterPanel');
    const applyFilterBtn = document.getElementById('applyFilter');
    const resetFilterBtn = document.getElementById('resetFilter');
    const projectCards = document.querySelectorAll('.project-card');
    const projectDetailsPanel = document.getElementById('projectDetailsPanel');
    const panelClose = document.querySelector('.panel-close');
    const contactSmileButton = document.getElementById('contactSmileButton');
    const contactPopup = document.getElementById('contactPopup');
    const popupClose = document.querySelector('.popup-close');
    const contactForm = document.getElementById('contactForm');
    const heroVideo = document.getElementById('hero-video');

    // Project details elements
    const projectTitle = document.getElementById('projectTitle');
    const projectMainImage = document.getElementById('projectMainImage');
    const detailProjectName = document.getElementById('detailProjectName');
    const detailLocation = document.getElementById('detailLocation');
    const detailTypes = document.getElementById('detailTypes');
    const detailUnitCount = document.getElementById('detailUnitCount');
    const detailBlockCount = document.getElementById('detailBlockCount');
    const detailFloorCount = document.getElementById('detailFloorCount');
    const detailDeliveryDate = document.getElementById('detailDeliveryDate');
    const projectDescription = document.getElementById('projectDescription');

    // Project data (normally this would come from a database)
    const projectsData = {
        'project1': {
            title: 'Sinpaş Boulevard Çankaya',
            mainImage: 'assets/Image1.png',
            name: 'Sinpaş Boulevard Çankaya',
            location: 'Çankaya / Ankara',
            types: '2+1 / 3+1',
            unitCount: '120 Konut',
            blockCount: '3',
            floorCount: '20',
            deliveryDate: 'Teslim Edildi',
            description: "Çankaya'nın merkezinde, modern mimarisi ve lüks yaşam alanları ile öne çıkan Sinpaş Boulevard, şehrin en prestijli projelerinden biridir. Sosyal olanakları, peyzaj alanları ve güvenlik sistemleri ile ayrıcalıklı bir yaşam sunmaktadır."
        },
        'project2': {
            title: 'Sinpaş Apartments Ümraniye',
            mainImage: 'assets/Image2.png',
            name: 'Sinpaş Apartments Ümraniye',
            location: 'Ağaçlı Bozkurt / Ümraniye / İstanbul',
            types: '2+1 / 3+1',
            unitCount: '48 Konut',
            blockCount: '3',
            floorCount: '2-4',
            deliveryDate: 'Ağustos 2026',
            description: 'Modern mimarisi, ferah ve kullanışlı daireleri ile şehrin merkezinde konforlu bir yaşam sunan Sinpaş Apartments, depreme dayanıklı yapısı ve kaliteli malzemeleri ile öne çıkıyor. Sosyal alanları, yeşil bahçeleri ve güvenlik sistemleri ile aileniz için ideal bir yaşam alanı sunuyor.'
        },
        'project3': {
            title: "Ankara'nın Merkezinde",
            mainImage: 'assets/Image3.png',
            name: "Ankara'nın Merkezinde",
            location: 'Merkez / Ankara',
            types: '1+1 / 2+1 / 3+1',
            unitCount: '200 Konut',
            blockCount: '5',
            floorCount: '15',
            deliveryDate: 'Teslim Edildi',
            description: "Ankara'nın kalbinde yer alan bu özel proje, şehrin tüm olanaklarına kolay erişim sağlarken, sakin ve huzurlu bir yaşam sunuyor. Geniş sosyal alanları, yüzme havuzu ve spor tesisleri ile yaşam kalitenizi artıracak bir proje."
        },
        'project4': {
            title: 'Tabiat Villaları',
            mainImage: 'assets/Image4.png',
            name: 'Tabiat Villaları',
            location: 'Etimesgut / Ankara',
            types: '4+1 / 5+1',
            unitCount: '30 Villa',
            blockCount: 'Villa Projesi',
            floorCount: '2-3',
            deliveryDate: 'Aralık 2025',
            description: 'Doğayla iç içe yaşamak isteyenler için tasarlanan Tabiat Villaları, şehrin gürültüsünden uzak, huzurlu bir yaşam sunuyor. Geniş bahçeleri, özel havuzları ve lüks iç tasarımları ile ayrıcalıklı bir yaşam alanı.'
        },
        'project5': {
            title: 'Premium Yaşam',
            mainImage: 'assets/Image5.png',
            name: 'Premium Yaşam',
            location: 'Yenimahalle / Ankara',
            types: '2+1 / 3+1 / 4+1',
            unitCount: '150 Konut',
            blockCount: '4',
            floorCount: '12',
            deliveryDate: 'Mart 2026',
            description: 'Premium Yaşam, adından da anlaşılacağı gibi, lüks ve konforun bir araya geldiği özel bir projedir. Akıllı ev sistemleri, özel güvenlik hizmetleri ve sosyal olanakları ile ayrıcalıklı bir yaşam sunmaktadır.'
        },
        'project6': {
            title: 'Doğal Yaşam',
            mainImage: 'assets/Image6.png',
            name: 'Doğal Yaşam',
            location: 'Keçiören / Ankara',
            types: '2+1 / 3+1',
            unitCount: '80 Konut',
            blockCount: '2',
            floorCount: '10',
            deliveryDate: 'Teslim Edildi',
            description: "Keçiören'in yükselen değeri Doğal Yaşam projesi, geniş peyzaj alanları, yürüyüş parkurları ve çocuk oyun alanları ile ailelerin tercih ettiği bir yaşam alanıdır. Depreme dayanıklı yapısı ve kaliteli malzemeleri ile güvenli bir yaşam sunmaktadır."
        }
    };

    // Handle video error (if video doesn't load)
    if (heroVideo) {
        // Log when video starts loading
        console.log('Attempting to load video: assets/OzinanFilm.mp4');
        
        // Log when video is loaded
        heroVideo.addEventListener('loadeddata', function() {
            console.log('Video loaded successfully!');
        });
        
        // Handle video loading error
        heroVideo.addEventListener('error', function(e) {
            console.error('Video failed to load:', e);
            const videoContainer = document.querySelector('.video-container');
            if (videoContainer) {
                videoContainer.innerHTML = '<div class="video-placeholder"></div>';
                videoContainer.style.backgroundColor = '#d6d0d0';
            }
        });
        
        // Fallback if video doesn't load after timeout
        setTimeout(function() {
            if (heroVideo.readyState === 0) {
                console.warn('Video loading timeout - forcing fallback');
                const event = new Event('error');
                heroVideo.dispatchEvent(event);
            }
        }, 5000);
        
        // Try to manually load the video
        try {
            heroVideo.load();
        } catch (err) {
            console.error('Error manually loading video:', err);
        }
    }

    // Filter toggle
    if (filterToggle) {
        filterToggle.addEventListener('click', function() {
            filterPanel.classList.toggle('active');
        });
    }

    // Apply filter
    if (applyFilterBtn) {
        applyFilterBtn.addEventListener('click', function() {
            const locationCheckboxes = document.querySelectorAll('.filter-group input[type="checkbox"][value^="kecioren"], .filter-group input[type="checkbox"][value^="cankaya"], .filter-group input[type="checkbox"][value^="etimesgut"], .filter-group input[type="checkbox"][value^="yenimahalle"]');
            const typeCheckboxes = document.querySelectorAll('.filter-group input[type="checkbox"][value^="konut"], .filter-group input[type="checkbox"][value^="ticari"], .filter-group input[type="checkbox"][value^="karma"]');
            const statusCheckboxes = document.querySelectorAll('.filter-group input[type="checkbox"][value^="tamamlandi"], .filter-group input[type="checkbox"][value^="insaatdevam"], .filter-group input[type="checkbox"][value^="planlama"]');
            
            const selectedLocations = Array.from(locationCheckboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value);
            
            const selectedTypes = Array.from(typeCheckboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value);
            
            const selectedStatuses = Array.from(statusCheckboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value);
            
            projectCards.forEach(card => {
                const cardLocation = card.dataset.location;
                const cardType = card.dataset.type;
                const cardStatus = card.dataset.status;
                
                const locationMatch = selectedLocations.length === 0 || selectedLocations.includes(cardLocation);
                const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(cardType);
                const statusMatch = selectedStatuses.length === 0 || selectedStatuses.includes(cardStatus);
                
                if (locationMatch && typeMatch && statusMatch) {
                    card.classList.remove('filtered-out');
                } else {
                    card.classList.add('filtered-out');
                }
            });
            
            filterPanel.classList.remove('active');
        });
    }

    // Reset filter
    if (resetFilterBtn) {
        resetFilterBtn.addEventListener('click', function() {
            const checkboxes = document.querySelectorAll('.filter-group input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            
            projectCards.forEach(card => {
                card.classList.remove('filtered-out');
            });
            
            filterPanel.classList.remove('active');
        });
    }

    // Project details
    projectCards.forEach(card => {
        const projectArrow = card.querySelector('.project-arrow');
        console.log(projectArrow);
        if (projectArrow) {
            projectArrow.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const projectId = getProjectIdFromCard(card);
                if (projectId && projectsData[projectId]) {
                    const data = projectsData[projectId];
                    
                    // Set project details
                    if (projectTitle) projectTitle.textContent = data.title;
                    if (projectMainImage) {
                        projectMainImage.src = data.mainImage;
                        projectMainImage.alt = data.title;
                    }
                    if (detailProjectName) detailProjectName.textContent = data.name;
                    if (detailLocation) detailLocation.textContent = data.location;
                    if (detailTypes) detailTypes.textContent = data.types;
                    if (detailUnitCount) detailUnitCount.textContent = data.unitCount;
                    if (detailBlockCount) detailBlockCount.textContent = data.blockCount;
                    if (detailFloorCount) detailFloorCount.textContent = data.floorCount;
                    if (detailDeliveryDate) detailDeliveryDate.textContent = data.deliveryDate;
                    if (projectDescription) projectDescription.textContent = data.description;
                    
                    // Show panel with slide animation
                    if (projectDetailsPanel) projectDetailsPanel.classList.add('active');
                }
            });
        }
    });

    // Helper function to get project ID from card
    function getProjectIdFromCard(card) {
        const img = card.querySelector('img');
        if (!img) return null;
        
        const imgSrc = img.src || '';
        // Check for both old and new image file names
        if (imgSrc.includes('project1') || imgSrc.includes('Image1')) return 'project1';
        if (imgSrc.includes('project2') || imgSrc.includes('Image2')) return 'project2';
        if (imgSrc.includes('project3') || imgSrc.includes('Image3')) return 'project3';
        if (imgSrc.includes('project4') || imgSrc.includes('Image4')) return 'project4';
        if (imgSrc.includes('project5') || imgSrc.includes('Image5')) return 'project5';
        if (imgSrc.includes('project6') || imgSrc.includes('Image6')) return 'project6';
        
        console.log('Project ID not found for image:', imgSrc);
        return null;
    }

    // Close project details panel
    if (panelClose) {
        panelClose.addEventListener('click', function() {
            projectDetailsPanel.classList.remove('active');
        });
    }

    // Contact smile button
    if (contactSmileButton) {
        contactSmileButton.addEventListener('click', function() {
            contactPopup.classList.add('active');
        });
    }

    // Close contact popup
    if (popupClose) {
        popupClose.addEventListener('click', function() {
            contactPopup.classList.remove('active');
        });
    }

    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Here you would normally send the data to a server
            // For now, we'll just show an alert
            alert(`Teşekkürler ${name}! Mesajınız gönderildi. En kısa sürede sizinle iletişime geçeceğiz.`);
            
            // Reset form
            contactForm.reset();
            
            // Close popup
            contactPopup.classList.remove('active');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });


});
