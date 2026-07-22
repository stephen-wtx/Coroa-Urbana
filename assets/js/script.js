

        // 2. Menu Hambúrguer Interativo (Mobile)
        const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');
        const toggleIcon = menuToggle.querySelector('i');

        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            header.classList.toggle('menu-open');

            if (navMenu.classList.contains('active')) {
                toggleIcon.className = 'fa-solid fa-xmark';
            } else {
                toggleIcon.className = 'fa-solid fa-bars';
            }
        });

        // Fecha o menu ao clicar em qualquer item
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                navMenu.classList.remove('active');
                header.classList.remove('menu-open');
                toggleIcon.className = 'fa-solid fa-bars';
            });
        });

        // 3. Dispara as animações de entrada com Intersection Observer
        document.addEventListener("DOMContentLoaded", () => {
            const sections = document.querySelectorAll('.section-clothing, .section-accessories, .section-products');

            if ('IntersectionObserver' in window) {
                const sectionObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('active');
                            sectionObserver.unobserve(entry.target);
                        }
                    });
                }, {
                    threshold: 0.15
                });

                sections.forEach(section => {
                    sectionObserver.observe(section);
                });
            } else {
                sections.forEach(section => {
                    section.classList.add('active');
                });
            }
        });

        // 4. Funcionalidade "Ver Toda a Coleção" / "Ver Menos" para cada seção
        document.addEventListener("DOMContentLoaded", () => {
            const toggleButtons = document.querySelectorAll(".toggle-btn");

            toggleButtons.forEach(button => {
                button.addEventListener("click", () => {
                    const targetSectionId = button.getAttribute("data-target");
                    const targetSection = document.getElementById(targetSectionId);

                    if (targetSection) {
                        const extraProducts = targetSection.querySelectorAll(".extra-product");
                        const isExpanding = button.innerText === "VER TODA A COLEÇÃO";

                        if (isExpanding) {
                            extraProducts.forEach(product => {
                                product.classList.add("show");
                            });
                            button.innerText = "Ver Menos";
                        } else {
                            extraProducts.forEach(product => {
                                product.classList.remove("show");
                            });
                            button.innerText = "Ver Toda a Coleção";

                            targetSection.scrollIntoView({
                                behavior: "smooth"
                            });
                        }
                    }
                });
            });
        });

    // 5. MARCAÇÃO DO LINK ATIVO NO HEADER
            document.addEventListener("DOMContentLoaded", () => {
                const navItems = document.querySelectorAll('.nav-item');
                
                // Pega o nome do arquivo atual (ex: "explore.html")
                const currentPage = window.location.pathname.split("/").pop() || "explore.html";

                function updateActiveLink() {
                    let currentSection = '';
                    const scrollPosition = window.scrollY + 150;

                    // Verifica primeiro se estamos scrollando sobre uma seção de âncora interna (ex: #produtos)
                    const produtosSection = document.getElementById('produtos');
                    if (produtosSection) {
                        const offsetTop = produtosSection.offsetTop;
                        const offsetBottom = offsetTop + produtosSection.offsetHeight;
                        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                            currentSection = 'produtos';
                        }
                    }

                    navItems.forEach(item => {
                        const href = item.getAttribute('href');
                        const sectionId = item.getAttribute('data-section');

                        // Se estivermos na seção do scroll (#produtos), marca ela
                        if (currentSection && sectionId === currentSection) {
                            item.classList.add('active');
                        } 
                        // Caso contrário, marca com base no arquivo HTML da página atual
                        else if (!currentSection && href === currentPage) {
                            item.classList.add('active');
                        } 
                        // Remove dos outros
                        else {
                            item.classList.remove('active');
                        }
                    });
                }

                // Executa as verificações
                updateActiveLink();
                window.addEventListener('scroll', updateActiveLink);
            });


        //Script para gerenciar a compra via WhatsApp
        document.addEventListener("DOMContentLoaded", function () {
            // Número de WhatsApp da loja (com o código internacional de Moçambique 258)
            const WHATSAPP_NUMBER = "258850244716"; 

            // Seleciona todos os botões de comprar
            const buyButtons = document.querySelectorAll(".btn-buy");

            buyButtons.forEach(button => {
                button.addEventListener("click", function (event) {
                    event.preventDefault();

                    // Encontra o card do produto mais próximo do botão clicado
                    const productCard = this.closest(".product-card");

                    if (productCard) {
                        // Captura as informações do produto dinamicamente
                        const productName = productCard.querySelector(".product-name").innerText;
                        const productPrice = productCard.querySelector(".product-price").innerText;
                        const productImageSrc = productCard.querySelector(".product-image").src;

                        // Cria a mensagem personalizada formatada para o WhatsApp
                        const message = `Olá, gostaria de comprar este item:\n\n` +
                                        `*Produto:* ${productName}\n` +
                                        `*Preço:* ${productPrice}\n`;
                        // Codifica a mensagem para o formato de URL
                        const encodedMessage = encodeURIComponent(message);

                        // Cria o link final do WhatsApp
                        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

                        // Abre o WhatsApp em uma nova aba
                        window.open(whatsappUrl, "_blank");
                    }
                });
            });
        });