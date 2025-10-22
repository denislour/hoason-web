// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Rotating background GIFs for hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection && !document.body.classList.contains('mua-ban-page')) {
        // const gifFiles = ['0.gif', '1.gif', '2.gif', '3.gif'];

        const gifFiles = [
            'https://cdn.discordapp.com/attachments/1032368922181238885/1430579139009843220/0.gif?ex=68fa4a25&is=68f8f8a5&hm=f02805ed84262778c3a0c55ee5d066ec35a9efab32d7bb86ab419da3cf404bf3&',
            'https://cdn.discordapp.com/attachments/1032368922181238885/1430579139341189252/1.gif?ex=68fa4a25&is=68f8f8a5&hm=f4bc2aa32dfc57fae4bf5e751f4f05380c0899085170553f5bc8df49bcb2b3cf&',
            'https://cdn.discordapp.com/attachments/1032368922181238885/1430579139760623807/2.gif?ex=68fa4a25&is=68f8f8a5&hm=128f84d688a0fb3d52ea4213b5f764fd8c94c46134ebec10f34e5aae810cb4ac&',
            'https://cdn.discordapp.com/attachments/1032368922181238885/1430579140209152040/3.gif?ex=68fa4a25&is=68f8f8a5&hm=61d47ae52a098d47815dc29fbd77709126f844b2faede239b0657e5a3bc5913f&'
        ];
        let currentGifIndex = 0;
        let preloadedImages = [];
        let loadedCount = 0;

        // Preload all GIFs
        function preloadGifs() {
            gifFiles.forEach((gifFile, index) => {
                const img = new Image();
                img.onload = function () {
                    loadedCount++;

                    // All images loaded
                    if (loadedCount === gifFiles.length) {
                        setTimeout(() => {
                            // Start rotation
                            setInterval(rotateBackground, 1500);
                        }, 300);
                    }
                };
                img.onerror = function () {
                    console.error(`Failed to load: ${gifFile}`);
                    loadedCount++;
                    if (loadedCount === gifFiles.length) {
                        setInterval(rotateBackground, 1500);
                    }
                };
                img.src = gifFile;
                preloadedImages.push(img);
            });
        }

        function rotateBackground() {
            currentGifIndex = (currentGifIndex + 1) % gifFiles.length;
            const gifPath = gifFiles[currentGifIndex];
            heroSection.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('${gifPath}')`;
        }

        // Start preloading
        preloadGifs();
    }

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    menuToggle.addEventListener('click', function () {
        mainNav.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-times');
    });

    // Smooth scrolling for all anchor links with hash
    const allLinks = document.querySelectorAll('a[href^="#"]');

    allLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Get target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Calculate header height
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20; // Add 20px extra spacing

                // Smooth scroll to section
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update active class for navigation links
                if (this.classList.contains('nav-link')) {
                    // Remove active class from all nav links
                    document.querySelectorAll('.nav-link').forEach(navLink => navLink.classList.remove('active'));
                    // Add active class to clicked link
                    this.classList.add('active');

                    // Close mobile menu if open
                    if (mainNav.classList.contains('active')) {
                        mainNav.classList.remove('active');
                        menuToggle.querySelector('i').classList.remove('fa-times');
                    }
                }
            }
        });
    });

    // Tab functionality for mua-ban section
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove active class from all buttons and panes
            tabBtns.forEach(tabBtn => tabBtn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Show corresponding tab pane
            const tabId = this.getAttribute('data-tab');
            const activePane = document.getElementById(tabId);
            if (activePane) {
                activePane.classList.add('active');
            }
        });
    });

    // Buy button functionality
    const buyButtons = document.querySelectorAll('.btn-buy');

    buyButtons.forEach(button => {
        button.addEventListener('click', function () {
            const itemCard = this.closest('.item-card');
            const itemName = itemCard.querySelector('h4').textContent;
            const itemPrice = itemCard.querySelector('.price').textContent;
            const currency = itemCard.querySelector('.currency').textContent;
            const sellerName = itemCard.querySelector('.seller-name').textContent;

            // Create confirmation modal
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <h3>Xác Nhận Mua Hàng</h3>
                    <div class="purchase-info">
                        <p><strong>Sản phẩm:</strong> ${itemName}</p>
                        <p><strong>Giá:</strong> ${itemPrice} ${currency}</p>
                        <p><strong>Người bán:</strong> ${sellerName}</p>
                    </div>
                    <div class="modal-buttons">
                        <button class="btn btn-primary confirm-buy">Xác Nhận</button>
                        <button class="btn btn-secondary cancel-buy">Hủy</button>
                    </div>
                </div>
            `;

            // Add modal styles if not already added
            if (!document.querySelector('#modal-styles')) {
                const modalStyles = document.createElement('style');
                modalStyles.id = 'modal-styles';
                modalStyles.textContent = `
                    .modal {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.5);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        z-index: 2000;
                    }

                    .modal-content {
                        background-color: #fff;
                        padding: 30px;
                        border-radius: 10px;
                        max-width: 500px;
                        width: 90%;
                        position: relative;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                    }

                    .close-modal {
                        position: absolute;
                        top: 15px;
                        right: 15px;
                        font-size: 1.5rem;
                        cursor: pointer;
                        color: #888;
                    }

                    .close-modal:hover {
                        color: #333;
                    }

                    .purchase-info {
                        margin: 20px 0;
                    }

                    .purchase-info p {
                        margin-bottom: 10px;
                    }

                    .modal-buttons {
                        display: flex;
                        justify-content: flex-end;
                        gap: 15px;
                        margin-top: 20px;
                    }
                `;
                document.head.appendChild(modalStyles);
            }

            // Add modal to page
            document.body.appendChild(modal);

            // Close modal functionality
            const closeModal = document.querySelector('.close-modal');
            const cancelBtn = document.querySelector('.cancel-buy');

            function removeModal() {
                document.body.removeChild(modal);
            }

            closeModal.addEventListener('click', removeModal);
            cancelBtn.addEventListener('click', removeModal);

            // Confirm purchase
            const confirmBtn = document.querySelector('.confirm-buy');
            confirmBtn.addEventListener('click', function () {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = `Đã mua thành công: ${itemName}`;

                // Add success message styles if not already added
                if (!document.querySelector('#success-message-styles')) {
                    const successStyles = document.createElement('style');
                    successStyles.id = 'success-message-styles';
                    successStyles.textContent = `
                        .success-message {
                            position: fixed;
                            top: 100px;
                            right: 20px;
                            background-color: #4CAF50;
                            color: white;
                            padding: 15px 25px;
                            border-radius: 5px;
                            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                            z-index: 2001;
                            animation: slideIn 0.3s ease, slideOut 0.3s ease 2.7s;
                        }

                        @keyframes slideIn {
                            from {
                                transform: translateX(100%);
                                opacity: 0;
                            }
                            to {
                                transform: translateX(0);
                                opacity: 1;
                            }
                        }

                        @keyframes slideOut {
                            from {
                                transform: translateX(0);
                                opacity: 1;
                            }
                            to {
                                transform: translateX(100%);
                                opacity: 0;
                            }
                        }
                    `;
                    document.head.appendChild(successStyles);
                }

                document.body.appendChild(successMessage);

                // Remove success message after animation
                setTimeout(() => {
                    document.body.removeChild(successMessage);
                }, 3000);

                removeModal();
            });
        });
    });

    // Contact form submission
    const contactForm = document.querySelector('.contact-form form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelector('input[placeholder="Chủ đề"]').value;
            const message = this.querySelector('textarea').value;

            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Tin nhắn của bạn đã được gửi thành công!';

            // Add success message styles if not already added
            if (!document.querySelector('#success-message-styles')) {
                const successStyles = document.createElement('style');
                successStyles.id = 'success-message-styles';
                successStyles.textContent = `
                    .success-message {
                        position: fixed;
                        top: 100px;
                        right: 20px;
                        background-color: #4CAF50;
                        color: white;
                        padding: 15px 25px;
                        border-radius: 5px;
                        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                        z-index: 2001;
                        animation: slideIn 0.3s ease, slideOut 0.3s ease 2.7s;
                    }

                    @keyframes slideIn {
                        from {
                            transform: translateX(100%);
                            opacity: 0;
                        }
                        to {
                            transform: translateX(0);
                            opacity: 1;
                        }
                    }

                    @keyframes slideOut {
                        from {
                            transform: translateX(0);
                            opacity: 1;
                        }
                        to {
                            transform: translateX(100%);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(successStyles);
            }

            document.body.appendChild(successMessage);

            // Remove success message after animation
            setTimeout(() => {
                document.body.removeChild(successMessage);
            }, 3000);

            // Reset form
            this.reset();
        });
    }

    // Scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollToTopBtn);

    // Add scroll to top styles
    const scrollToTopStyles = document.createElement('style');
    scrollToTopStyles.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background-color: #8B4513;
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.2rem;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
        }

        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
        }

        .scroll-to-top:hover {
            background-color: #A0522D;
            transform: translateY(-5px);
        }
    `;
    document.head.appendChild(scrollToTopStyles);

    // Show/hide scroll to top button based on scroll position
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 100) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // Add active class to navigation based on scroll position
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', function () {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = document.querySelector('.header').offsetHeight;

            if (window.pageYOffset >= (sectionTop - headerHeight - 100)) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Add mobile menu styles
    const mobileMenuStyles = document.createElement('style');
    mobileMenuStyles.textContent = `
        @media (max-width: 768px) {
            .main-nav {
                position: fixed;
                top: 70px;
                left: 0;
                width: 100%;
                background-color: #000000;
                box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);
                padding: 20px;
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 999;
                border-bottom: 1px solid #FFD700;
            }

            .main-nav.active {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }

            .main-nav ul {
                flex-direction: column;
            }

            .main-nav ul li {
                margin: 15px 0;
            }

            .main-nav ul li a {
                font-size: 1.2rem;
                text-align: center;
                display: block;
                padding: 10px;
                border-radius: 5px;
                transition: all 0.3s ease;
            }

            .main-nav ul li a:hover {
                background-color: rgba(255, 215, 0, 0.1);
            }
        }
    `;
    document.head.appendChild(mobileMenuStyles);

});
