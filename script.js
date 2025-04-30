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
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');

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
    
    // Filter close button
    const filterClose = document.querySelector('.filter-close');
    if (filterClose && filterPanel) {
        filterClose.addEventListener('click', function() {
            filterPanel.classList.remove('active');
        });
    }
    
    // Close filter panel when clicking outside
    document.addEventListener('mouseup', function(e) {
        if (filterPanel && filterPanel.classList.contains('active')) {
            // If the click is outside the filter panel and not on the filter toggle button
            if (!filterPanel.contains(e.target) && !filterToggle.contains(e.target)) {
                filterPanel.classList.remove('active');
            }
        }
    });

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
    
    // Close project details panel when clicking outside
    document.addEventListener('mouseup', function(e) {
        if (projectDetailsPanel && projectDetailsPanel.classList.contains('active')) {
            const panelContent = projectDetailsPanel.querySelector('.project-details-content');
            if (panelContent && !panelContent.contains(e.target) && !e.target.closest('.project-card')) {
                projectDetailsPanel.classList.remove('active');
            }
        }
    });

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
            e.preventDefault(); // Prevent the default form submission
            
            // Get form data for success message
            const name = document.getElementById('name').value;
            
            // Show loading state
            const submitBtn = this.querySelector('.submit-btn');
            if (submitBtn) {
                submitBtn.innerHTML = 'Gönderiliyor...';
                submitBtn.disabled = true;
            }
            
            // Use fetch to submit the form via AJAX
            fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                // Show success message
                alert(`Teşekkürler ${name}! Mesajınız gönderildi. En kısa sürede sizinle iletişime geçeceğiz.`);
                
                // Reset form
                contactForm.reset();
                
                // Close popup
                contactPopup.classList.remove('active');
            })
            .catch(error => {
                console.error('Form submission error:', error);
                alert('Mesaj gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
            })
            .finally(() => {
                // Reset button state
                if (submitBtn) {
                    submitBtn.innerHTML = 'Gönder';
                    submitBtn.disabled = false;
                }
            });
        });
    }

    // Mobile Menu Toggle
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close mobile menu when clicking on a link
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (mainNav.classList.contains('active') && 
                !mainNav.contains(e.target) && 
                !mobileMenuToggle.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
    
    // Smooth scrolling for navigation links and handle contact popup
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Check if this is a contact link
            if (targetId === '#contact') {
                // Open the contact popup instead of scrolling
                if (contactPopup) {
                    contactPopup.classList.add('active');
                }
            } else {
                // Normal smooth scrolling for other links
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Adjust for header height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Close popup when clicking outside of it
    document.addEventListener('mouseup', function(e) {
        // Check if contact popup is active
        if (contactPopup && contactPopup.classList.contains('active')) {
            // Get the popup content
            const popupContent = contactPopup.querySelector('.popup-content');
            
            // If the click is outside the popup content, close the popup
            if (popupContent && !popupContent.contains(e.target) && !contactSmileButton.contains(e.target)) {
                contactPopup.classList.remove('active');
            }
        }
    });

    // Dil değiştirme işlemleri
    console.log('DOM loaded, initializing language system...');

    // Temel değişkenler
    let currentLang = localStorage.getItem('preferredLanguage') || 'tr';
    const translations = {
        tr: {
            navigation: {
                home: "Ana Sayfa",
                projects: "Projelerimiz",
                about: "Hakkımızda",
                contact: "İletişim"
            },
            hero: {
                title: "ANKARA'NIN MERKEZİNDE BAMBAŞKA BİR HAYAT",
                subtitle: "1995'ten bu yana kaliteli ve güvenilir yapılar",
                motto: "ÖZ İNAN İNŞAAT MOTTOSU",
                description: "Keçiören'e ve Ankara'ya daha fazla değer katmak için, depreme dayanıklı kentsel dönüşümle insanlara ferah, güvenilir, kullanışlı ve modern yapılar inşa ediyoruz."
            }
        },
        en: {
            navigation: {
                home: "Home",
                projects: "Projects",
                about: "About",
                contact: "Contact"
            },
            hero: {
                title: "A DIFFERENT LIFE IN THE CENTER OF ANKARA",
                subtitle: "Quality and reliable buildings since 1995",
                motto: "ÖZ İNAN CONSTRUCTION MOTTO",
                description: "We build spacious, reliable, functional and modern buildings with earthquake-resistant urban transformation to add more value to Keçiören and Ankara."
            }
        },
        ru: {
            navigation: {
                home: "Главная",
                projects: "Проекты",
                about: "О нас",
                contact: "Контакты"
            },
            hero: {
                title: "ДРУГАЯ ЖИЗНЬ В ЦЕНТРЕ АНКАРЫ",
                subtitle: "Качественные и надежные здания с 1995 года",
                motto: "ДЕВИЗ ÖZ İNAN CONSTRUCTION",
                description: "Мы строим просторные, надежные, функциональные и современные здания с сейсмостойкой городской трансформацией, чтобы добавить больше ценности Кечиорену и Анкаре."
            }
        }
    };

    // Dil butonlarını seç
    const langButtons = document.querySelectorAll('.lang-btn');
    console.log('Found language buttons:', langButtons.length);

    // Metinleri güncelle
    function updateContent(lang) {
        console.log('Updating content to:', lang);
        const elements = document.querySelectorAll('[data-i18n]');
        console.log('Found elements to translate:', elements.length);

        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const keys = key.split('.');
            let value = translations[lang];

            try {
                for (const k of keys) {
                    value = value[k];
                }

                if (value) {
                    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                        element.placeholder = value;
                    } else {
                        element.textContent = value;
                    }
                    console.log('Updated:', key, 'to:', value);
                }
            } catch (error) {
                console.error('Error updating:', key, error);
            }
        });
    }

    // Başlangıç dilini ayarla
    updateContent(currentLang);
    document.querySelector(`.lang-btn[data-lang="${currentLang}"]`)?.classList.add('active');

    // Her butona tıklama olayı ekle
    langButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const newLang = this.getAttribute('data-lang');
            console.log('Language button clicked:', newLang);

            if (newLang !== currentLang) {
                // Aktif sınıfını güncelle
                langButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Dili güncelle
                currentLang = newLang;
                localStorage.setItem('preferredLanguage', newLang);

                // Animasyon efekti
                document.body.style.opacity = '0.5';
                setTimeout(() => {
                    updateContent(newLang);
                    document.body.style.opacity = '1';
                }, 200);
            }
        });
        console.log('Added click listener to:', button.getAttribute('data-lang'));
    });
});
