// Cuando la página termine de cargar completamente, ejecuta todo este código
document.addEventListener('DOMContentLoaded', () => {
    // Aquí definimos los colores que vamos a usar en toda la aplicación (como una paleta de pintor)
    const COLORS = { 
        YELLOW: '#FFD050',          // Amarillo de Seguros Bolívar
        GREEN: '#086e45',           // Verde principal
        GREEN_DARK: '#086e45',      // Verde oscuro para efectos
        TEXT_DARK: '#333333',       // Color para textos principales
        TEXT_LIGHT: '#666666',      // Color para textos secundarios
        GRAY_LIGHT: '#F5F5F5',      // Gris claro para fondos
        GRAY_BORDER: '#E0E0E0',     // Gris para bordes
        WHITE: '#FFFFFF',           // Blanco puro
        MODAL_OVERLAY: 'rgba(0, 0, 0, 0.6)' // Fondo oscuro semi-transparente para ventanas
    };
    
    // Aquí "agarramos" todos los elementos importantes de la página para poder usarlos
    const loginScreen = document.getElementById('login-screen'),           // Pantalla de login
          dashboardScreen = document.getElementById('dashboard-screen'),   // Pantalla principal
          loginForm = document.getElementById('login-form'),               // Formulario de login
          logoutButton = document.getElementById('logout-button'),         // Botón de cerrar sesión
          canvas = document.getElementById('dashboard-canvas'),            // El lienzo donde dibujamos
          ctx = canvas.getContext('2d');                                  // La "brocha" para dibujar

    // Elementos del chat con el asesor virtual
    const chatInterface = document.getElementById('chat-interface'),       // Ventana del chat
          chatInput = document.getElementById('chat-input'),               // Donde escribe el usuario
          chatSubmit = document.getElementById('chat-submit');             // Botón para enviar mensajes

    // --- AQUÍ ESTÁN TODOS LOS SEGUROS Y PLANES DISPONIBLES ---
    // Esta es como una "base de datos" con toda la información de los seguros
    // Imagen personalizada para la categoría "Transporte" (imagen local)
    const transportCategoryImage = new Image();
    transportCategoryImage.src = './imagenes/Transporte.png'; // Imagen local del proyecto
    
    // Configurar eventos de carga para la imagen local
    transportCategoryImage.onload = () => {
        console.log('✅ Imagen local de transporte cargada exitosamente');
        console.log('Dimensiones:', transportCategoryImage.width, 'x', transportCategoryImage.height);
        if (appState.view === 'dashboard') {
            draw();
        }
    };
    
    transportCategoryImage.onerror = () => {
        console.log('❌ Error cargando imagen local de transporte: ./imagenes/Transporte.png');
    };

    // Imagen personalizada para la categoría "Tecnología" (imagen local)
    const technologyCategoryImage = new Image();
    technologyCategoryImage.src = './imagenes/Tecnologia.png'; // Imagen local del proyecto
    
    // Configurar eventos de carga para la imagen local de tecnología
    technologyCategoryImage.onload = () => {
        console.log('✅ Imagen local de tecnología cargada exitosamente');
        console.log('Dimensiones:', technologyCategoryImage.width, 'x', technologyCategoryImage.height);
        if (appState.view === 'dashboard') {
            draw();
        }
    };
    
    technologyCategoryImage.onerror = () => {
        console.log('❌ Error cargando imagen local de tecnología: ./imagenes/Tecnologia.png');
    };

    // Imagen personalizada para el banner de Bolívar Rush
    const bolivarRushBanner = new Image();
    bolivarRushBanner.src = './imagenes/Bolivar rush.png'; // Imagen del banner
    
    // Configurar eventos de carga para la imagen del banner
    bolivarRushBanner.onload = () => {
        console.log('✅ Imagen del banner de Bolívar Rush cargada exitosamente');
        console.log('Dimensiones:', bolivarRushBanner.width, 'x', bolivarRushBanner.height);
        if (appState.view === 'welcome') {
            draw();
        }
    };
    
    bolivarRushBanner.onerror = () => {
        console.log('❌ Error cargando imagen del banner: ./imagenes/Bolivar rush.png');
    };

    const data = {
        categories: [
            { 
                id: 'transporte',   // Identificador único
                title: 'Transporte',  // Nombre que ve el usuario
                icon: null,        // No usamos icono, usamos imagen
                image: transportCategoryImage, // Imagen personalizada
                description: 'Movilidad urbana inteligente y sostenible. Protege tu libertad de movimiento con seguros diseñados para el estilo de vida moderno y dinámico de la ciudad.', 
                options: {
                    patineta: {
                        title: 'Patineta Eléctrica',
                        description: 'Para que el único rollo sea el tráfico. Muévete tranquilo, nosotros te cubrimos.',
                        plans: [
                            { 
                                id: 'patineta_esencial', 
                                name: 'Plan Esencial', 
                                price: 32900, 
                                coverage: 'Hurto calificado. Daños a terceros hasta $10M', 
                                active: false, 
                                benefits: [
                                    'Descuento del 30% en la compra de un candado de alta seguridad con nuestros aliados.',
                                    'Asistencia básica en caso de accidente.',
                                    'Gestión 100% digital desde la app.'
                                ]
                            }, 
                            { 
                                id: 'patineta_plus', 
                                name: 'Plan Plus', 
                                price: 48900, 
                                coverage: 'Hurto calificado. Daño total accidental. Daños a terceros hasta $20M', 
                                active: false, 
                                benefits: [
                                    'Un mantenimiento preventivo gratuito al año.',
                                    'Servicio de grúa especializada para patinetas.',
                                    'Asistencia técnica 24/7.'
                                ]
                            }, 
                            { 
                                id: 'patineta_premium', 
                                name: 'Plan Premium', 
                                price: 65900, 
                                coverage: 'Hurto (calificado y simple). Daño total y parcial. Daños a terceros hasta $40M', 
                                active: false, 
                                benefits: [
                                    'Curso de conducción segura en ciudad y acceso a eventos y rodadas de la comunidad Rush.',
                                    'Patineta de reemplazo mientras se repara la tuya.',
                                    'Cobertura internacional en ciudades seleccionadas.'
                                ]
                            }
                        ]
                    },
                    bicicleta: {
                        title: 'Bicicleta',
                        description: 'Tu bici, tu libertad. La respaldamos para que solo pienses en el camino.',
                        plans: [
                            { 
                                id: 'bicicleta_esencial', 
                                name: 'Plan Esencial', 
                                price: 28900, 
                                coverage: 'Hurto calificado y daños a terceros hasta $8M', 
                                active: false, 
                                benefits: [
                                    'Kit básico de herramientas para emergencias.',
                                    'Descuentos en tiendas especializadas.',
                                    'Asistencia telefónica 24/7.'
                                ]
                            }, 
                            { 
                                id: 'bicicleta_plus', 
                                name: 'Plan Plus', 
                                price: 42900, 
                                coverage: 'Hurto calificado, daño total y parcial. Daños a terceros hasta $15M', 
                                active: false, 
                                benefits: [
                                    'Servicio de mecánico a domicilio una vez al mes.',
                                    'Seguro de accesorios (casco, luces, etc.).',
                                    'Acceso a ciclovías premium y estacionamientos seguros.'
                                ]
                            }, 
                            { 
                                id: 'bicicleta_premium', 
                                name: 'Plan Premium', 
                                price: 58900, 
                                coverage: 'Cobertura completa: hurto, daños, accidentes. Daños a terceros hasta $25M', 
                                active: false, 
                                benefits: [
                                    'Bicicleta de cortesía mientras se repara la tuya.',
                                    'Programa de fitness y rutas guiadas.',
                                    'Descuentos en eventos deportivos y competencias.'
                                ]
                            }
                        ]
                    },
                    motos: {
                        title: 'Motos Eléctricas',
                        description: 'El futuro es eléctrico. Acelera con la confianza de estar 100% cubierto.',
                        plans: [
                            { 
                                id: 'moto_esencial', 
                                name: 'Plan Esencial', 
                                price: 45900, 
                                coverage: 'Hurto calificado y daños a terceros hasta $15M', 
                                active: false, 
                                benefits: [
                                    'Asistencia en carretera básica.',
                                    'Descuentos en cargadores y accesorios eléctricos.',
                                    'Revisión técnica gratuita semestral.'
                                ]
                            }, 
                            { 
                                id: 'moto_plus', 
                                name: 'Plan Plus', 
                                price: 68900, 
                                coverage: 'Hurto calificado, daño total y parcial. Daños a terceros hasta $30M', 
                                active: false, 
                                benefits: [
                                    'Grúa especializada para motos eléctricas.',
                                    'Red de talleres certificados para vehículos eléctricos.',
                                    'Asistencia técnica especializada 24/7.'
                                ]
                            }, 
                            { 
                                id: 'moto_premium', 
                                name: 'Plan Premium', 
                                price: 89900, 
                                coverage: 'Cobertura total: hurto, daños, vandalismo. Daños a terceros hasta $50M', 
                                active: false, 
                                benefits: [
                                    'Moto de cortesía durante reparaciones.',
                                    'Seguro de batería y sistema eléctrico.',
                                    'Acceso a estaciones de carga premium y descuentos en energía.'
                                ]
                            }
                        ]
                    }
                },
                plans: [] // Mantenemos esto para compatibilidad, pero ahora los planes están en options
            },
            { 
                id: 'tecnologia', 
                title: 'Tecnología', 
                icon: null,        // No usamos icono, usamos imagen
                image: technologyCategoryImage, // Imagen personalizada
                description: 'Este seguro está diseñado para el nómada digital urbano. Protege el ecosistema tecnológico que un joven lleva en su mochila, su centro de estudio, trabajo y entretenimiento. Más que un seguro de aparatos, es la garantía de que su mundo digital no se detendrá por un accidente, un robo o un imprevisto.', 
                options: {
                    celular: {
                        title: 'Celular',
                        description: 'Protección completa para tu smartphone',
                        plans: [
                            { 
                                id: 'celular_esencial', 
                                name: 'Plan Esencial', 
                                price: 29900, 
                                coverage: 'Cubre hurto calificado y daño total accidental para celulares. Hasta $2M.', 
                                active: false, 
                                benefits: [
                                    'Gestión 100% Digital desde la app Bolívar Rush.',
                                    'Reparación Express en red de talleres especializados.',
                                    'Asistencia Tecnológica 24/7 para configuración y dudas.'
                                ]
                            }, 
                            { 
                                id: 'celular_plus', 
                                name: 'Plan Plus', 
                                price: 42900, 
                                coverage: 'Cubre hurto calificado, daño total y parcial (Reparacion de pantalla). Hasta $4.5M.', 
                                active: false, // Desactivado al inicio
                                benefits: [
                                    'Gestión 100% Digital desde la app Bolívar Rush.',
                                    'Reparación Express con servicio a domicilio.',
                                    'Asistencia Tecnológica 24/7 y respaldo de datos.'
                                ]
                            }, 
                            { 
                                id: 'celular_premium', 
                                name: 'Plan Premium', 
                                price: 58900, 
                                coverage: 'Cubre hurto (calificado y simple), daño total/parcial (reparación de pantalla, puertos, cámaras y daños por líquidos). Hasta $7M.', 
                                active: false, 
                                benefits: [
                                    'Gestión 100% Digital desde la app Bolívar Rush.',
                                    'Reparación Express premium con celular de respaldo.',
                                    'Asistencia Tecnológica 24/7 y transferencia de datos.'
                                ]
                            }
                        ]
                    },
                    portatil: {
                        title: 'Portátil/Tablet',
                        description: 'Cobertura especializada para equipos de trabajo y estudio',
                        plans: [
                            { 
                                id: 'portatil_esencial', 
                                name: 'Plan Esencial', 
                                price: 55900, 
                                coverage: 'Cubre hurto calificado y daño total accidental para portátiles/tablets. Hasta $3M.', 
                                active: false, // Desactivado al inicio
                                benefits: [
                                    'Gestión 100% Digital con seguimiento en tiempo real.',
                                    'Reparación Express en centros especializados.',
                                    'Soporte técnico 24/7 y recuperación de datos básica.'
                                ]
                            }, 
                            { 
                                id: 'portatil_plus', 
                                name: 'Plan Plus', 
                                price: 74900, 
                                coverage: 'Cubre hurto calificado, daño total y parcial (pantalla, teclado). Hasta $5M.', 
                                active: false, 
                                benefits: [
                                    'Gestión 100% Digital con seguimiento GPS.',
                                    'Reparación Express con equipos de préstamo.',
                                    'Soporte técnico 24/7 y recuperación avanzada de datos.'
                                ]
                            }, 
                            { 
                                id: 'portatil_premium', 
                                name: 'Plan Premium', 
                                price: 94900, 
                                coverage: 'Cubre hurto (calificado y simple), daño total/parcial, líquidos, sobretensión. Hasta $8M.', 
                                active: false, 
                                benefits: [
                                    'Gestión 100% Digital con alertas proactivas.',
                                    'Reparación Express premium con equipo de reemplazo.',
                                    'Soporte técnico 24/7 y respaldo automático en la nube.'
                                ]
                            }
                        ]
                    },
                    gadgets: {
                        title: 'Gadgets',
                        description: 'Protección para el toque final del setup: audífonos y smartwatch que definen el estilo y la funcionalidad diaria.',
                        plans: [
                            { 
                                id: 'audifonos_esencial', 
                                name: 'Plan Esencial', 
                                price: 18900, 
                                coverage: 'Cubre hurto calificado y daño total accidental para audífonos. Hasta $800K.', 
                                active: false, 
                                benefits: [
                                    'Gestión 100% Digital rápida y sencilla.',
                                    'Reparación Express en tiendas autorizadas.',
                                    'Asesoría técnica para configuración y uso.'
                                ]
                            }, 
                            { 
                                id: 'audifonos_plus', 
                                name: 'Plan Plus', 
                                price: 26900, 
                                coverage: 'Cubre hurto calificado, daño total y parcial (cables, estuche). Hasta $1.5M.', 
                                active: false, // Desactivado al inicio
                                benefits: [
                                    'Gestión 100% Digital con seguimiento.',
                                    'Reparación Express con reemplazo temporal.',
                                    'Asesoría técnica y configuración personalizada.'
                                ]
                            }, 
                            { 
                                id: 'audifonos_premium', 
                                name: 'Plan Premium', 
                                price: 34900, 
                                coverage: 'Cubre hurto (calificado y simple), daño total/parcial, humedad. Hasta $2.5M.', 
                                active: false, 
                                benefits: [
                                    'Gestión 100% Digital con notificaciones.',
                                    'Reparación Express premium con upgrade disponible.',
                                    'Asesoría técnica 24/7 y optimización de audio.'
                                ]
                            }
                        ]
                    }
                },
                plans: [] // Mantenemos esto para compatibilidad, pero ahora los planes están en options
            }
        ],
        // Métodos de pago disponibles con sus beneficios
        paymentMethods: [
            {
                id: 'credit_allied_banks',
                title: 'Crédito Bancos Aliados',
                description: 'Utiliza tu tarjeta de crédito de nuestros bancos aliados y obtén descuentos exclusivos.',
                icon: '💳',
                color: '#F39C12',  // Amarillo dorado como en la imagen
                colorHover: '#E67E22',  // Amarillo más intenso para hover
                benefit: {
                    type: 'discount',
                    value: 10,
                    description: '10% de descuento en marcas aliadas'
                },
                details: [
                    'Descuento inmediato del 10% en compras con marcas aliadas',
                    'Acumulación de puntos adicionales',
                    'Sin costos de manejo adicionales',
                    'Procesamiento instantáneo'
                ]
            },
            {
                id: 'debit_allied_banks',
                title: 'Débito Bancos Aliados',
                description: 'Paga con tu tarjeta débito de bancos aliados y recibe cashback en efectivo.',
                icon: '🏦',
                color: '#E74C3C',  // Rojo vibrante como en la imagen
                colorHover: '#C0392B',  // Rojo más intenso para hover
                benefit: {
                    type: 'cashback',
                    value: 15,
                    description: '15% de cashback'
                },
                details: [
                    'Cashback del 15% acreditado directamente a tu cuenta',
                    'Sin comisiones por transacción',
                    'Devolución procesada en 24-48 horas',
                    'Beneficio válido para todos los planes'
                ]
            },
            {
                id: 'other_methods',
                title: 'Otros Medios de Pago',
                description: 'Utiliza cualquier otro método de pago disponible sin beneficios adicionales.',
                icon: '💰',
                color: '#95A5A6',
                benefit: {
                    type: 'none',
                    value: 0,
                    description: 'Sin beneficios adicionales'
                },
                details: [
                    'Tarjetas de crédito/débito de otros bancos',
                    'Transferencias bancarias',
                    'Pagos en efectivo en puntos autorizados',
                    'PSE y otros medios digitales'
                ]
            }
        ]
    };

    // Este objeto guarda en qué parte de la aplicación estamos y qué está pasando
    let appState = {
        view: 'welcome',                // En qué pantalla estamos ('welcome', 'dashboard', 'plans', 'my-insurances', 'payment-methods')
        currentCategory: null,          // Qué categoría está viendo el usuario (transporte/tecnología)
        interactiveElements: [],        // Lista de botones y áreas donde se puede hacer clic
        hoveredElement: null,           // Sobre qué elemento está el mouse en este momento
        selectedPaymentMethod: null,    // Método de pago seleccionado por el usuario
        // Configuración para las animaciones bonitas entre pantallas
        animation: { 
            inProgress: false,          // Si hay una animación ejecutándose
            progress: 0,                // Qué tanto ha avanzado la animación (0 a 1)
            fromView: null,             // De qué pantalla viene
            toView: null,               // A qué pantalla va
            duration: 400               // Cuánto dura la animación en milisegundos
        },
        // Configuración para las ventanas emergentes (como el chat)
        modal: { 
            isOpen: false,              // Si hay una ventana abierta
            type: null,                 // Qué tipo de ventana es
            title: '',                  // Título de la ventana
            chatHistory: [],            // Historial de conversación con el asesor
            isLoading: false,           // Si está esperando respuesta del asesor
            scrollOffset: 0,            // Posición del scroll en el chat
            totalChatHeight: 0          // Altura total del contenido del chat
        },
        selectedTransport: null,        // Qué tipo de transporte eligió el usuario
        selectedTechnology: null,       // Qué tipo de tecnología eligió el usuario
        currentSlide: null,             // En qué slide está (para presentaciones)
        // Beneficios extras específicos por categoría
        extraBenefits: {
            transporte: [
                { name: 'Descuentos en cascos certificados y equipo de protección (chaquetas, guantes)', active: false },
                { name: 'Servicio de "Marcación Segura" anti-robo y un Bike-Fitting virtual para optimizar tu postura y rendimiento', active: false },
                { name: 'Un mantenimiento preventivo gratuito al año (limpieza, ajuste de frenos y tornillería)', active: false }
            ],
            tecnologia: [
                { name: '1 TB de almacenamiento en la nube con nuestro partner para que tus archivos siempre estén seguros', active: false },
                { name: 'Acceso a 2 Day-Pass mensuales en una red de Co-Working Spaces en Bogotá. Ideal para freelancers y estudiantes', active: false },
                { name: 'Suscripción a una app de productividad (ej. Skillshare, Adobe Express) y servicio de reparación a domicilio para tu portátil una vez al año', active: false }
            ]
        }
    };

    // Aquí guardamos las imágenes de los diferentes tipos de transporte
    const transportImages = {
        patineta: null,     // Imagen de patineta eléctrica (inicialmente vacía)
        bicicleta: null,    // Imagen de bicicleta (inicialmente vacía)
        motos: null    // Imagen de vehículos eléctricos (inicialmente vacía)
    };

    // Aquí guardamos las imágenes de los diferentes tipos de tecnología
    const technologyImages = {
        celular: null,      // Imagen de celulares (inicialmente vacía)
        portatil: null,     // Imagen de portátil/tablet (inicialmente vacía)
        gadgets: null       // Imagen de gadgets (audífonos, etc.) (inicialmente vacía)
    };

    // Esta función carga las imágenes locales para mostrarlas en la aplicación
    function loadTransportImages() {
        // La imagen de categoría se carga automáticamente arriba como imagen local
        
        // URLs de las imágenes locales en la carpeta del proyecto
        const originalUrls = {
            patineta: './imagenes/scooter}.png',     // Nota: hay un typo en el nombre del archivo
            bicicleta: './imagenes/bicicleta.jpg',
            motos: './imagenes/moto.png'
        };

        // URLs de respaldo en caso de error
        const fallbackUrls = {
            patineta: './imagenes/scooter}.png',
            bicicleta: './imagenes/bicicleta.jpg', 
            motos: './imagenes/moto.png'
        };

        // Para cada tipo de transporte, intenta cargar su imagen
        Object.keys(originalUrls).forEach(key => {
            const img = new Image(); // Crea una nueva imagen
            
            // Si la imagen se carga correctamente
            img.onload = () => {
                console.log(`✅ Imagen original cargada exitosamente: ${key}`);
                transportImages[key] = img; // Guarda la imagen
                // Si estamos en la pantalla correcta, redibuja para mostrar la imagen
                if (appState.view === 'plans' && appState.currentCategory === 'transporte' && !appState.selectedTransport) {
                    draw();
                }
            };
            
            // Si hay un error cargando la imagen original
            img.onerror = (error) => {
                console.log(`❌ Error con imagen original ${key}, probando fallback...`);
                // Intenta con la imagen de respaldo
                const fallbackImg = new Image();
                fallbackImg.onload = () => {
                    console.log(`✅ Imagen fallback cargada: ${key}`);
                    transportImages[key] = fallbackImg;
                    if (appState.view === 'plans' && appState.currentCategory === 'transporte' && !appState.selectedTransport) {
                        draw();
                    }
                };
                fallbackImg.onerror = () => {
                    console.log(`❌ Error también con fallback para ${key}`);
                    transportImages[key] = null; // No hay imagen disponible
                };
                fallbackImg.src = fallbackUrls[key]; // Carga la imagen de respaldo
            };
            
            img.src = originalUrls[key]; // Intenta cargar la imagen original
            console.log(`🔄 Intentando cargar imagen original: ${key} - ${originalUrls[key]}`);
        });
    }

    // Esta función carga las imágenes locales para las opciones de tecnología
    function loadTechnologyImages() {
        // URLs de las imágenes locales para tecnología
        const technologyUrls = {
            celular: './imagenes/celular.png',
            portatil: './imagenes/portatil.png', 
            gadgets: './imagenes/audifonos.png'
        };

        // Para cada tipo de tecnología, intenta cargar su imagen
        Object.keys(technologyUrls).forEach(key => {
            const img = new Image();
            
            img.onload = () => {
                console.log(`✅ Imagen de tecnología cargada exitosamente: ${key}`);
                technologyImages[key] = img;
                if (appState.view === 'plans' && appState.currentCategory === 'tecnologia' && !appState.selectedTechnology) {
                    draw();
                }
            };
            
            img.onerror = (error) => {
                console.log(`❌ Error cargando imagen de tecnología: ${key}`);
                technologyImages[key] = null;
            };
            
            img.src = technologyUrls[key];
            console.log(`🔄 Intentando cargar imagen de tecnología: ${key} - ${technologyUrls[key]}`);
        });
    }

    // Esta función ajusta el tamaño del lienzo según la pantalla del usuario
    function resizeCanvas() {
        const container = document.getElementById('canvas-container'); // El contenedor del lienzo
        const dpr = window.devicePixelRatio || 1; // Calidad de la pantalla (retina, etc.)
        const rect = container.getBoundingClientRect(); // Tamaño actual del contenedor
        const width = rect.width;

        let requiredHeight = 0; // Cuánta altura necesitamos
        
        // Calcula la altura según en qué pantalla estemos
        if (appState.view === 'welcome') { // Si estamos en la pantalla de bienvenida
            requiredHeight = (width < 768) ? 700 : 600; // Altura óptima para el banner
        } else if (appState.view === 'plans') { // Si estamos viendo planes de seguros
            const category = data.categories.find(c => c.id === appState.currentCategory);
            if (category) {
                // Obtener el número de planes según la categoría y selección
                let planCount = 0;
                if (category.id === 'tecnologia' && appState.selectedTechnology) {
                    planCount = category.options[appState.selectedTechnology]?.plans.length || 0;
                } else {
                    planCount = category.plans?.length || 0;
                }
                
                if (width < 768) { // En celulares
                    const cardH = 520, gap = 40, startY = 180;
                    // Altura = posición inicial + (número de planes × altura de cada tarjeta)
                    requiredHeight = startY + (planCount * (cardH + gap));
                } else { // En computadoras
                    requiredHeight = 800; // Altura fija
                }
            }
        } else if (appState.view === 'my-insurances') { // Si estamos en "Mis Seguros"
            // Calcular altura necesaria según número de seguros activos
            const activeInsurances = getAllActiveInsurances();
            if (width < 768) { // En celulares
                const cardH = 200, gap = 20, startY = 120;
                requiredHeight = Math.max(1000, startY + (activeInsurances.length * (cardH + gap)) + 350);
            } else { // En computadoras
                requiredHeight = Math.max(900, activeInsurances.length > 4 ? 1100 : 900);
            }
        } else if (appState.view === 'payment-methods') { // Si estamos en métodos de pago
            if (width < 768) { // En celulares
                const cardH = Math.min(width * 1.2, 480); // Altura más proporcional al ancho
                const gap = 30;
                const startY = 130;
                // Altura para 3 tarjetas apiladas verticalmente + información adicional
                requiredHeight = startY + (3 * (cardH + gap)) + 200;
            } else { // En computadoras
                requiredHeight = 900; // Altura fija para 3 tarjetas horizontales
            }
        } else { // Si estamos en la pantalla principal
            requiredHeight = (width < 768) ? 900 : 800; // Mayor altura para acomodar tarjetas del mismo tamaño que las de planes
        }
        
        const finalHeight = Math.max(600, requiredHeight); // Mínimo 600px de altura

        // Configura el tamaño del lienzo
        canvas.style.width = '100%';
        canvas.style.height = `${finalHeight}px`;
        canvas.width = width * dpr;     // Ancho real considerando calidad de pantalla
        canvas.height = finalHeight * dpr; // Alto real considerando calidad de pantalla
        
        // Escala el contexto de dibujo para pantallas de alta resolución
        ctx.scale(dpr, dpr);
        
        // Actualiza la altura del contenedor para que coincida
        container.style.height = `${finalHeight}px`;
        
        draw(); // Redibuja todo con el nuevo tamaño
    }

    // Esta función dibuja rectángulos con esquinas redondeadas (como las tarjetas)
    function drawRoundedRect(x, y, w, h, r, color, stroke) {
        ctx.fillStyle = color; // Define el color de relleno
        ctx.beginPath(); // Empieza a dibujar
        // Dibuja un rectángulo con esquinas redondeadas usando líneas y curvas
        ctx.moveTo(x + r, y); 
        ctx.lineTo(x + w - r, y); 
        ctx.quadraticCurveTo(x + w, y, x + w, y + r); 
        ctx.lineTo(x + w, y + h - r); 
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h); 
        ctx.lineTo(x + r, y + h); 
        ctx.quadraticCurveTo(x, y + h, x, y + h - r); 
        ctx.lineTo(x, y + r); 
        ctx.quadraticCurveTo(x, y, x + r, y); 
        ctx.closePath(); 
        ctx.fill(); // Rellena el rectángulo
        // Si se especifica un borde, lo dibuja
        if (stroke) { 
            ctx.strokeStyle = stroke; 
            ctx.lineWidth = 2; 
            ctx.stroke(); 
        }
    }

    // Función de respaldo para navegadores que no soportan roundRect
    if (!CanvasRenderingContext2D.prototype.roundRect) {
        CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
            // Mismo código que arriba pero como método del contexto
            this.moveTo(x + r, y);
            this.lineTo(x + w - r, y);
            this.quadraticCurveTo(x + w, y, x + w, y + r);
            this.lineTo(x + w, y + h - r);
            this.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
            this.lineTo(x + r, y + h);
            this.quadraticCurveTo(x, y + h, x, y + h - r);
            this.lineTo(x, y + r);
            this.quadraticCurveTo(x, y, x + r, y);
        };
    }
    
    // Esta función dibuja diferentes iconos según lo que necesitemos
    function drawIcon(name, x, y, size, color) {
        ctx.save(); // Guarda la configuración actual del dibujo
        ctx.strokeStyle = color; // Color del icono
        ctx.lineWidth = size * 0.1; // Grosor de las líneas
        ctx.lineCap = 'round'; // Extremos redondeados
        ctx.lineJoin = 'round'; // Uniones redondeadas
        
        // Según el nombre del icono, dibuja formas diferentes
        if (name === 'bus') { // Icono de autobús/transporte
            ctx.strokeRect(x, y, size, size * 0.6); // Cuerpo del bus
            ctx.beginPath();
            // Techo del bus
            ctx.moveTo(x + size * 0.1, y);
            ctx.lineTo(x + size * 0.2, y - size * 0.1);
            ctx.lineTo(x + size * 0.8, y - size * 0.1);
            ctx.lineTo(x + size * 0.9, y);
            ctx.stroke();
            // Ruedas del bus
            ctx.beginPath();
            ctx.arc(x + size * 0.25, y + size * 0.6, size * 0.1, 0, Math.PI * 2);
            ctx.arc(x + size * 0.75, y + size * 0.6, size * 0.1, 0, Math.PI * 2);
            ctx.stroke();
            // Ventana del bus
            ctx.strokeRect(x + size * 0.1, y + size * 0.1, size * 0.5, size * 0.25);
        }
        else if (name === 'laptop') { // Icono de laptop/tecnología
            // Base del laptop
            ctx.beginPath();
            ctx.moveTo(x, y + size * 0.7);
            ctx.lineTo(x + size, y + size * 0.7);
            ctx.lineTo(x + size * 0.85, y + size * 0.8);
            ctx.lineTo(x + size * 0.15, y + size * 0.8);
            ctx.closePath();
            ctx.stroke();
            // Pantalla del laptop
            ctx.strokeRect(x + size * 0.1, y, size * 0.8, size * 0.7);
        }
        else if (name === 'back') { // Flecha de regreso
            ctx.lineWidth = size * 0.15;
            ctx.beginPath();
            ctx.moveTo(x + size * 0.7, y);
            ctx.lineTo(x, y + size / 2);
            ctx.lineTo(x + size * 0.7, y + size);
            ctx.stroke();
        }
        else if (name === 'close') { // X para cerrar
            ctx.lineWidth = size * 0.15;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + size, y + size);
            ctx.moveTo(x + size, y);
            ctx.lineTo(x, y + size);
            ctx.stroke();
        }
        else if (name === 'sparkle') { // Estrella brillante
            ctx.fillStyle = color;
            ctx.beginPath();
            // Dibuja una estrella de 8 puntas
            ctx.moveTo(x, y - size / 2);
            ctx.lineTo(x + size / 4, y - size / 4);
            ctx.lineTo(x + size / 2, y);
            ctx.lineTo(x + size / 4, y + size / 4);
            ctx.moveTo(x, y + size / 2);
            ctx.lineTo(x - size / 4, y + size / 4);
            ctx.lineTo(x - size / 2, y);
            ctx.lineTo(x - size / 4, y - size / 4);
            ctx.closePath();
            ctx.fill();
        }
        else if (name === 'advisor') { // Icono del asesor (signo de pregunta)
            ctx.fillStyle = color;
            ctx.font = `bold ${size * 0.7}px Poppins`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('?', x, y + 2);
        }
        ctx.restore(); // Restaura la configuración de dibujo
    }

    // Esta función dibuja la pantalla de bienvenida con el banner de Bolívar Rush
    function drawWelcome(opacity = 1) {
        ctx.save(); // Guarda configuración actual
        ctx.globalAlpha = opacity; // Establece la transparencia (para animaciones)
        const { width, height } = canvas.getBoundingClientRect(); // Tamaño actual del lienzo
        
        // Calcular dimensiones responsivas para el banner
        let bannerWidth, bannerHeight, bannerX, bannerY;
        
        if (width < 768) { // En celulares
            bannerWidth = Math.min(width * 0.9, 400);  // 90% del ancho, máximo 400px
            bannerHeight = bannerWidth * 0.6;          // Proporción 16:10 aproximadamente
            bannerX = (width - bannerWidth) / 2;       // Centrado horizontalmente
            bannerY = height * 0.15;                   // 15% desde arriba
        } else { // En computadoras
            bannerWidth = Math.min(width * 0.6, 600);  // 60% del ancho, máximo 600px
            bannerHeight = bannerWidth * 0.6;          // Proporción 16:10
            bannerX = (width - bannerWidth) / 2;       // Centrado horizontalmente
            bannerY = height * 0.2;                    // 20% desde arriba
        }

        // Dibujar la imagen del banner si está disponible
        if (bolivarRushBanner && bolivarRushBanner.complete && bolivarRushBanner.width > 0) {
            // Contenedor con sombra para el banner
            ctx.save();
            ctx.shadowColor = 'rgba(0,0,0,0.2)';
            ctx.shadowBlur = 25;
            ctx.shadowOffsetY = 15;
            
            // Contenedor redondeado para la imagen
            ctx.beginPath();
            ctx.roundRect(bannerX, bannerY, bannerWidth, bannerHeight, 20);
            ctx.clip();
            
            // Dibujar la imagen del banner manteniendo proporciones
            const aspectRatio = bolivarRushBanner.width / bolivarRushBanner.height;
            const containerAspectRatio = bannerWidth / bannerHeight;
            
            let drawWidth, drawHeight, drawX, drawY;
            
            if (aspectRatio > containerAspectRatio) {
                // La imagen es más ancha, ajustar por altura
                drawHeight = bannerHeight;
                drawWidth = bannerHeight * aspectRatio;
                drawX = bannerX - (drawWidth - bannerWidth) / 2; // Centrar horizontalmente
                drawY = bannerY;
            } else {
                // La imagen es más alta, ajustar por ancho
                drawWidth = bannerWidth;
                drawHeight = bannerWidth / aspectRatio;
                drawX = bannerX;
                drawY = bannerY + (bannerHeight - drawHeight) / 2; // Centrar verticalmente
            }
            
            ctx.drawImage(bolivarRushBanner, drawX, drawY, drawWidth, drawHeight);
            ctx.restore();
        } else {
            // Fallback: mostrar un rectángulo con el logo de Bolívar Rush
            ctx.save();
            ctx.shadowColor = 'rgba(0,0,0,0.2)';
            ctx.shadowBlur = 25;
            ctx.shadowOffsetY = 15;
            
            // Fondo degradado verde
            const bannerGradient = ctx.createLinearGradient(bannerX, bannerY, bannerX, bannerY + bannerHeight);
            bannerGradient.addColorStop(0, COLORS.GREEN);
            bannerGradient.addColorStop(1, COLORS.GREEN_DARK);
            drawRoundedRect(bannerX, bannerY, bannerWidth, bannerHeight, 20, bannerGradient);
            
            // Texto del logo
            ctx.fillStyle = COLORS.WHITE;
            ctx.font = `bold ${bannerWidth * 0.08}px Poppins`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('BOLÍVAR RUSH', bannerX + bannerWidth/2, bannerY + bannerHeight/2);
            
            ctx.restore();
        }

        // Botón "Comenzar" centrado debajo del banner
        const btnWidth = Math.min(width * 0.4, 250);
        const btnHeight = 60;
        const btnX = (width - btnWidth) / 2;
        const btnY = bannerY + bannerHeight + (height < 768 ? 60 : 80);
        const btnHovered = appState.hoveredElement?.id === 'btn_start';
        
        // Dibujar el botón con efecto hover
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.25)';
        ctx.shadowBlur = 15;
        ctx.shadowOffsetY = btnHovered ? 8 : 5;
        
        // Gradiente del botón
        const btnGradient = ctx.createLinearGradient(btnX, btnY, btnX, btnY + btnHeight);
        btnGradient.addColorStop(0, btnHovered ? COLORS.YELLOW : COLORS.GREEN);
        btnGradient.addColorStop(1, btnHovered ? '#E6A500' : COLORS.GREEN_DARK);
        drawRoundedRect(btnX, btnY, btnWidth, btnHeight, 30, btnGradient);
        ctx.restore();
        
        // Texto del botón
        ctx.fillStyle = btnHovered ? COLORS.TEXT_DARK : COLORS.WHITE;
        ctx.font = `bold ${btnWidth * 0.08}px Poppins`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Comenzar', btnX + btnWidth/2, btnY + btnHeight/2);
        
        // Registrar área interactiva del botón
        addInteractiveElement('btn_start', btnX, btnY, btnWidth, btnHeight, () => {
            startAnimation('welcome', 'dashboard');
        });

        // Texto de bienvenida opcional debajo del botón
        if (height > 600) { // Solo mostrar si hay espacio suficiente
            ctx.save();
            ctx.fillStyle = COLORS.TEXT_LIGHT;
            ctx.font = `normal ${width < 768 ? '14px' : '16px'} Poppins`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText('Protege lo que más importa con seguros inteligentes', width/2, btnY + btnHeight + 30);
            ctx.restore();
        }

        ctx.restore();
    }

    // Esta función dibuja la pantalla principal donde el usuario elige entre Transporte y Tecnología
    function drawDashboard(opacity = 1) {
        ctx.save(); // Guarda configuración actual
        ctx.globalAlpha = opacity; // Establece la transparencia (para animaciones)
        const { width, height } = canvas.getBoundingClientRect(); // Tamaño actual del lienzo
        
        // Calcula el tamaño de las tarjetas usando dimensiones más anchas para mejor visualización de imágenes
        let cardWidth, cardHeight, gap, startX, startY;
        
        if (width < 768) { // En celulares
            cardWidth = Math.min(width * 0.95, 420);    // 90% del ancho, máximo 400px
            cardHeight = 600;                          // Slightly taller cards for new images
            gap = 20;                                  // Reduced gap for better alignment
            startX = (width - cardWidth) / 2;          // Center horizontally
            startY = height * 0.1;                    // Move banners higher for better visibility
        } else { // En computadoras
            cardWidth = Math.min(width * 0.4, 400);   // Wider cards for better image visibility
            cardHeight = 550;                          // Slightly taller cards for new images
            gap = width * 0.04;                        // Reduced gap for better alignment
            startX = (width - (cardWidth * 2 + gap)) / 2; // Center the two cards
            startY = (height - cardHeight) / 2 - 50;   // Move banners higher for better visibility
        }

        // Dibuja una tarjeta para cada categoría (Transporte y Tecnología)
        data.categories.forEach((cat, index) => {
            const x = startX + index * (cardWidth + gap); // Posición horizontal
            const y = startY;                             // Posición vertical
            const isHovered = appState.hoveredElement?.id === `cat_${cat.id}`; // ¿Está el mouse encima?
            
            // Crea un gradiente verde para el fondo de la tarjeta (solo para categorías que no sean transporte ni tecnología)
            if (cat.id !== 'transporte' && cat.id !== 'tecnologia') {
                const gradient = ctx.createLinearGradient(x, y, x + cardWidth, y + cardHeight);
                gradient.addColorStop(0, '#086e45');  // Verde al inicio
                gradient.addColorStop(1, '#086e45');  // Verde al final
                
                // Dibuja la tarjeta con sombra
                ctx.save();
                ctx.shadowColor = 'rgba(0,0,0,0.15)';                    // Sombra gris
                ctx.shadowBlur = isHovered ? 30 : 20;                    // Más difusa si está hover
                ctx.shadowOffsetY = isHovered ? 15 : 10;                 // Más separada si está hover
                drawRoundedRect(x, y, cardWidth, cardHeight, 20, gradient); // Dibuja la tarjeta
                
                // Añade un efecto de brillo en la esquina superior derecha
                const glowGradient = ctx.createRadialGradient(
                    x + cardWidth * 0.8, y + cardHeight * 0.2, 0,    // Centro del brillo
                    x + cardWidth * 0.8, y + cardHeight * 0.2, cardWidth * 0.5 // Radio del brillo
                );
                glowGradient.addColorStop(0, 'rgba(255,255,255,0.2)'); // Blanco semi-transparente
                glowGradient.addColorStop(1, 'rgba(255,255,255,0)');   // Transparente en los bordes
                ctx.fillStyle = glowGradient;
                ctx.fill();
                
                ctx.restore();
            }

            // Dibuja el icono o imagen con efecto luminoso
            ctx.save();
            ctx.shadowColor = 'rgba(255,255,255,0.3)'; // Sombra blanca para el brillo
            ctx.shadowBlur = 20;
            
            // Si la categoría tiene imagen personalizada, la dibuja
            if (cat.image && cat.image.complete && cat.image.width > 0) {
                console.log(`📸 Dibujando imagen para categoría ${cat.id}:`, cat.image.width, 'x', cat.image.height);
                
                // Para la categoría de transporte, usar toda la tarjeta como imagen
                if (cat.id === 'transporte') {
                    // Primero dibuja la sombra de la tarjeta
                    ctx.save();
                    ctx.shadowColor = 'rgba(0,0,0,0.15)';
                    ctx.shadowBlur = isHovered ? 30 : 20;
                    ctx.shadowOffsetY = isHovered ? 15 : 10;
                    ctx.fillStyle = 'transparent';
                    drawRoundedRect(x, y, cardWidth, cardHeight, 25, 'rgba(0,0,0,0.01)'); // Bordes más redondeados
                    ctx.restore();
                    
                    // La imagen ocupa exactamente el tamaño de la tarjeta
                    const imageX = x;
                    const imageY = y;
                    const imageWidth = cardWidth;
                    const imageHeight = cardHeight;
                    
                    // Contenedor redondeado para la imagen (bordes más suaves)
                    ctx.save();
                    ctx.beginPath();
                    ctx.roundRect(imageX, imageY, imageWidth, imageHeight, 25); // Bordes más redondeados
                    ctx.clip();
                    
                    // Fondo de color para la tarjeta antes de la imagen
                    ctx.fillStyle = '#0a4d35'; // Verde oscuro similar al diseño
                    ctx.fillRect(imageX, imageY, imageWidth, imageHeight);
                    
                    // Dibuja la imagen mostrando todo el contenido (como background-size: contain)
                    const aspectRatio = cat.image.width / cat.image.height;
                    const cardAspectRatio = imageWidth / imageHeight;
                    
                    let drawWidth, drawHeight, drawX, drawY;
                    
                    if (aspectRatio > cardAspectRatio) {
                        // La imagen es más ancha, ajustar por ancho para mostrar todo el contenido
                        drawWidth = imageWidth;
                        drawHeight = imageWidth / aspectRatio;
                        drawX = imageX;
                        drawY = imageY + (imageHeight - drawHeight) / 2; // Centrar verticalmente
                    } else {
                        // La imagen es más alta, ajustar por altura para mostrar todo el contenido
                        drawHeight = imageHeight;
                        drawWidth = imageHeight * aspectRatio;
                        drawX = imageX + (imageWidth - drawWidth) / 2; // Centrar horizontalmente
                        drawY = imageY;
                    }
                    
                    ctx.drawImage(cat.image, drawX, drawY, drawWidth, drawHeight);
                    ctx.restore();
                } 
                // Para la categoría de tecnología, usar toda la tarjeta como imagen con texto superpuesto
                else if (cat.id === 'tecnologia') {
                    // Primero dibuja la sombra de la tarjeta
                    ctx.save();
                    ctx.shadowColor = 'rgba(0,0,0,0.15)';
                    ctx.shadowBlur = isHovered ? 30 : 20;
                    ctx.shadowOffsetY = isHovered ? 15 : 10;
                    ctx.fillStyle = 'transparent';
                    drawRoundedRect(x, y, cardWidth, cardHeight, 25, 'rgba(0,0,0,0.01)'); // Bordes más redondeados
                    ctx.restore();
                    
                    // La imagen ocupa exactamente el tamaño de la tarjeta
                    const imageX = x;
                    const imageY = y;
                    const imageWidth = cardWidth;
                    const imageHeight = cardHeight;
                    
                    // Contenedor redondeado para la imagen (bordes más suaves)
                    ctx.save();
                    ctx.beginPath();
                    ctx.roundRect(imageX, imageY, imageWidth, imageHeight, 25); // Bordes más redondeados
                    ctx.clip();
                    
                    // Fondo de color para la tarjeta antes de la imagen
                    ctx.fillStyle = '#0a4d35'; // Verde oscuro similar al diseño
                    ctx.fillRect(imageX, imageY, imageWidth, imageHeight);
                    
                    // Dibuja la imagen mostrando todo el contenido (como background-size: contain)
                    const aspectRatio = cat.image.width / cat.image.height;
                    const cardAspectRatio = imageWidth / imageHeight;
                    
                    let drawWidth, drawHeight, drawX, drawY;
                    
                    if (aspectRatio > cardAspectRatio) {
                        // La imagen es más ancha, ajustar por ancho para mostrar todo el contenido
                        drawWidth = imageWidth;
                        drawHeight = imageWidth / aspectRatio;
                        drawX = imageX;
                        drawY = imageY + (imageHeight - drawHeight) / 2; // Centrar verticalmente
                    } else {
                        // La imagen es más alta, ajustar por altura para mostrar todo el contenido
                        drawHeight = imageHeight;
                        drawWidth = imageHeight * aspectRatio;
                        drawX = imageX + (imageWidth - drawWidth) / 2; // Centrar horizontalmente
                        drawY = imageY;
                    }
                    
                    ctx.drawImage(cat.image, drawX, drawY, drawWidth, drawHeight);
                    ctx.restore();
                } else {
                    // Para otras categorías, usar el tamaño normal
                    const imageSize = 100;
                    const imageX = x + (cardWidth - imageSize) / 2;
                    const imageY = y + 40;
                    
                    // Contenedor redondeado para la imagen
                    ctx.save();
                    ctx.beginPath();
                    ctx.roundRect(imageX, imageY, imageSize, imageSize, 15);
                    ctx.clip();
                    
                    // Dibuja la imagen manteniendo las proporciones
                    const aspectRatio = cat.image.width / cat.image.height;
                    let drawWidth = imageSize;
                    let drawHeight = imageSize;
                    let drawX = imageX;
                    let drawY = imageY;
                    
                    if (aspectRatio > 1) {
                        drawHeight = imageSize / aspectRatio;
                        drawY = imageY + (imageSize - drawHeight) / 2;
                    } else {
                        drawWidth = imageSize * aspectRatio;
                        drawX = imageX + (imageSize - drawWidth) / 2;
                    }
                    
                    ctx.drawImage(cat.image, drawX, drawY, drawWidth, drawHeight);
                    ctx.restore();
                }
            } else if (cat.icon) {
                // Si no hay imagen pero sí icono, dibuja el icono
                console.log(`🔗 Dibujando icono para categoría ${cat.id}:`, cat.icon);
                drawIcon(cat.icon, x + (cardWidth - 100) / 2, y + 40, 100, '#FFFFFF');
            } else {
                // Debug: por qué no se muestra imagen
                console.log(`❓ Categoría ${cat.id}:`, {
                    hasImage: !!cat.image,
                    imageComplete: cat.image ? cat.image.complete : 'N/A',
                    imageWidth: cat.image ? cat.image.width : 'N/A',
                    hasIcon: !!cat.icon,
                    icon: cat.icon
                });
            }
            
            // Solo mostrar título y descripción para categorías que NO sean transporte ni tecnología
            if (cat.id !== 'transporte' && cat.id !== 'tecnologia') {
                // Título de la categoría
                ctx.fillStyle = '#FFFFFF';
                ctx.font = `bold ${cardWidth * 0.09}px Poppins`;
                ctx.textAlign = 'left';
                ctx.fillText(cat.title, x + 30, y + 160);
                
                // Descripción de la categoría
                ctx.font = `${cardWidth * 0.045}px Poppins`;
                ctx.fillStyle = 'rgba(255,255,255,0.9)'; // Blanco casi opaco
                wrapText(cat.description, x + 30, y + 190, cardWidth - 60, cardWidth * 0.06);
            }
            
            // Botón "Ver Planes" - posición optimizada para tarjetas más grandes
            const btnW = cardWidth * 0.5, btnH = 50; // Botón más grande proporcionalmente
            let btnX, btnY;
            
            if (cat.id === 'transporte' || cat.id === 'tecnologia') {
                // Para transporte y tecnología: superponer el botón sobre la imagen en la parte inferior
                btnX = x + (cardWidth - btnW) / 2;
                btnY = y + cardHeight - btnH - 25; // 25px desde el borde inferior
            } else {
                // Para otras categorías: posición normal
                btnX = x + 30;
                btnY = y + cardHeight - btnH - 30; // Más espacio desde abajo para tarjetas más altas
            }
            
            const btnHovered = appState.hoveredElement?.id === `btn_view_${cat.id}`;
            
            // Fondo del botón - optimizado para visibilidad sobre imagen
            ctx.save();
            if (cat.id === 'transporte' || cat.id === 'tecnologia') {
                // Fondo más opaco y con sombra mejorada para destacar sobre cualquier imagen
                ctx.fillStyle = btnHovered ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.96)';
                ctx.shadowColor = 'rgba(0,0,0,0.4)'; // Sombra más intensa
                ctx.shadowBlur = 20; // Sombra más difusa
                ctx.shadowOffsetY = 8; // Mayor separación
            } else {
                // Fondo normal para otras categorías
                ctx.fillStyle = btnHovered ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.9)';
                ctx.shadowColor = 'rgba(0,0,0,0.1)';
                ctx.shadowBlur = 10;
                ctx.shadowOffsetY = 2;
            }
            drawRoundedRect(btnX, btnY, btnW, btnH, 25); // Bordes más redondeados para consistencia
            ctx.restore();
            
            // Texto del botón - ajustado para botón más grande
            ctx.fillStyle = '#016D39'; // Verde oscuro
            ctx.font = `bold ${Math.max(16, cardWidth * 0.045)}px Poppins`; // Tamaño mínimo de 16px
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('Ver Planes', btnX + btnW/2, btnY + btnH/2); // Centrado perfectamente
            
            // Registra las áreas donde se puede hacer clic
            addInteractiveElement(`cat_${cat.id}`, x, y, cardWidth, cardHeight, () => {});
            addInteractiveElement(`btn_view_${cat.id}`, btnX, btnY, btnW, btnH, () => startAnimation('dashboard', 'plans', cat.id));
        });

        ctx.restore();
    }

    // Esta función dibuja la pantalla donde se muestran los planes de seguros
    function drawPlans(opacity = 1) {
        ctx.save(); // Guarda configuración
        ctx.globalAlpha = opacity; // Transparencia para animaciones
        const { width, height } = canvas.getBoundingClientRect();
        const category = data.categories.find(c => c.id === appState.currentCategory); // Busca la categoría actual
        if (!category) return; // Si no encuentra la categoría, no dibuja nada

        // Título de la categoría con sombra para que se vea sobre el video
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.7)'; // Sombra oscura
        ctx.shadowBlur = 6;                      // Qué tan difusa es la sombra
        ctx.shadowOffsetX = 2;                   // Desplazamiento horizontal
        ctx.shadowOffsetY = 2;                   // Desplazamiento vertical
        ctx.textAlign = 'center';
        ctx.fillStyle = COLORS.WHITE;            // Texto blanco
        ctx.font = `bold 36px Poppins`;
        // Título dinámico según la selección
        let displayTitle = category.title;
        if (category.id === 'tecnologia' && appState.selectedTechnology) {
            const selectedOption = category.options[appState.selectedTechnology];
            displayTitle = `${category.title} - ${selectedOption?.title || ''}`;
        }
        ctx.fillText(displayTitle, width/2, 60); // Dibuja el título centrado
        ctx.restore();
        
        // Descripción de la categoría también con sombra - solo si no hay opción seleccionada
        if ((category.id === 'transporte' && !appState.selectedTransport) || 
            (category.id === 'tecnologia' && !appState.selectedTechnology) ||
            (category.id !== 'transporte' && category.id !== 'tecnologia')) {
            ctx.save();
            ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
            ctx.shadowBlur = 4;
            ctx.shadowOffsetX = 1;
            ctx.shadowOffsetY = 1;
            ctx.font = `normal 14px Poppins`;
            ctx.fillStyle = COLORS.WHITE;
            ctx.textAlign = 'left'; // Cambio a left para que funcione con wrapText
            
            // Posición del texto: más arriba solo cuando hay una opción seleccionada (mostrando planes)
            const textY = (appState.selectedTransport || appState.selectedTechnology) ? 85 : 100;
            wrapText(category.description, width/2 - Math.min(width * 0.45, 450), textY, Math.min(width * 0.9, 900), 20);
            ctx.restore();
        }
        
        // Botón de "Volver" en la esquina superior derecha
        const backBtnSize = 40;
        const backBtnHovered = appState.hoveredElement?.id === 'btn_back';
        drawRoundedRect(width - backBtnSize - 40, 35, backBtnSize, backBtnSize, 10, backBtnHovered ? COLORS.YELLOW : COLORS.GRAY_LIGHT);
        drawIcon('back', width - backBtnSize - 32, 45, 20, backBtnHovered ? COLORS.TEXT_DARK : COLORS.GREEN);
        addInteractiveElement('btn_back', width - backBtnSize - 40, 35, backBtnSize, backBtnSize, () => {
            // Si estamos en transporte y hay una opción seleccionada, vuelve a las opciones
            if (category.id === 'transporte' && appState.selectedTransport) {
                appState.selectedTransport = null;
                draw();
            } else if (category.id === 'tecnologia' && appState.selectedTechnology) {
                appState.selectedTechnology = null;
                draw();
            } else {
                // Si no, vuelve a la pantalla principal
                startAnimation('plans', 'dashboard');
            }
        });

        // Para transporte, primero muestra las opciones (patineta, bici, motos)
        if (category.id === 'transporte' && !appState.selectedTransport) {
            drawTransportOptions(); // Llama a la función que dibuja las opciones de transporte
            ctx.restore();
            return; // Sale de la función aquí
        }

        // Para tecnología, primero muestra las opciones (celular, portátil, audífonos)
        if (category.id === 'tecnologia' && !appState.selectedTechnology) {
            drawTechnologyOptions(); // Llama a la función que dibuja las opciones de tecnología
            ctx.restore();
            return; // Sale de la función aquí
        }

        // Obtener los planes según la categoría y selección
        let currentPlans = [];
        if (category.id === 'tecnologia' && appState.selectedTechnology) {
            // Para tecnología, usar los planes específicos del tipo seleccionado
            currentPlans = category.options[appState.selectedTechnology]?.plans || [];
        } else if (category.id === 'transporte' && appState.selectedTransport) {
            // Para transporte, usar los planes específicos del tipo seleccionado
            currentPlans = category.options[appState.selectedTransport]?.plans || [];
        } else {
            // Para otras categorías, usar los planes normales (fallback)
            currentPlans = category.plans || [];
        }

        // Calcula el tamaño de las tarjetas de planes según el dispositivo
        let cardW, cardH, gap, totalW, startX, startY;
        
        if (width < 768) { // En celulares
            cardW = Math.min(width * 0.9, 380);    // 90% del ancho, máximo 380px
            cardH = 580;                           // Altura fija optimizada para móvil
            gap = 30;                              // Separación entre tarjetas
            startY = 170;                          // Posición vertical inicial - un poco más arriba
            startX = (width - cardW) / 2;          // Centra horizontalmente
        } else { // En computadoras
            cardW = Math.min(width * 0.28, 320);   // 28% del ancho cada tarjeta
            cardH = 520;                           // Altura optimizada para desktop
            gap = width * 0.03;                    // 3% del ancho como separación
            totalW = currentPlans.length * cardW + (currentPlans.length - 1) * gap; // Ancho total necesario
            startX = (width - totalW) / 2;         // Centra todas las tarjetas
            startY = 170;                          // Posición vertical - un poco más arriba
        }

        // Dibuja una tarjeta para cada plan de seguro
        currentPlans.forEach((plan, index) => {
            // Calcula la posición de cada tarjeta
            let x, y;
            if (width < 768) { // En celular: tarjetas una debajo de otra
                x = startX;
                y = startY + index * (cardH + gap);
            } else { // En computadora: tarjetas una al lado de otra
                x = startX + index * (cardW + gap);
                y = startY;
            }
            
            // Dibuja la tarjeta principal con efecto de vidrio transparente
            ctx.save();
            ctx.shadowColor = 'rgba(0,0,0,0.25)';   // Sombra oscura
            ctx.shadowBlur = 30;                    // Muy difusa
            ctx.shadowOffsetY = 10;                 // Separada hacia abajo
            
            // Fondo transparente con efecto glassmorphism (como vidrio esmerilado)
            const cardGradient = ctx.createLinearGradient(x, y, x, y + cardH);
            cardGradient.addColorStop(0, 'rgba(255, 255, 255, 0.25)'); // Blanco semi-transparente arriba
            cardGradient.addColorStop(1, 'rgba(255, 255, 255, 0.15)'); // Más transparente abajo
            drawRoundedRect(x, y, cardW, cardH, 20, cardGradient);
            
            // Borde sutil para definir la tarjeta
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.roundRect(x, y, cardW, cardH, 20);
            ctx.stroke();
            ctx.restore();

            // Si el plan está activo, dibuja una etiqueta verde en la parte superior
            if (plan.active) {
                const badgeW = cardW * 0.6;          // 60% del ancho de la tarjeta
                const badgeH = 30;                   // Altura fija
                const badgeX = x + (cardW - badgeW) / 2; // Centrado horizontalmente
                const badgeY = y + 15;               // 15px desde arriba
                
                ctx.save();
                // Gradiente verde para la etiqueta
                const badgeGradient = ctx.createLinearGradient(badgeX, badgeY, badgeX, badgeY + badgeH);
                badgeGradient.addColorStop(0, COLORS.GREEN);      // Verde claro arriba
                badgeGradient.addColorStop(1, COLORS.GREEN_DARK); // Verde oscuro abajo
                ctx.fillStyle = badgeGradient;
                drawRoundedRect(badgeX, badgeY, badgeW, badgeH, 15);
                
                // Texto de la etiqueta
                ctx.fillStyle = COLORS.WHITE;
                ctx.font = `bold ${cardW * 0.04}px Poppins`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('✓ PLAN ACTIVO', badgeX + badgeW/2, badgeY + badgeH/2);
                ctx.restore();
            }

            // Título del plan centrado y con sombra para legibilidad
            const titleY = plan.active ? y + 65 : y + 40; // Más abajo si hay etiqueta
            ctx.save();
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowBlur = 4;
            ctx.shadowOffsetX = 1;
            ctx.shadowOffsetY = 1;
            ctx.fillStyle = COLORS.WHITE; // Cambio a blanco para mejor legibilidad
            ctx.font = `bold ${cardW * 0.065}px Poppins`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText(plan.name, x + cardW / 2, titleY);
            ctx.restore();

            // Sección del precio con diseño circular elegante
            const priceY = titleY + 45;
            ctx.save();
            // Dibuja un círculo de fondo para destacar el precio
            const priceCircleRadius = cardW * 0.12;      // 12% del ancho de la tarjeta
            const priceCircleX = x + cardW / 2;          // Centrado horizontalmente
            const priceCircleY = priceY + 25;            // Posición vertical
            
            // Gradiente radial para el fondo del círculo
            const priceGradient = ctx.createRadialGradient(
                priceCircleX, priceCircleY, 0,                    // Centro del gradiente
                priceCircleX, priceCircleY, priceCircleRadius     // Radio del gradiente
            );
            priceGradient.addColorStop(0, 'rgba(8, 110, 69, 0.1)'); // Verde muy transparente en el centro
            priceGradient.addColorStop(1, 'rgba(8, 110, 69, 0.05)'); // Aún más transparente en los bordes
            ctx.fillStyle = priceGradient;
            ctx.beginPath();
            ctx.arc(priceCircleX, priceCircleY, priceCircleRadius, 0, Math.PI * 2);
            ctx.fill();
            
            // Precio principal en números grandes
            ctx.fillStyle = COLORS.WHITE;
            ctx.font = `bold ${cardW * 0.08}px Poppins`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`$${plan.price.toLocaleString('es-CO')}`, priceCircleX, priceCircleY - 5); // Formato colombiano
            
            // Texto de periodicidad (por mes)
            ctx.font = `normal ${cardW * 0.045}px Poppins`;
            ctx.fillStyle = COLORS.WHITE; // Texto más oscuro para contraste
            ctx.fillText('/mes', priceCircleX, priceCircleY + 15);
            ctx.restore();

            // Sección de cobertura - qué está incluido
            const coverageY = priceY + 80;
            ctx.save();
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowBlur = 4;
            ctx.shadowOffsetX = 1;
            ctx.shadowOffsetY = 1;
            ctx.fillStyle = COLORS.WHITE; // Cambio a blanco para mejor legibilidad
            ctx.font = `bold ${cardW * 0.055}px Poppins`;
            ctx.textAlign = 'center';
            ctx.fillText('Cobertura Incluida', x + cardW / 2, coverageY);
            ctx.restore();
            
            // Descripción detallada de lo que cubre el plan
            ctx.save();
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowBlur = 4;
            ctx.shadowOffsetX = 1;
            ctx.shadowOffsetY = 1;
            ctx.fillStyle = COLORS.WHITE; // Cambio a blanco para mejor legibilidad
            ctx.font = `normal ${cardW * 0.042}px Poppins`;
            ctx.textAlign = 'left'; // Cambio a left para que funcione con wrapText
            ctx.textBaseline = 'top'; // Asegura baseline consistente
            // Usar coordenadas ajustadas para texto centrado visualmente
            wrapText(plan.coverage, x + 15, coverageY + 25, cardW - 30, cardW * 0.055);
            ctx.restore();

            // Botón de explicación (estrella brillante) para obtener más información
            const explainBtnId = `btn_explain_${plan.id}`;
            const explainBtnSize = 28;
            const explainBtnX = x + cardW - explainBtnSize - 12; // Esquina superior derecha
            const explainBtnY = y + 12;
            const explainHovered = appState.hoveredElement?.id === explainBtnId;
            
            ctx.save();
            // Fondo del botón (amarillo cuando se pasa el mouse)
            ctx.fillStyle = explainHovered ? COLORS.YELLOW : 'rgba(255, 208, 80, 0.2)';
            ctx.strokeStyle = COLORS.YELLOW;
            ctx.lineWidth = 2;
            drawRoundedRect(explainBtnX, explainBtnY, explainBtnSize, explainBtnSize, 14);
            if (explainHovered) {
                ctx.stroke(); // Borde amarillo cuando está hover
            }
            drawIcon('sparkle', explainBtnX + explainBtnSize/2, explainBtnY + explainBtnSize/2, 14, COLORS.GREEN);
            ctx.restore();
            
            // Registra el área del botón para interactividad
            addInteractiveElement(explainBtnId, explainBtnX, explainBtnY, explainBtnSize, explainBtnSize, () => handleExplainCoverageClick(category, plan));

            // Sección de beneficios incluidos en el plan
            let benefitsY = coverageY + 100;
            if (plan.benefits && plan.benefits.length > 0) {
                ctx.save();
                ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
                ctx.shadowBlur = 4;
                ctx.shadowOffsetX = 1;
                ctx.shadowOffsetY = 1;
                ctx.fillStyle = COLORS.WHITE; // Cambio a blanco para mejor legibilidad
                ctx.font = `bold ${cardW * 0.055}px Poppins`;
                ctx.textAlign = 'center';
                ctx.fillText('Beneficios Incluidos', x + cardW / 2, benefitsY);
                ctx.restore();

                // Dibuja cada beneficio como texto simple (sin checkbox)
                plan.benefits.forEach((benefit, benefitIndex) => {
                    const benefitItemY = benefitsY + 35 + (benefitIndex * 35);
                    
                    // Bullet point (•)
                    ctx.save();
                    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
                    ctx.shadowBlur = 4;
                    ctx.shadowOffsetX = 1;
                    ctx.shadowOffsetY = 1;
                    ctx.fillStyle = COLORS.GREEN;
                    ctx.font = `bold ${cardW * 0.05}px Poppins`;
                    ctx.textAlign = 'left';
                    ctx.fillText('•', x + 20, benefitItemY);
                    ctx.restore();

                    // Texto del beneficio con mejor legibilidad
                    ctx.save();
                    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
                    ctx.shadowBlur = 4;
                    ctx.shadowOffsetX = 1;
                    ctx.shadowOffsetY = 1;
                    ctx.fillStyle = COLORS.WHITE; // Cambio a blanco para mejor legibilidad
                    ctx.font = `normal ${cardW * 0.032}px Poppins`;
                    ctx.textAlign = 'left';
                    ctx.textBaseline = 'top'; // Asegura baseline consistente
                    // Texto que se envuelve dentro del ancho de la tarjeta con mejor espaciado
                    wrapText(benefit, x + 35, benefitItemY - 5, cardW - 50, cardW * 0.045);
                    ctx.restore();
                });
                
                // Ajusta la posición para el siguiente elemento - más espacio para el botón de toggle
                benefitsY += 35 + (plan.benefits.length * 35) + 40;
            } else {
                // Si no hay beneficios, ajusta la posición para el botón de toggle
                benefitsY += 40;
            }

            // Botón toggle para activar/desactivar la suscripción - posición fija en la parte inferior de la tarjeta
            const toggleY = y + cardH - 90; // Posición fija desde la parte inferior de la tarjeta
            const toggleW = cardW * 0.4;     // 40% del ancho de la tarjeta
            const toggleH = 35;              // Altura fija
            const toggleX = x + (cardW - toggleW) / 2; // Centrado horizontalmente
            const toggleId = `toggle_${plan.id}`;
            const toggleHovered = appState.hoveredElement?.id === toggleId;
            
            // Dibuja el switch con mejor diseño
            ctx.save();
            const toggleBg = plan.active ? COLORS.GREEN : '#e0e0e0'; // Verde si activo, gris si no
            ctx.fillStyle = toggleBg;
            ctx.shadowColor = 'rgba(0,0,0,0.1)';
            ctx.shadowBlur = 5;
            ctx.shadowOffsetY = 2;
            drawRoundedRect(toggleX, toggleY, toggleW, toggleH, toggleH/2); // Fondo redondeado
            
            // Círculo que se mueve dentro del switch
            const circleRadius = (toggleH - 8) / 2;
            const circleX = plan.active ? toggleX + toggleW - circleRadius - 4 : toggleX + circleRadius + 4; // Se mueve según el estado
            const circleY = toggleY + toggleH/2;
            
            // Dibuja el círculo blanco
            ctx.fillStyle = COLORS.WHITE;
            ctx.shadowBlur = 8;
            ctx.shadowOffsetY = 3;
            ctx.beginPath();
            ctx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2);
            ctx.fill();
            
            // Borde amarillo cuando está hover
            if (toggleHovered) {
                ctx.strokeStyle = COLORS.YELLOW;
                ctx.lineWidth = 3;
                ctx.stroke();
            }
            ctx.restore();

            // Registra el área del toggle para interactividad
            addInteractiveElement(toggleId, toggleX, toggleY, toggleW, toggleH, () => toggleSubscription(category.id, plan.id));
            
            // Texto que indica el estado de la suscripción - con mejor legibilidad
            const statusY = toggleY + toggleH + 25;
            ctx.save();
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowBlur = 4;
            ctx.shadowOffsetX = 1;
            ctx.shadowOffsetY = 1;
            ctx.fillStyle = plan.active ? COLORS.GREEN : COLORS.WHITE; // Verde si activo, blanco si no
            ctx.font = `bold ${cardW * 0.045}px Poppins`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            const subscriptionText = plan.active ? '✓ SUSCRIPCIÓN ACTIVA' : 'Activar suscripción';
            ctx.fillText(subscriptionText, x + cardW / 2, statusY);
            ctx.restore();
        });

        // Botón "Beneficios Extras" - posición fija en la parte inferior
        const hasActiveSubscription = currentPlans.some(plan => plan.active);
        if (hasActiveSubscription) {
            const extraBtnW = Math.min(width * 0.4, 280);
            const extraBtnH = 50;
            const extraBtnX = (width - extraBtnW) / 2;
            const extraBtnY = height - 80; // Posición fija en la parte inferior
            const extraBtnId = 'btn_extra_benefits';
            const extraBtnHovered = appState.hoveredElement?.id === extraBtnId;
            
            // Botón con gradiente y sombra
            ctx.save();
            ctx.shadowColor = 'rgba(0,0,0,0.25)';
            ctx.shadowBlur = 15;
            ctx.shadowOffsetY = 8;
            
            const extraBtnGradient = ctx.createLinearGradient(extraBtnX, extraBtnY, extraBtnX, extraBtnY + extraBtnH);
            extraBtnGradient.addColorStop(0, extraBtnHovered ? COLORS.YELLOW : '#FFB800');
            extraBtnGradient.addColorStop(1, extraBtnHovered ? '#E6A500' : COLORS.YELLOW);
            ctx.fillStyle = extraBtnGradient;
            drawRoundedRect(extraBtnX, extraBtnY, extraBtnW, extraBtnH, 25);
            
            // Borde sutil
            if (extraBtnHovered) {
                ctx.strokeStyle = COLORS.GREEN;
                ctx.lineWidth = 2;
                ctx.stroke();
            }
            ctx.restore();
            
            // Texto del botón
            ctx.save();
            ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
            ctx.shadowBlur = 3;
            ctx.shadowOffsetX = 1;
            ctx.shadowOffsetY = 1;
            ctx.fillStyle = COLORS.TEXT_DARK;
            ctx.font = `bold ${extraBtnW * 0.06}px Poppins`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('Beneficios Extras', extraBtnX + extraBtnW/2, extraBtnY + extraBtnH/2);
            ctx.restore();
            
            // Registra el área del botón para interactividad
            addInteractiveElement(extraBtnId, extraBtnX, extraBtnY, extraBtnW, extraBtnH, () => showExtraBenefitsModal());
        }

        ctx.restore(); // Restaura la configuración inicial
    }

    function drawBenefits(categoryId, plan, cardX, startY, cardWidth) {
        ctx.textAlign = 'left';
        ctx.font = `bold ${cardWidth * 0.05}px Poppins`;
        ctx.fillStyle = COLORS.TEXT_DARK;
        ctx.fillText('Beneficios Incluidos:', cardX + 20, startY);

        plan.benefits.forEach((benefit, index) => {
            const y = startY + 30 + (index * 40);
            
            // Texto del beneficio
            ctx.font = `normal ${cardWidth * 0.045}px Poppins`;
            ctx.fillStyle = benefit.active ? COLORS.TEXT_DARK : COLORS.TEXT_LIGHT;
            ctx.fillText(benefit.name, cardX + 20, y + 8);

            // Toggle del beneficio
            const toggleW = 40, toggleH = 20;
            const toggleX = cardX + cardWidth - toggleW - 20;
            const toggleId = `toggle_benefit_${plan.id}_${index}`;
            const toggleHovered = appState.hoveredElement?.id === toggleId;

            drawRoundedRect(toggleX, y, toggleW, toggleH, 10, benefit.active ? COLORS.GREEN : '#cccccc');
            const circleX = benefit.active ? toggleX + toggleW - 12 : toggleX + 12;
            ctx.fillStyle = COLORS.WHITE;
            ctx.beginPath();
            ctx.arc(circleX - 2, y + 10, 8, 0, Math.PI * 2);
            ctx.fill();
            if (toggleHovered) { ctx.strokeStyle = COLORS.YELLOW; ctx.lineWidth = 2; ctx.stroke(); }
            
            addInteractiveElement(toggleId, toggleX, y, toggleW, toggleH, () => toggleBenefit(categoryId, plan.id, index));
        });
    }

    function drawModal() {
        if (!appState.modal.isOpen) return;
        const { width, height } = canvas.getBoundingClientRect();
        ctx.fillStyle = COLORS.MODAL_OVERLAY;
        ctx.fillRect(0, 0, width, height);

        const modalW = Math.min(width * 0.8, 600), modalH = Math.min(height * 0.8, 500);
        const modalX = (width - modalW) / 2, modalY = (height - modalH) / 2;
        drawRoundedRect(modalX, modalY, modalW, modalH, 20, COLORS.WHITE);

        ctx.fillStyle = COLORS.TEXT_DARK; ctx.font = `bold 24px Poppins`; ctx.textAlign = 'left'; ctx.textBaseline = 'top';
        ctx.fillText(appState.modal.title, modalX + 30, modalY + 30);
        
        const closeBtnSize = 20, closeBtnX = modalX + modalW - 30 - closeBtnSize, closeBtnY = modalY + 30;
        const closeHovered = appState.hoveredElement?.id === 'btn_modal_close';
        drawIcon('close', closeBtnX, closeBtnY, closeBtnSize, closeHovered ? COLORS.GREEN : COLORS.TEXT_DARK);
        addInteractiveElement('btn_modal_close', closeBtnX, closeBtnY, closeBtnSize, closeBtnSize, closeModal);

        const contentAreaX = modalX + 30, contentAreaY = modalY + 80;
        const contentAreaHeight = modalH - 160, contentAreaWidth = modalW - 60;

        // Si es el modal de beneficios extras, dibuja los beneficios con checkboxes
        if (appState.modal.type === 'extra_benefits') {
            let currentY = contentAreaY + 20;
            
            // Determinar qué categoría de beneficios mostrar basándose en planes activos
            const activeTransportPlans = getActiveTransportPlans();
            const activeTechPlans = getActiveTechnologyPlans();
            
            let benefitsCategory = 'tecnologia'; // Por defecto tecnología
            let categoryLabel = 'Tecnología';
            
            // Si hay planes de transporte activos, mostrar beneficios de transporte
            if (activeTransportPlans.length > 0) {
                benefitsCategory = 'transporte';
                categoryLabel = 'Transporte';
            }
            
            const extraBenefitsList = appState.extraBenefits[benefitsCategory];
            const maxBenefits = benefitsCategory === 'transporte' ? 
                               getMaxExtraBenefits(activeTransportPlans) : 
                               getMaxExtraBenefits(activeTechPlans);
            const currentActiveBenefits = extraBenefitsList.filter(benefit => benefit.active).length;
            
            // Mostrar información de restricción en la parte superior
            if (maxBenefits > 0) {
                ctx.save();
                ctx.fillStyle = COLORS.GRAY_LIGHT;
                drawRoundedRect(contentAreaX, currentY, contentAreaWidth, 80, 10);
                
                ctx.fillStyle = COLORS.TEXT_DARK;
                ctx.font = `bold 14px Poppins`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                
                const planLevel = maxBenefits === 1 ? 'Esencial' : 
                                 maxBenefits === 2 ? 'Plus' : 'Premium';
                
                ctx.fillText(`Plan ${planLevel} de ${categoryLabel}: ${currentActiveBenefits}/${maxBenefits} beneficios activos`, 
                           contentAreaX + contentAreaWidth/2, currentY + 15);
                
                ctx.font = `normal 12px Poppins`;
                ctx.fillStyle = COLORS.TEXT_LIGHT;
                ctx.fillText('Puedes activar hasta ' + maxBenefits + ' beneficio' + (maxBenefits > 1 ? 's' : '') + ' con tu plan actual', 
                           contentAreaX + contentAreaWidth/2, currentY + 35);
                
                ctx.fillStyle = COLORS.GREEN;
                ctx.font = `bold 12px Poppins`;
                ctx.fillText(`Beneficios exclusivos de ${categoryLabel}`, 
                           contentAreaX + contentAreaWidth/2, currentY + 55);
                
                ctx.restore();
                currentY += 100;
            } else {
                // No hay planes activos
                ctx.save();
                ctx.fillStyle = 'rgba(255, 193, 7, 0.1)';
                drawRoundedRect(contentAreaX, currentY, contentAreaWidth, 50, 10);
                
                ctx.fillStyle = COLORS.TEXT_DARK;
                ctx.font = `bold 14px Poppins`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('Activa un plan para acceder a beneficios extras', 
                           contentAreaX + contentAreaWidth/2, currentY + 25);
                
                ctx.restore();
                currentY += 70;
            }
            
            extraBenefitsList.forEach((benefit, index) => {
                const benefitItemY = currentY;
                const benefitContainerH = 50;
                const isRestricted = maxBenefits === 0 || (!benefit.active && currentActiveBenefits >= maxBenefits);
                
                // Contenedor del beneficio
                ctx.save();
                if (isRestricted) {
                    ctx.fillStyle = 'rgba(200, 200, 200, 0.3)';
                } else {
                    ctx.fillStyle = benefit.active ? 'rgba(8, 110, 69, 0.1)' : COLORS.GRAY_LIGHT;
                }
                drawRoundedRect(contentAreaX, benefitItemY, contentAreaWidth, benefitContainerH, 10);
                
                // Checkbox
                const checkboxSize = 20;
                const checkboxX = contentAreaX + 15;
                const checkboxY = benefitItemY + (benefitContainerH - checkboxSize) / 2;
                
                if (isRestricted) {
                    ctx.fillStyle = 'rgba(200, 200, 200, 0.5)';
                    ctx.strokeStyle = 'rgba(200, 200, 200, 0.7)';
                } else {
                    ctx.fillStyle = benefit.active ? COLORS.GREEN : COLORS.WHITE;
                    ctx.strokeStyle = benefit.active ? COLORS.GREEN : COLORS.TEXT_LIGHT;
                }
                ctx.lineWidth = 2;
                drawRoundedRect(checkboxX, checkboxY, checkboxSize, checkboxSize, 4);
                ctx.stroke();
                
                // Check mark si está activo
                if (benefit.active && !isRestricted) {
                    ctx.strokeStyle = COLORS.WHITE;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(checkboxX + 5, checkboxY + 10);
                    ctx.lineTo(checkboxX + 9, checkboxY + 14);
                    ctx.lineTo(checkboxX + 15, checkboxY + 6);
                    ctx.stroke();
                }
                
                // Icono de bloqueo si está restringido
                if (isRestricted && !benefit.active) {
                    ctx.fillStyle = 'rgba(150, 150, 150, 0.8)';
                    ctx.font = `12px Arial`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText('🔒', checkboxX + checkboxSize/2, checkboxY + checkboxSize/2);
                }
                
                // Texto del beneficio
                ctx.fillStyle = isRestricted ? 'rgba(100, 100, 100, 0.6)' : COLORS.TEXT_DARK;
                ctx.font = `normal 14px Poppins`;
                ctx.textAlign = 'left';
                ctx.textBaseline = 'top';
                wrapText(benefit.name, checkboxX + checkboxSize + 15, benefitItemY + 10, contentAreaWidth - checkboxSize - 45, 18);
                
                ctx.restore();
                
                // Registra el área para interactividad solo si no está restringido
                if (!isRestricted) {
                    const benefitId = `extra_benefit_${index}`;
                    addInteractiveElement(benefitId, contentAreaX, benefitItemY, contentAreaWidth, benefitContainerH, () => toggleExtraBenefit(index));
                }
                
                currentY += benefitContainerH + 15;
            });
        } else if (appState.modal.type === 'single_plan_warning') {
            // Modal de advertencia para plan único
            ctx.save();
            
            // Icono de advertencia
            ctx.font = `48px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillStyle = COLORS.TEXT_DARK;
            ctx.fillText('⚠️', modalX + modalW / 2, contentAreaY + 30);
            
            // Mensaje principal
            ctx.font = `18px Poppins`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillStyle = COLORS.TEXT_DARK;
            ctx.fillText('Usted cuenta con un plan activo.', modalX + modalW / 2, contentAreaY + 100);
            ctx.fillText('Desactívelo para activar otro.', modalX + modalW / 2, contentAreaY + 130);
            
            // Botón de entendido
            const okBtnW = 120;
            const okBtnH = 40;
            const okBtnX = modalX + (modalW - okBtnW) / 2;
            const okBtnY = contentAreaY + 180;
            const okBtnHovered = appState.hoveredElement?.id === 'btn_warning_ok';
            
            ctx.fillStyle = okBtnHovered ? COLORS.GREEN_DARK : COLORS.GREEN;
            drawRoundedRect(okBtnX, okBtnY, okBtnW, okBtnH, 20);
            
            ctx.fillStyle = COLORS.WHITE;
            ctx.font = `bold 16px Poppins`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('Entendido', okBtnX + okBtnW/2, okBtnY + okBtnH/2);
            
            addInteractiveElement('btn_warning_ok', okBtnX, okBtnY, okBtnW, okBtnH, closeModal);
            
            ctx.restore();
        } else if (appState.modal.type === 'benefit_restriction') {
            // Modal de restricción de beneficios extras
            ctx.save();
            
            // Icono de información
            ctx.font = `48px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillStyle = COLORS.TEXT_DARK;
            ctx.fillText('ℹ️', modalX + modalW / 2, contentAreaY + 20);
            
            // Mensaje principal
            ctx.font = `16px Poppins`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillStyle = COLORS.TEXT_DARK;
            
            const planLevel = appState.modal.maxBenefits === 1 ? 'Esencial' : 
                             appState.modal.maxBenefits === 2 ? 'Plus' : 'Premium';
            
            ctx.fillText(`Tu plan ${planLevel} te permite activar`, modalX + modalW / 2, contentAreaY + 90);
            ctx.fillText(`máximo ${appState.modal.maxBenefits} beneficio${appState.modal.maxBenefits > 1 ? 's' : ''} extra${appState.modal.maxBenefits > 1 ? 's' : ''}.`, modalX + modalW / 2, contentAreaY + 115);
            
            ctx.font = `14px Poppins`;
            ctx.fillStyle = COLORS.TEXT_LIGHT;
            ctx.fillText('Desactiva uno para activar otro o mejora tu plan.', modalX + modalW / 2, contentAreaY + 150);
            
            // Botón de entendido
            const okBtnW = 120;
            const okBtnH = 40;
            const okBtnX = modalX + (modalW - okBtnW) / 2;
            const okBtnY = contentAreaY + 190;
            const okBtnHovered = appState.hoveredElement?.id === 'btn_restriction_ok';
            
            ctx.fillStyle = okBtnHovered ? COLORS.GREEN_DARK : COLORS.GREEN;
            drawRoundedRect(okBtnX, okBtnY, okBtnW, okBtnH, 20);
            
            ctx.fillStyle = COLORS.WHITE;
            ctx.font = `bold 16px Poppins`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('Entendido', okBtnX + okBtnW/2, okBtnY + okBtnH/2);
            
            addInteractiveElement('btn_restriction_ok', okBtnX, okBtnY, okBtnW, okBtnH, closeModal);
            
            ctx.restore();
        } else {
            // Modal de chat normal
            ctx.save();
            ctx.beginPath(); ctx.rect(contentAreaX, contentAreaY, contentAreaWidth, contentAreaHeight); ctx.clip();
            ctx.translate(0, -appState.modal.scrollOffset);

            let currentY = contentAreaY;
            appState.modal.totalChatHeight = 0;

            appState.modal.chatHistory.forEach(msg => {
                const isUser = msg.role === 'user';
                ctx.font = `16px Poppins`;
                const textHeight = getTextHeight(msg.parts[0].text, contentAreaWidth - 40, 20);
                
                if (isUser) {
                    drawRoundedRect(contentAreaX + 10, currentY, contentAreaWidth - 20, textHeight + 20, 10, COLORS.GRAY_LIGHT);
                    ctx.fillStyle = COLORS.TEXT_DARK;
                    wrapText(msg.parts[0].text, contentAreaX + 20, currentY + 10, contentAreaWidth - 40, 20);
                } else {
                    drawRoundedRect(contentAreaX + 10, currentY, contentAreaWidth - 20, textHeight + 20, 10, 'rgba(1, 109, 57, 0.1)');
                    ctx.fillStyle = COLORS.TEXT_DARK;
                    wrapText(msg.parts[0].text, contentAreaX + 20, currentY + 10, contentAreaWidth - 40, 20);
                }
                currentY += textHeight + 30;
                appState.modal.totalChatHeight += textHeight + 30;
            });

            if (appState.modal.isLoading) {
                ctx.font = `18px Poppins`; ctx.textAlign = 'center'; ctx.fillStyle = COLORS.TEXT_LIGHT;
                ctx.fillText('Pensando... 🧠', modalX + modalW / 2, currentY + 20);
                appState.modal.totalChatHeight += 40;
            }
            
            ctx.restore();

            if (appState.modal.totalChatHeight > contentAreaHeight) {
                const scrollbarWidth = 8, scrollbarX = modalX + modalW - 30, scrollbarTrackHeight = contentAreaHeight;
                drawRoundedRect(scrollbarX, contentAreaY, scrollbarWidth, scrollbarTrackHeight, 4, COLORS.GRAY_LIGHT);
                const handleHeight = Math.max(20, (contentAreaHeight / appState.modal.totalChatHeight) * scrollbarTrackHeight);
                const handleY = contentAreaY + (appState.modal.scrollOffset / (appState.modal.totalChatHeight - contentAreaHeight)) * (scrollbarTrackHeight - handleHeight);
                drawRoundedRect(scrollbarX, handleY, scrollbarWidth, handleHeight, 4, COLORS.GREEN);
            }
        }
    }

    // Esta función dibuja las opciones de transporte: patineta, bicicleta y vehículos eléctricos
    function drawTransportOptions() {
        const { width, height } = canvas.getBoundingClientRect();
        
        // Aquí definimos las tres opciones de transporte disponibles
        const transportOptions = [
            { 
                id: 'patineta', 
                name: 'Patineta Eléctrica',
                icon: null,  
                description: 'Para que el único rollo sea el tráfico. Muévete tranquilo, nosotros te cubrimos.'
            },
            { 
                id: 'bicicleta', 
                name: 'Bicicleta',
                icon: null,
                description: 'Tu bici, tu libertad. La respaldamos para que solo pienses en el camino.'
            },
            { 
                id: 'motos', 
                name: 'Motos',
                icon: null,
                description: 'El futuro es eléctrico. Acelera con la confianza de estar 100% cubierto.'
            }
        ];

        // Responsive sizing optimizado
        let optionWidth, optionHeight, optionGap, totalWidth, startX, startY;
        
        if (width < 768) { // Mobile
            optionWidth = Math.min(width * 0.9, 380);
            optionHeight = 550;
            optionGap = 30;
            startX = (width - optionWidth) / 2;
            startY = 200; // Más abajo para dar espacio al texto descriptivo
        } else { // Desktop
            optionWidth = Math.min(width * 0.28, 320);
            optionHeight = 480;
            optionGap = width * 0.03;
            totalWidth = transportOptions.length * optionWidth + (transportOptions.length - 1) * optionGap;
            startX = (width - totalWidth) / 2;
            startY = 200; // Más abajo para dar espacio al texto descriptivo
        }

        transportOptions.forEach((option, index) => {
            // Calcular posición responsiva
            let x, y;
            if (width < 768) {
                x = startX;
                y = startY + index * (optionHeight + optionGap);
            } else {
                x = startX + index * (optionWidth + optionGap);
                y = startY;
            }

            // Card principal con efecto de vidrio transparente
            ctx.save();
            ctx.shadowColor = 'rgba(0,0,0,0.25)';
            ctx.shadowBlur = 30;
            ctx.shadowOffsetY = 12;
            
            // Fondo transparente con efecto glassmorphism
            const optionGradient = ctx.createLinearGradient(x, y, x, y + optionHeight);
            optionGradient.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
            optionGradient.addColorStop(1, 'rgba(255, 255, 255, 0.15)');
            drawRoundedRect(x, y, optionWidth, optionHeight, 20, optionGradient);
            
            // Borde sutil
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.roundRect(x, y, optionWidth, optionHeight, 20);
            ctx.stroke();
            ctx.restore();

            // Área de imagen optimizada (60% de la altura)
            const imageAreaHeight = optionHeight * 0.6;
            const imageX = x + 15;
            const imageY = y + 15;
            const imageWidth = optionWidth - 30;
            const imageHeight = imageAreaHeight - 15;

            // Contenedor de imagen con bordes redondeados
            ctx.save();
            ctx.beginPath();
            ctx.roundRect(imageX, imageY, imageWidth, imageHeight, 15);
            ctx.clip();
            
            // Dibujar imagen si está disponible
            const image = transportImages[option.id];
            if (image && image.complete && image.width > 0) {
                // Calcular dimensiones manteniendo aspecto
                const aspectRatio = image.width / image.height;
                let drawWidth = imageWidth - 10;  // Menos padding para que la imagen sea más grande
                let drawHeight = imageHeight - 10; // Menos padding para que la imagen sea más grande
                let drawX = imageX + 5;            // Centrado con menos margen
                let drawY = imageY + 5;            // Centrado con menos margen

                if (aspectRatio > drawWidth / drawHeight) {
                    drawHeight = drawWidth / aspectRatio;
                    drawY = imageY + (imageHeight - drawHeight) / 2;
                } else {
                    drawWidth = drawHeight * aspectRatio;
                    drawX = imageX + (imageWidth - drawWidth) / 2;
                }

                try {
                    ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
                } catch (error) {
                    // Fallback a ícono
                    ctx.fillStyle = COLORS.GREEN;
                    ctx.font = `${optionWidth * 0.2}px Arial`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(option.icon, imageX + imageWidth / 2, imageY + imageHeight / 2);
                }
            } else {
                // Ícono centrado con estilo mejorado
                ctx.fillStyle = COLORS.GREEN;
                ctx.font = `${optionWidth * 0.2}px Arial`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(option.icon, imageX + imageWidth / 2, imageY + imageHeight / 2);
            }
            
            ctx.restore();

            // Sección de contenido de texto (40% inferior)
            const contentY = y + imageAreaHeight + 10;
            const contentHeight = optionHeight - imageAreaHeight - 10;

            // Título centrado y destacado
            // Título centrado y destacado con sombra
            ctx.save();
            ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
            ctx.shadowBlur = 6;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
            ctx.fillStyle = COLORS.WHITE;
            ctx.font = `bold ${optionWidth * 0.055}px Poppins`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText(option.name, x + optionWidth / 2, contentY + 10);
            ctx.restore();

            // Descripción centrada con mejor espaciado y sombra
            ctx.save();
            ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
            ctx.shadowBlur = 4;
            ctx.shadowOffsetX = 1;
            ctx.shadowOffsetY = 1;
            ctx.fillStyle = COLORS.WHITE;
            ctx.font = `normal ${optionWidth * 0.04}px Poppins`;
            ctx.textAlign = 'left'; // Cambio a left para que funcione con wrapText
            ctx.textBaseline = 'top'; // Asegura baseline consistente
            const descY = contentY + 40;
            
            // Texto multilínea con margen lateral para centrarlo visualmente
            wrapText(option.description, x + 20, descY, optionWidth - 40, optionWidth * 0.055);
            ctx.restore();

            // Botón de selección mejorado
            const btnW = optionWidth * 0.7;
            const btnH = 45;
            const btnX = x + (optionWidth - btnW) / 2;
            const btnY = y + optionHeight - btnH - 15;
            const btnHovered = appState.hoveredElement?.id === `btn_select_${option.id}`;
            
            // Botón con gradiente y sombra
            ctx.save();
            const btnGradient = ctx.createLinearGradient(btnX, btnY, btnX, btnY + btnH);
            btnGradient.addColorStop(0, btnHovered ? COLORS.GREEN_DARK : COLORS.GREEN);
            btnGradient.addColorStop(1, btnHovered ? '#064a30' : COLORS.GREEN_DARK);
            ctx.fillStyle = btnGradient;
            ctx.shadowColor = 'rgba(0,0,0,0.2)';
            ctx.shadowBlur = 8;
            ctx.shadowOffsetY = 3;
            drawRoundedRect(btnX, btnY, btnW, btnH, 22);
            ctx.restore();
            
            // Texto del botón
            ctx.fillStyle = COLORS.WHITE;
            ctx.font = `bold ${optionWidth * 0.045}px Poppins`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('Seleccionar', btnX + btnW/2, btnY + btnH/2);

            // Efecto hover para toda la tarjeta
            const isHovered = appState.hoveredElement?.id === `transport_${option.id}`;
            if (isHovered) {
                ctx.save();
                ctx.strokeStyle = COLORS.GREEN;
                ctx.lineWidth = 3;
                ctx.setLineDash([]);
                ctx.beginPath();
                ctx.roundRect(x - 2, y - 2, optionWidth + 4, optionHeight + 4, 22);
                ctx.stroke();
                ctx.restore();
            }

            // Interactividad mejorada
            addInteractiveElement(`transport_${option.id}`, x, y, optionWidth, optionHeight, () => {
                appState.selectedTransport = option.id;
                draw();
            });
            
            addInteractiveElement(`btn_select_${option.id}`, btnX, btnY, btnW, btnH, () => {
                appState.selectedTransport = option.id;
                draw();
            });
        });
    }

    // Esta función dibuja las opciones de tecnología: celular, portátil/tablet y audífonos
    function drawTechnologyOptions() {
        const { width, height } = canvas.getBoundingClientRect();
        
        // Aquí definimos las tres opciones de tecnología disponibles
        const technologyOptions = [
            { 
                id: 'celular', 
                name: 'Celular',
                icon: '📱',
                description: 'Tu compañero diario merece la mejor protección. Cobertura completa para tu smartphone.'
            },
            { 
                id: 'portatil', 
                name: 'Portátil / Tablet',
                icon: '💻',
                description: 'Protege tu estación de trabajo móvil. Ideal para profesionales y estudiantes.'
            },
            { 
                id: 'gadgets', 
                name: 'Gadgets',
                icon: '🎧',
                description: 'Cuida tus audífonos premium y dispositivos de audio con cobertura especializada.'
            }
        ];

        // Responsive sizing optimizado
        let optionWidth, optionHeight, optionGap, totalWidth, startX, startY;
        
        if (width < 768) { // Mobile
            optionWidth = Math.min(width * 0.9, 380);
            optionHeight = 550;
            optionGap = 30;
            startX = (width - optionWidth) / 2;
            startY = 200; // Más abajo para dar espacio al texto descriptivo
        } else { // Desktop
            optionWidth = Math.min(width * 0.22, 280);
            optionHeight = 480;
            optionGap = width * 0.02;
            totalWidth = technologyOptions.length * optionWidth + (technologyOptions.length - 1) * optionGap;
            startX = (width - totalWidth) / 2;
            startY = 200; // Más abajo para dar espacio al texto descriptivo
        }

        technologyOptions.forEach((option, index) => {
            // Calcular posición responsiva
            let x, y;
            if (width < 768) {
                x = startX;
                y = startY + index * (optionHeight + optionGap);
            } else {
                x = startX + index * (optionWidth + optionGap);
                y = startY;
            }

            // Card principal con efecto de vidrio transparente
            ctx.save();
            ctx.shadowColor = 'rgba(0,0,0,0.25)';
            ctx.shadowBlur = 30;
            ctx.shadowOffsetY = 12;
            
            // Fondo transparente con efecto glassmorphism
            const optionGradient = ctx.createLinearGradient(x, y, x, y + optionHeight);
            optionGradient.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
            optionGradient.addColorStop(1, 'rgba(255, 255, 255, 0.15)');
            drawRoundedRect(x, y, optionWidth, optionHeight, 20, optionGradient);
            
            // Borde sutil
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.roundRect(x, y, optionWidth, optionHeight, 20);
            ctx.stroke();
            ctx.restore();

            // Área de imagen optimizada con formato 1x1 (cuadrado)
            const imageSize = Math.min(optionWidth - 30, (optionHeight * 0.6) - 30); // Tamaño cuadrado basado en el menor de ancho o altura disponible
            const imageX = x + (optionWidth - imageSize) / 2; // Centrado horizontalmente
            const imageY = y + 15; // Posición vertical desde arriba

            // Contenedor de imagen con bordes redondeados - formato 1x1
            ctx.save();
            ctx.beginPath();
            ctx.roundRect(imageX, imageY, imageSize, imageSize, 15); // Imagen cuadrada
            ctx.clip();
            
            // Dibujar imagen si está disponible - formato 1x1 garantizado
            const image = technologyImages[option.id];
            if (image && image.complete && image.width > 0) {
                // Para garantizar formato 1x1, la imagen se ajusta al cuadrado sin distorsión
                const aspectRatio = image.width / image.height;
                let drawWidth, drawHeight, drawX, drawY;

                if (aspectRatio > 1) {
                    // Imagen más ancha: ajustar por altura para formato 1x1
                    drawHeight = imageSize;
                    drawWidth = imageSize; // Forzamos cuadrado
                    drawX = imageX;
                    drawY = imageY;
                } else {
                    // Imagen más alta: ajustar por ancho para formato 1x1
                    drawWidth = imageSize;
                    drawHeight = imageSize; // Forzamos cuadrado
                    drawX = imageX;
                    drawY = imageY;
                }

                try {
                    ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
                } catch (error) {
                    // Fallback a ícono
                    ctx.fillStyle = COLORS.GREEN;
                    ctx.font = `${optionWidth * 0.15}px Arial`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(option.icon, imageX + imageSize / 2, imageY + imageSize / 2);
                }
            } else {
                // Ícono centrado con estilo mejorado en formato 1x1
                ctx.fillStyle = COLORS.GREEN;
                ctx.font = `${optionWidth * 0.15}px Arial`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(option.icon, imageX + imageSize / 2, imageY + imageSize / 2);
            }
            
            ctx.restore();

            // Sección de contenido de texto ajustada para el nuevo layout
            const contentY = imageY + imageSize + 20;

            // Título centrado y destacado con sombra
            ctx.save();
            ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
            ctx.shadowBlur = 6;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
            ctx.fillStyle = COLORS.WHITE;
            ctx.font = `bold ${optionWidth * 0.05}px Poppins`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText(option.name, x + optionWidth / 2, contentY + 10);
            ctx.restore();

            // Descripción centrada con mejor espaciado y sombra
            ctx.save();
            ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
            ctx.shadowBlur = 4;
            ctx.shadowOffsetX = 1;
            ctx.shadowOffsetY = 1;
            ctx.fillStyle = COLORS.WHITE;
            ctx.font = `normal ${optionWidth * 0.035}px Poppins`;
            ctx.textAlign = 'left'; // Cambio a left para que funcione con wrapText
            ctx.textBaseline = 'top'; // Asegura baseline consistente
            const descY = contentY + 35;
            
            // Texto multilínea con margen lateral para centrarlo visualmente
            wrapText(option.description, x + 15, descY, optionWidth - 30, optionWidth * 0.045);
            ctx.restore();

            // Botón de selección mejorado
            const btnW = optionWidth * 0.8;
            const btnH = 40;
            const btnX = x + (optionWidth - btnW) / 2;
            const btnY = y + optionHeight - btnH - 15;
            const btnHovered = appState.hoveredElement?.id === `btn_select_tech_${option.id}`;
            
            // Botón con gradiente y sombra
            ctx.save();
            const btnGradient = ctx.createLinearGradient(btnX, btnY, btnX, btnY + btnH);
            btnGradient.addColorStop(0, btnHovered ? COLORS.GREEN_DARK : COLORS.GREEN);
            btnGradient.addColorStop(1, btnHovered ? '#064a30' : COLORS.GREEN_DARK);
            ctx.fillStyle = btnGradient;
            ctx.shadowColor = 'rgba(0,0,0,0.2)';
            ctx.shadowBlur = 8;
            ctx.shadowOffsetY = 3;
            drawRoundedRect(btnX, btnY, btnW, btnH, 20);
            ctx.restore();
            
            // Texto del botón
            ctx.fillStyle = COLORS.WHITE;
            ctx.font = `bold ${optionWidth * 0.04}px Poppins`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('Seleccionar', btnX + btnW/2, btnY + btnH/2);

            // Efecto hover para toda la tarjeta
            const isHovered = appState.hoveredElement?.id === `technology_${option.id}`;
            if (isHovered) {
                ctx.save();
                ctx.strokeStyle = COLORS.GREEN;
                ctx.lineWidth = 3;
                ctx.setLineDash([]);
                ctx.beginPath();
                ctx.roundRect(x - 2, y - 2, optionWidth + 4, optionHeight + 4, 22);
                ctx.stroke();
                ctx.restore();
            }

            // Interactividad mejorada
            addInteractiveElement(`technology_${option.id}`, x, y, optionWidth, optionHeight, () => {
                appState.selectedTechnology = option.id;
                draw();
            });
            
            addInteractiveElement(`btn_select_tech_${option.id}`, btnX, btnY, btnW, btnH, () => {
                appState.selectedTechnology = option.id;
                draw();
            });
        });
    }

    // Función para obtener todos los seguros activos
    function getAllActiveInsurances() {
        let activeInsurances = [];
        
        // Revisar seguros de todas las categorías
        data.categories.forEach(category => {
            if (category.id === 'transporte') {
                // Revisar seguros de transporte por cada tipo (nueva estructura)
                if (category.options) {
                    Object.keys(category.options).forEach(optionKey => {
                        const option = category.options[optionKey];
                        option.plans.forEach(plan => {
                            if (plan.active) {
                                activeInsurances.push({
                                    category: category.title,
                                    subcategory: option.title,
                                    plan: plan.name,
                                    price: plan.price,
                                    coverage: plan.coverage,
                                    id: plan.id
                                });
                            }
                        });
                    });
                } else if (category.plans) {
                    // Fallback para estructura antigua (por compatibilidad)
                    category.plans.forEach(plan => {
                        if (plan.active) {
                            activeInsurances.push({
                                category: category.title,
                                subcategory: 'General',
                                plan: plan.name,
                                price: plan.price,
                                coverage: plan.coverage,
                                id: plan.id
                            });
                        }
                    });
                }
            } else if (category.id === 'tecnologia') {
                // Revisar seguros de tecnología por cada tipo
                Object.keys(category.options).forEach(optionKey => {
                    const option = category.options[optionKey];
                    option.plans.forEach(plan => {
                        if (plan.active) {
                            activeInsurances.push({
                                category: category.title,
                                subcategory: option.title,
                                plan: plan.name,
                                price: plan.price,
                                coverage: plan.coverage,
                                id: plan.id
                            });
                        }
                    });
                });
            }
        });
        
        return activeInsurances;
    }

    // Función para dibujar la pantalla "Mis Seguros"
    function drawMyInsurances(opacity = 1) {
        ctx.save();
        ctx.globalAlpha = opacity;
        const { width, height } = canvas.getBoundingClientRect();
        
        // Título principal
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
        ctx.shadowBlur = 6;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.textAlign = 'center';
        ctx.fillStyle = COLORS.WHITE;
        ctx.font = `bold 36px Poppins`;
        ctx.fillText('Mis Seguros Activos', width/2, 60);
        ctx.restore();

        // Botón de "Volver" en la esquina superior derecha
        const backBtnSize = 40;
        const backBtnHovered = appState.hoveredElement?.id === 'btn_back_my_insurances';
        drawRoundedRect(width - backBtnSize - 40, 35, backBtnSize, backBtnSize, 10, backBtnHovered ? COLORS.YELLOW : COLORS.GRAY_LIGHT);
        drawIcon('back', width - backBtnSize - 32, 45, 20, backBtnHovered ? COLORS.TEXT_DARK : COLORS.GREEN);
        addInteractiveElement('btn_back_my_insurances', width - backBtnSize - 40, 35, backBtnSize, backBtnSize, () => {
            startAnimation('my-insurances', 'dashboard');
        });

        // Obtener seguros activos
        const activeInsurances = getAllActiveInsurances();
        
        if (activeInsurances.length === 0) {
            // Mensaje si no hay seguros activos
            ctx.save();
            ctx.fillStyle = COLORS.WHITE;
            ctx.font = `normal 18px Poppins`;
            ctx.textAlign = 'center';
            ctx.fillText('No tienes seguros activos en este momento.', width/2, height/2);
            ctx.restore();
            ctx.restore();
            return;
        }

        // Calcular totales
        const totalMonthly = activeInsurances.reduce((sum, insurance) => sum + insurance.price, 0);
        const hasDiscount = activeInsurances.length > 3;
        const discount = hasDiscount ? totalMonthly * 0.15 : 0;
        const finalTotal = totalMonthly - discount;

        // Configuración responsiva para las tarjetas
        let cardW, cardH, gap, startX, startY;
        
        if (width < 768) { // Móvil
            cardW = Math.min(width * 0.9, 380);
            cardH = 180;
            gap = 20;
            startX = (width - cardW) / 2;
            startY = 120;
        } else { // Desktop
            const cardsPerRow = Math.min(activeInsurances.length, 2);
            cardW = Math.min(width * 0.4, 400);
            cardH = 160;
            gap = width * 0.05;
            const totalW = cardsPerRow * cardW + (cardsPerRow - 1) * gap;
            startX = (width - totalW) / 2;
            startY = 120;
        }

        // Dibujar tarjetas de seguros activos
        activeInsurances.forEach((insurance, index) => {
            let x, y;
            if (width < 768) {
                x = startX;
                y = startY + index * (cardH + gap);
            } else {
                const col = index % 2;
                const row = Math.floor(index / 2);
                x = startX + col * (cardW + gap);
                y = startY + row * (cardH + gap);
            }

            // Tarjeta principal
            ctx.save();
            ctx.shadowColor = 'rgba(0,0,0,0.25)';
            ctx.shadowBlur = 20;
            ctx.shadowOffsetY = 8;
            
            const cardGradient = ctx.createLinearGradient(x, y, x, y + cardH);
            cardGradient.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
            cardGradient.addColorStop(1, 'rgba(255, 255, 255, 0.85)');
            drawRoundedRect(x, y, cardW, cardH, 15, cardGradient);
            
            ctx.strokeStyle = 'rgba(8, 110, 69, 0.3)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(x, y, cardW, cardH, 15);
            ctx.stroke();
            ctx.restore();

            // Badge de "ACTIVO"
            const badgeW = 80;
            const badgeH = 25;
            const badgeX = x + cardW - badgeW - 15;
            const badgeY = y + 15;
            
            ctx.save();
            ctx.fillStyle = COLORS.GREEN;
            drawRoundedRect(badgeX, badgeY, badgeW, badgeH, 12);
            ctx.fillStyle = COLORS.WHITE;
            ctx.font = `bold 12px Poppins`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('ACTIVO', badgeX + badgeW/2, badgeY + badgeH/2);
            ctx.restore();

            // Información del seguro
            ctx.fillStyle = COLORS.TEXT_DARK;
            ctx.font = `bold 16px Poppins`;
            ctx.textAlign = 'left';
            ctx.fillText(`${insurance.category} - ${insurance.subcategory}`, x + 20, y + 35);
            
            ctx.font = `normal 14px Poppins`;
            ctx.fillStyle = COLORS.TEXT_LIGHT;
            ctx.fillText(insurance.plan, x + 20, y + 55);
            
            // Precio
            ctx.fillStyle = COLORS.GREEN;
            ctx.font = `bold 18px Poppins`;
            ctx.fillText(`$${insurance.price.toLocaleString('es-CO')}/mes`, x + 20, y + 85);
            
            // Cobertura (truncada)
            ctx.fillStyle = COLORS.TEXT_LIGHT;
            ctx.font = `normal 12px Poppins`;
            const maxCoverageLength = 60;
            const coverageText = insurance.coverage.length > maxCoverageLength 
                ? insurance.coverage.substring(0, maxCoverageLength) + '...' 
                : insurance.coverage;
            ctx.fillText(coverageText, x + 20, y + 110);
        });

        // Panel de resumen en la parte inferior
        const summaryY = startY + Math.ceil(activeInsurances.length / (width < 768 ? 1 : 2)) * (cardH + gap) + 50;
        const summaryW = Math.min(width * 0.9, 600);
        const summaryH = hasDiscount ? 180 : 140;
        const summaryX = (width - summaryW) / 2;

        // Fondo del resumen
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.3)';
        ctx.shadowBlur = 25;
        ctx.shadowOffsetY = 10;
        
        const summaryGradient = ctx.createLinearGradient(summaryX, summaryY, summaryX, summaryY + summaryH);
        summaryGradient.addColorStop(0, COLORS.GREEN);
        summaryGradient.addColorStop(1, COLORS.GREEN_DARK);
        drawRoundedRect(summaryX, summaryY, summaryW, summaryH, 20, summaryGradient);
        ctx.restore();

        // Contenido del resumen
        ctx.fillStyle = COLORS.WHITE;
        ctx.font = `bold 22px Poppins`;
        ctx.textAlign = 'center';
        ctx.fillText('Resumen de Seguros', summaryX + summaryW/2, summaryY + 35);
        
        let currentY = summaryY + 65;
        
        // Total antes de descuento
        ctx.font = `normal 18px Poppins`;
        ctx.fillText(`Total mensual: $${totalMonthly.toLocaleString('es-CO')}`, summaryX + summaryW/2, currentY);
        currentY += 30;
        
        // Descuento si aplica
        if (hasDiscount) {
            ctx.fillStyle = COLORS.YELLOW;
            ctx.font = `bold 18px Poppins`;
            ctx.fillText(`🎉 Descuento por ${activeInsurances.length} seguros (15%): -$${discount.toLocaleString('es-CO')}`, summaryX + summaryW/2, currentY);
            currentY += 30;
            ctx.fillStyle = COLORS.WHITE;
        }
        
        // Total final
        ctx.font = `bold 24px Poppins`;
        ctx.fillText(`Total final: $${finalTotal.toLocaleString('es-CO')}/mes`, summaryX + summaryW/2, currentY);

        ctx.restore();
    }

    // Función para dibujar la pantalla de métodos de pago
    function drawPaymentMethods(opacity = 1) {
        ctx.save();
        ctx.globalAlpha = opacity;
        const { width, height } = canvas.getBoundingClientRect();
        
        // Título principal con sombra para que se vea sobre el video
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
        ctx.shadowBlur = 6;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.textAlign = 'center';
        ctx.fillStyle = COLORS.WHITE;
        ctx.font = `bold 36px Poppins`;
        ctx.fillText('Medios de Pago', width/2, 60);
        ctx.restore();
        
        // Descripción
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        ctx.font = `normal 16px Poppins`;
        ctx.fillStyle = COLORS.WHITE;
        ctx.textAlign = 'center';
        ctx.fillText('Selecciona tu método de pago preferido y aprovecha beneficios exclusivos', width/2, 90);
        ctx.restore();

        // Botón de "Volver" en la esquina superior derecha
        const backBtnSize = 40;
        const backBtnHovered = appState.hoveredElement?.id === 'btn_back_payment';
        drawRoundedRect(width - backBtnSize - 40, 35, backBtnSize, backBtnSize, 10, backBtnHovered ? COLORS.YELLOW : COLORS.GRAY_LIGHT);
        drawIcon('back', width - backBtnSize - 32, 45, 20, backBtnHovered ? COLORS.TEXT_DARK : COLORS.GREEN);
        addInteractiveElement('btn_back_payment', width - backBtnSize - 40, 35, backBtnSize, backBtnSize, () => {
            startAnimation('payment-methods', 'dashboard');
        });

        // Calcula el tamaño de las tarjetas según el dispositivo
        let cardWidth, cardHeight, gap, startX, startY;
        
        if (width < 768) { // En celulares
            cardWidth = Math.min(width * 0.85, 400);  // 85% del ancho, máximo 400px
            cardHeight = Math.min(cardWidth * 1.2, 480); // Proporción más controlada
            gap = 30;                                 // Espacio entre tarjetas
            startX = (width - cardWidth) / 2;         // Centra horizontalmente
            startY = 130;                             // Empieza debajo del título
        } else { // En computadoras
            cardWidth = Math.min(width * 0.28, 320);  // 28% del ancho cada tarjeta
            cardHeight = Math.min(cardWidth * 1.3, 420); // Proporción controlada
            gap = width * 0.04;                       // 4% del ancho como separación
            startX = (width - (cardWidth * 3 + gap * 2)) / 2; // Centra las tres tarjetas
            startY = 130;                             // Empieza debajo del título
        }

        // Dibuja una tarjeta para cada método de pago
        data.paymentMethods.forEach((method, index) => {
            const x = startX + index * (cardWidth + gap); // Posición horizontal
            const y = startY + (width < 768 ? index * (cardHeight + gap) : 0); // En móvil apila verticalmente
            const isHovered = appState.hoveredElement?.id === `payment_${method.id}`;
            const isSelected = appState.selectedPaymentMethod === method.id;
            
            // Color de la tarjeta con efectos hover y selección
            let cardColor = method.color;
            if (isSelected) {
                cardColor = COLORS.GREEN; // Verde si está seleccionada
            } else if (isHovered) {
                // Efecto hover: usar el color hover específico si existe, sino usar el color base
                cardColor = method.colorHover || method.color;
            }
            
            // Dibuja la tarjeta con gradiente y sombra
            ctx.save();
            ctx.shadowColor = 'rgba(0,0,0,0.25)';
            ctx.shadowBlur = isHovered ? 25 : 15;
            ctx.shadowOffsetY = isHovered ? 12 : 8;
            
            // Crear gradiente para efecto más atractivo
            const cardGradient = ctx.createLinearGradient(x, y, x, y + cardHeight);
            if (isSelected) {
                cardGradient.addColorStop(0, COLORS.GREEN);
                cardGradient.addColorStop(1, COLORS.GREEN_DARK);
            } else {
                // Gradiente basado en el color del método
                const baseColor = cardColor;
                let darkerColor;
                
                // Crear versión más oscura para el gradiente
                if (method.id === 'credit_allied_banks') {
                    darkerColor = isHovered ? '#D68910' : '#E67E22'; // Amarillo más oscuro
                } else if (method.id === 'debit_allied_banks') {
                    darkerColor = isHovered ? '#A93226' : '#C0392B'; // Rojo más oscuro
                } else {
                    darkerColor = '#7F8C8D'; // Gris más oscuro para otros métodos
                }
                
                cardGradient.addColorStop(0, baseColor);
                cardGradient.addColorStop(1, darkerColor);
            }
            
            drawRoundedRect(x, y, cardWidth, cardHeight, 20, cardGradient);
            
            // Añadir brillo sutil en la parte superior para efecto más moderno
            if (!isSelected) {
                const glowGradient = ctx.createLinearGradient(x, y, x, y + cardHeight * 0.3);
                glowGradient.addColorStop(0, 'rgba(255,255,255,0.2)');
                glowGradient.addColorStop(1, 'rgba(255,255,255,0)');
                ctx.fillStyle = glowGradient;
                ctx.beginPath();
                ctx.roundRect(x, y, cardWidth, cardHeight * 0.3, [20, 20, 0, 0]); // Solo esquinas superiores redondeadas
                ctx.fill();
            }
            
            ctx.restore();
            
            // Indicador de selección (check mark) mejorado
            if (isSelected) {
                ctx.save();
                // Círculo de fondo para el check
                ctx.fillStyle = COLORS.WHITE;
                ctx.shadowColor = 'rgba(0,0,0,0.3)';
                ctx.shadowBlur = 8;
                ctx.shadowOffsetY = 2;
                ctx.beginPath();
                ctx.arc(x + cardWidth - 25, y + 25, 15, 0, Math.PI * 2);
                ctx.fill();
                
                // Check mark
                ctx.fillStyle = COLORS.GREEN;
                ctx.font = `bold 18px Poppins`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.shadowColor = 'transparent';
                ctx.fillText('✓', x + cardWidth - 25, y + 25);
                ctx.restore();
            }
            
            // Icono del método de pago - con efectos mejorados
            ctx.save();
            ctx.font = `${Math.min(cardWidth * 0.15, 48)}px Poppins`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            // Sombra para el icono si no está seleccionado
            if (!isSelected) {
                ctx.shadowColor = 'rgba(0,0,0,0.3)';
                ctx.shadowBlur = 4;
                ctx.shadowOffsetY = 2;
            }
            
            ctx.fillText(method.icon, x + cardWidth/2, y + Math.min(cardHeight * 0.18, 80));
            ctx.restore();
            
            // Título del método
            ctx.fillStyle = COLORS.WHITE;
            ctx.font = `bold ${Math.min(cardWidth * 0.055, 18)}px Poppins`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            
            // Dividir título en múltiples líneas si es muy largo
            const titleWords = method.title.split(' ');
            if (titleWords.length > 2 && cardWidth < 300) {
                // Para títulos largos en tarjetas pequeñas, usar dos líneas
                const firstLine = titleWords.slice(0, 2).join(' ');
                const secondLine = titleWords.slice(2).join(' ');
                ctx.fillText(firstLine, x + cardWidth/2, y + 115);
                if (secondLine) {
                    ctx.fillText(secondLine, x + cardWidth/2, y + 135);
                }
            } else {
                ctx.fillText(method.title, x + cardWidth/2, y + 125);
            }
            
            // Descripción con mejor ajuste
            ctx.font = `${Math.min(cardWidth * 0.038, 14)}px Poppins`;
            ctx.fillStyle = 'rgba(255,255,255,0.9)';
            ctx.textAlign = 'left';
            const descStartY = titleWords.length > 2 && cardWidth < 300 ? y + 165 : y + 155;
            wrapText(method.description, x + 15, descStartY, cardWidth - 30, Math.min(cardWidth * 0.048, 16));
            
            // Beneficio destacado
            const benefitY = y + Math.min(cardHeight * 0.58, 260); // Posición más dinámica
            if (method.benefit.type !== 'none') {
                // Caja del beneficio
                ctx.save();
                ctx.fillStyle = 'rgba(255,255,255,0.2)';
                const benefitBoxHeight = Math.min(cardHeight * 0.15, 60);
                drawRoundedRect(x + 10, benefitY, cardWidth - 20, benefitBoxHeight, 12, 'rgba(255,255,255,0.2)');
                ctx.restore();
                
                // Texto del beneficio - ajustado para que quepa mejor
                ctx.fillStyle = COLORS.WHITE;
                ctx.font = `bold ${Math.min(cardWidth * 0.042, 14)}px Poppins`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                
                // Dividir el texto del beneficio si es muy largo
                const benefitText = '🎁 ' + method.benefit.description;
                const maxBenefitWidth = cardWidth - 30;
                
                if (ctx.measureText(benefitText).width > maxBenefitWidth) {
                    // Texto muy largo, usar líneas más pequeñas
                    ctx.font = `bold ${Math.min(cardWidth * 0.038, 12)}px Poppins`;
                    ctx.fillText('🎁 Beneficio:', x + cardWidth/2, benefitY + 18);
                    ctx.font = `${Math.min(cardWidth * 0.035, 11)}px Poppins`;
                    ctx.fillText(method.benefit.description, x + cardWidth/2, benefitY + 35);
                } else {
                    ctx.fillText(benefitText, x + cardWidth/2, benefitY + 20);
                }
                
                ctx.font = `${Math.min(cardWidth * 0.032, 11)}px Poppins`;
                ctx.fillText('¡Beneficio exclusivo!', x + cardWidth/2, benefitY + benefitBoxHeight - 12);
            } else {
                // Sin beneficio
                ctx.save();
                ctx.fillStyle = 'rgba(255,255,255,0.1)';
                const benefitBoxHeight = Math.min(cardHeight * 0.15, 60);
                drawRoundedRect(x + 10, benefitY, cardWidth - 20, benefitBoxHeight, 12, 'rgba(255,255,255,0.1)');
                ctx.restore();
                
                ctx.fillStyle = 'rgba(255,255,255,0.7)';
                ctx.font = `${Math.min(cardWidth * 0.038, 13)}px Poppins`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('Sin beneficios adicionales', x + cardWidth/2, benefitY + 30);
            }
            
            // Botón "Seleccionar" - posición ajustada dinámicamente
            const btnW = Math.min(cardWidth * 0.7, 180), btnH = Math.min(cardHeight * 0.11, 45);
            const btnX = x + (cardWidth - btnW) / 2;
            const btnY = y + cardHeight - btnH - Math.min(cardHeight * 0.05, 20); // Margen proporcional
            const btnHovered = appState.hoveredElement?.id === `btn_select_${method.id}`;
            
            // Fondo del botón
            ctx.save();
            ctx.shadowColor = 'rgba(0,0,0,0.3)';
            ctx.shadowBlur = 8;
            ctx.shadowOffsetY = 4;
            
            let btnColor = 'rgba(255,255,255,0.9)';
            if (isSelected) {
                btnColor = COLORS.YELLOW; // Amarillo si está seleccionado
            } else if (btnHovered) {
                btnColor = 'rgba(255,255,255,1)'; // Más opaco en hover
            }
            
            drawRoundedRect(btnX, btnY, btnW, btnH, Math.min(btnH * 0.5, 22), btnColor);
            ctx.restore();
            
            // Texto del botón - ajustado al tamaño
            ctx.fillStyle = isSelected ? COLORS.TEXT_DARK : method.color;
            ctx.font = `bold ${Math.min(cardWidth * 0.042, btnH * 0.35)}px Poppins`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(isSelected ? 'Seleccionado' : 'Seleccionar', btnX + btnW/2, btnY + btnH/2);
            
            // Registra las áreas interactivas
            addInteractiveElement(`payment_${method.id}`, x, y, cardWidth, cardHeight, () => {
                appState.selectedPaymentMethod = method.id;
                draw();
            });
            addInteractiveElement(`btn_select_${method.id}`, btnX, btnY, btnW, btnH, () => {
                appState.selectedPaymentMethod = method.id;
                draw();
            });
        });

        // Información adicional si hay un método seleccionado
        if (appState.selectedPaymentMethod) {
            const selectedMethod = data.paymentMethods.find(m => m.id === appState.selectedPaymentMethod);
            if (selectedMethod) {
                const infoY = startY + cardHeight + (width < 768 ? data.paymentMethods.length * (cardHeight + gap) : 50);
                
                // Caja de información
                const infoW = Math.min(width * 0.9, 600);
                const infoH = 120;
                const infoX = (width - infoW) / 2;
                
                ctx.save();
                ctx.shadowColor = 'rgba(0,0,0,0.3)';
                ctx.shadowBlur = 20;
                ctx.shadowOffsetY = 10;
                drawRoundedRect(infoX, infoY, infoW, infoH, 15, 'rgba(255,255,255,0.95)');
                ctx.restore();
                
                // Título de la información
                ctx.fillStyle = COLORS.TEXT_DARK;
                ctx.font = `bold 18px Poppins`;
                ctx.textAlign = 'center';
                ctx.fillText(`Detalles de ${selectedMethod.title}`, infoX + infoW/2, infoY + 25);
                
                // Lista de detalles
                ctx.font = `14px Poppins`;
                ctx.textAlign = 'left';
                selectedMethod.details.forEach((detail, idx) => {
                    ctx.fillText(`• ${detail}`, infoX + 20, infoY + 50 + (idx * 18));
                });
            }
        }

        ctx.restore();
    }

    // Función principal de dibujo
    function draw() {
        const { width, height } = canvas.getBoundingClientRect();
        ctx.clearRect(0, 0, width, height);
        
        // Ocultar o mostrar el mensaje de bienvenida
        const welcomeMessage = document.getElementById('welcome-message');
        if (appState.view === 'dashboard') {
            welcomeMessage.style.display = 'block';
        } else {
            welcomeMessage.style.display = 'none';
        }

        appState.interactiveElements = [];
        if (appState.animation.inProgress) {
            const ease = 0.5 - 0.5 * Math.cos(appState.animation.progress * Math.PI);
            if (appState.animation.fromView === 'welcome') drawWelcome(1 - ease);
            if (appState.animation.fromView === 'dashboard') drawDashboard(1 - ease);
            if (appState.animation.fromView === 'plans') drawPlans(1 - ease);
            if (appState.animation.fromView === 'my-insurances') drawMyInsurances(1 - ease);
            if (appState.animation.fromView === 'payment-methods') drawPaymentMethods(1 - ease);
            if (appState.animation.toView === 'welcome') drawWelcome(ease);
            if (appState.animation.toView === 'dashboard') drawDashboard(ease);
            if (appState.animation.toView === 'plans') drawPlans(ease);
            if (appState.animation.toView === 'my-insurances') drawMyInsurances(ease);
            if (appState.animation.toView === 'payment-methods') drawPaymentMethods(ease);
        } else {
            if (appState.view === 'welcome') drawWelcome();
            else if (appState.view === 'dashboard') drawDashboard();
            else if (appState.view === 'plans') drawPlans();
            else if (appState.view === 'my-insurances') drawMyInsurances();
            else if (appState.view === 'payment-methods') drawPaymentMethods();
        }
        drawModal();
    }

    function addInteractiveElement(id, x, y, w, h, onClick) {
        appState.interactiveElements.push({ id, x, y, w, h, onClick });
    }

    function getMousePos(evt) {
        const rect = canvas.getBoundingClientRect();
        return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
    }

    // Detecta cuando el usuario mueve el mouse sobre el canvas
    canvas.addEventListener('mousemove', (evt) => {
        const pos = getMousePos(evt); // Obtiene la posición del mouse
        let newHoveredElement = null;
        
        // Revisa todos los elementos interactivos para ver si el mouse está encima de alguno
        for (const el of appState.interactiveElements.slice().reverse()) { // .reverse() para priorizar elementos de arriba
            if (pos.x >= el.x && pos.x <= el.x + el.w && pos.y >= el.y && pos.y <= el.y + el.h) {
                newHoveredElement = el; 
                break; // Para en el primer elemento que encuentre
            }
        }
        
        // Cambia el cursor a manita si está sobre algo clickeable
        canvas.style.cursor = newHoveredElement ? 'pointer' : 'default';
        
        // Si cambió el elemento sobre el que está el mouse, redibuja para mostrar el efecto hover
        if (appState.hoveredElement?.id !== newHoveredElement?.id) {
            appState.hoveredElement = newHoveredElement;
            if (!appState.animation.inProgress) draw(); // Solo redibuja si no hay animación
        }
    });

    // Detecta cuando el usuario hace clic en el canvas
    canvas.addEventListener('click', (evt) => {
        if (appState.animation.inProgress) return; // No hace nada si hay animación en progreso
        
        // Si hay un elemento bajo el mouse, ejecuta su función de clic
        if (appState.hoveredElement) {
            console.log('Click en elemento:', appState.hoveredElement.id);
            appState.hoveredElement.onClick(); // Ejecuta la acción asociada
        }
    });
    
    // Detecta el scroll del mouse para mover el chat
    canvas.addEventListener('wheel', (evt) => {
        if (!appState.modal.isOpen) return; // Solo funciona si hay una ventana abierta
        evt.preventDefault(); // Evita que la página haga scroll
        
        const { modal } = appState;
        const chatAreaHeight = Math.min(canvas.getBoundingClientRect().height * 0.8, 500) - 160;
        modal.scrollOffset += evt.deltaY * 0.5; // Ajusta la velocidad del scroll
        modal.scrollOffset = Math.max(0, modal.scrollOffset); // No puede ser menor que 0
        const maxScroll = Math.max(0, appState.modal.totalChatHeight - chatAreaHeight);
        modal.scrollOffset = Math.min(modal.scrollOffset, maxScroll); // No puede ser mayor que el máximo
        draw(); // Redibuja para mostrar la nueva posición del scroll
    });
    
    // Función que activa o desactiva un plan de seguro
    function toggleSubscription(catId, planId) {
        const category = data.categories.find(c => c.id === catId);
        let plan = null;
        let plans = [];
        
        if (category?.id === 'tecnologia' && appState.selectedTechnology) {
            // Para tecnología, buscar en los planes específicos del tipo seleccionado
            plans = category.options[appState.selectedTechnology]?.plans || [];
            plan = plans.find(p => p.id === planId);
        } else if (category?.id === 'transporte' && appState.selectedTransport) {
            // Para transporte, buscar en los planes específicos del tipo seleccionado
            plans = category.options[appState.selectedTransport]?.plans || [];
            plan = plans.find(p => p.id === planId);
        } else {
            // Para otras categorías, usar los planes normales (fallback)
            plans = category?.plans || [];
            plan = plans.find(p => p.id === planId);
        }
        
        if (plan) {
            // Si está intentando activar un plan
            if (!plan.active) {
                // Verificar si ya hay un plan activo en esta sección
                const hasActivePlan = plans.some(p => p.active);
                
                if (hasActivePlan) {
                    // Mostrar modal de advertencia
                    showSinglePlanWarningModal();
                    return; // No activar el plan
                } else {
                    // No hay plan activo, permitir activación
                    plan.active = true;
                }
            } else {
                // Está desactivando un plan, permitir siempre
                plan.active = false;
            }
            
            draw(); // Redibuja para mostrar el cambio
        }
    }

    // Función que activa o desactiva un beneficio específico de un plan
    function toggleBenefit(categoryId, planId, benefitIndex) {
        const category = data.categories.find(c => c.id === categoryId);
        let benefit = null;
        
        if (category?.id === 'tecnologia' && appState.selectedTechnology) {
            // Para tecnología, buscar en los planes específicos del tipo seleccionado
            const plans = category.options[appState.selectedTechnology]?.plans || [];
            benefit = plans.find(p => p.id === planId)?.benefits[benefitIndex];
        } else if (category?.id === 'transporte' && appState.selectedTransport) {
            // Para transporte, buscar en los planes específicos del tipo seleccionado
            const plans = category.options[appState.selectedTransport]?.plans || [];
            benefit = plans.find(p => p.id === planId)?.benefits[benefitIndex];
        } else {
            // Para otras categorías, usar los planes normales (fallback)
            benefit = category?.plans.find(p => p.id === planId)?.benefits[benefitIndex];
        }
        
        if (benefit) {
            console.log(`Simulando API para ${benefit.active ? 'desactivar' : 'activar'} beneficio: ${benefit.name}`);
            // Simula una llamada a la API con un pequeño retraso
            setTimeout(() => {
                benefit.active = !benefit.active; // Cambia el estado del beneficio
                draw(); // Redibuja para mostrar el cambio
            }, 300);
        }
    }

    // Función para mostrar el modal de beneficios extras
    function showExtraBenefitsModal() {
        appState.modal.isOpen = true;
        appState.modal.type = 'extra_benefits';
        appState.modal.title = 'Beneficios Extras Disponibles';
        draw();
    }

    // Función para mostrar advertencia de plan único
    function showSinglePlanWarningModal() {
        appState.modal.isOpen = true;
        appState.modal.type = 'single_plan_warning';
        appState.modal.title = 'Plan Activo Detectado';
        draw();
    }

    // Función para activar/desactivar un beneficio extra
    function toggleExtraBenefit(benefitIndex) {
        // Determinar qué categoría de beneficios estamos manejando
        const activeTransportPlans = getActiveTransportPlans();
        const activeTechPlans = getActiveTechnologyPlans();
        
        let benefitsCategory = 'tecnologia';
        let activePlans = activeTechPlans;
        
        if (activeTransportPlans.length > 0) {
            benefitsCategory = 'transporte';
            activePlans = activeTransportPlans;
        }
        
        const extraBenefitsList = appState.extraBenefits[benefitsCategory];
        const maxBenefits = getMaxExtraBenefits(activePlans);
        const currentActiveBenefits = extraBenefitsList.filter(benefit => benefit.active).length;
        
        if (extraBenefitsList[benefitIndex]) {
            const isCurrentlyActive = extraBenefitsList[benefitIndex].active;
            
            // Si se está intentando activar un beneficio
            if (!isCurrentlyActive) {
                if (currentActiveBenefits >= maxBenefits) {
                    // Mostrar mensaje de restricción
                    showBenefitRestrictionModal(maxBenefits, activePlans);
                    return;
                }
            }
            
            extraBenefitsList[benefitIndex].active = !extraBenefitsList[benefitIndex].active;
            console.log(`Beneficio extra de ${benefitsCategory} ${extraBenefitsList[benefitIndex].active ? 'activado' : 'desactivado'}: ${extraBenefitsList[benefitIndex].name}`);
            draw();
        }
    }

    // Función para obtener planes de tecnología activos
    function getActiveTechnologyPlans() {
        const activePlans = [];
        const techCategory = data.categories.find(cat => cat.id === 'tecnologia');
        
        if (techCategory && techCategory.options) {
            Object.values(techCategory.options).forEach(option => {
                option.plans.forEach(plan => {
                    if (plan.active) {
                        activePlans.push(plan);
                    }
                });
            });
        }
        
        return activePlans;
    }

    // Función para obtener planes activos de transporte
    function getActiveTransportPlans() {
        const activePlans = [];
        const transportCategory = data.categories.find(cat => cat.id === 'transporte');
        
        if (transportCategory && transportCategory.options) {
            Object.values(transportCategory.options).forEach(option => {
                option.plans.forEach(plan => {
                    if (plan.active) {
                        activePlans.push(plan);
                    }
                });
            });
        }
        
        return activePlans;
    }

    // Función para determinar el máximo de beneficios extras permitidos
    function getMaxExtraBenefits(activePlans) {
        if (activePlans.length === 0) return 0;
        
        // Buscar el plan con mayor nivel (Premium > Plus > Esencial)
        let maxLevel = 0;
        activePlans.forEach(plan => {
            if (plan.name.includes('Premium')) {
                maxLevel = Math.max(maxLevel, 3);
            } else if (plan.name.includes('Plus')) {
                maxLevel = Math.max(maxLevel, 2);
            } else if (plan.name.includes('Esencial')) {
                maxLevel = Math.max(maxLevel, 1);
            }
        });
        
        return maxLevel;
    }

    // Función para mostrar modal de restricción de beneficios
    function showBenefitRestrictionModal(maxBenefits, activePlans) {
        const planTypes = activePlans.map(plan => plan.name).join(', ');
        appState.modal.isOpen = true;
        appState.modal.type = 'benefit_restriction';
        appState.modal.title = 'Límite de Beneficios Alcanzado';
        appState.modal.maxBenefits = maxBenefits;
        appState.modal.planTypes = planTypes;
        draw();
    }

    // Configuración de los eventos de login y logout
    loginForm.addEventListener('submit', (e) => { 
        e.preventDefault(); // Evita que el formulario se envíe de verdad
        loginScreen.classList.add('hidden');        // Oculta la pantalla de login
        dashboardScreen.classList.remove('hidden'); // Muestra la pantalla principal
        resizeCanvas(); // Ajusta el tamaño del canvas
    });
    
    logoutButton.addEventListener('click', () => { 
        loginScreen.classList.remove('hidden');     // Muestra la pantalla de login
        dashboardScreen.classList.add('hidden');    // Oculta la pantalla principal
        appState.view = 'welcome';                   // Resetea a la vista de bienvenida
        appState.currentCategory = null;             // Limpia la categoría seleccionada
        appState.selectedTransport = null;           // Limpia selección de transporte
        appState.selectedTechnology = null;          // Limpia selección de tecnología
    });

    // Event listener para el botón "Mis Seguros"
    const misSegurosBtn = document.getElementById('mis-seguros-btn');
    if (misSegurosBtn) {
        misSegurosBtn.addEventListener('click', (e) => {
            e.preventDefault();
            startAnimation(appState.view, 'my-insurances');
        });
    }

    // Event listener para el botón "Inicio"
    const inicioBtn = document.getElementById('inicio-btn');
    if (inicioBtn) {
        inicioBtn.addEventListener('click', (e) => {
            e.preventDefault();
            startAnimation(appState.view, 'dashboard');
        });
    }

    // Event listener para el botón "Medios de Pago"
    const mediosPagoBtn = document.getElementById('medios-pago-btn');
    if (mediosPagoBtn) {
        mediosPagoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            startAnimation(appState.view, 'payment-methods');
        });
    }

    // Event listener para el botón "Asistente Virtual"
    const asistenteBtn = document.getElementById('asistente-btn');
    if (asistenteBtn) {
        asistenteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('🤖 Botón asistente virtual clickeado');
            handleVirtualAdvisorClick();
        });
    } else {
        console.error('❌ No se encontró el botón asistente-btn');
    }
    
    // Ajusta el canvas cuando la ventana cambia de tamaño
    window.addEventListener('resize', resizeCanvas);
    
    // Función que maneja las animaciones suaves entre pantallas
    function startAnimation(from, to, catId = null) {
        if (appState.animation.inProgress) return; // No inicia si ya hay una animación
        
        // Configura la animación
        Object.assign(appState.animation, { 
            inProgress: true, 
            fromView: from,     // Desde qué pantalla
            toView: to,         // Hacia qué pantalla
            progress: 0         // Progreso inicial
        });
        
        if (catId) appState.currentCategory = catId; // Si viene una categoría, la guarda
        
        resizeCanvas(); // Ajusta el tamaño para la nueva pantalla

        const startTime = performance.now(); // Marca el tiempo de inicio
        
        function animate(now) {
            // Calcula qué tanto ha progresado la animación (0 a 1)
            const progress = Math.min((now - startTime) / appState.animation.duration, 1);
            appState.animation.progress = progress;
            draw(); // Redibuja con el nuevo progreso
            
            if (progress < 1) { 
                requestAnimationFrame(animate); // Continúa la animación
            } else {
                // La animación terminó
                appState.animation.inProgress = false;
                appState.view = to; // Cambia oficialmente a la nueva vista
                
                if (to === 'dashboard') {
                    // Si volvemos al dashboard, limpia las selecciones
                    appState.currentCategory = null;
                    appState.selectedTransport = null;
                }
                
                resizeCanvas(); // Ajusta el tamaño final
            }
        }
        requestAnimationFrame(animate); // Inicia la animación
    }

    // Función que dibuja texto que se ajusta automáticamente a varias líneas
    function wrapText(text, x, y, maxWidth, lineHeight) {
        const paragraphs = text.split('\n'); // Separa por párrafos
        paragraphs.forEach(paragraph => {
            const words = paragraph.split(' '); // Separa por palabras
            let line = '';
            for(let n = 0; n < words.length; n++) {
                const testLine = line + words[n] + ' ';
                // Si la línea es muy ancha, dibuja lo que tiene y empieza una nueva
                if (ctx.measureText(testLine).width > maxWidth && n > 0) {
                    ctx.fillText(line, x, y);
                    line = words[n] + ' ';
                    y += lineHeight; // Baja a la siguiente línea
                } else { 
                    line = testLine; 
                }
            }
            ctx.fillText(line, x, y); // Dibuja la última línea
            y += lineHeight; // Espacio entre párrafos
        });
    }
    
    // Función que calcula cuánta altura necesita un texto
    function getTextHeight(text, maxWidth, lineHeight) {
        let y = 0;
        const paragraphs = text.split('\n');
        paragraphs.forEach(paragraph => {
            const words = paragraph.split(' ');
            let line = '';
            for(let n = 0; n < words.length; n++) {
                const testLine = line + words[n] + ' ';
                if (ctx.measureText(testLine).width > maxWidth && n > 0) {
                    line = words[n] + ' ';
                    y += lineHeight; // Cuenta una línea más
                } else { 
                    line = testLine; 
                }
            }
            y += lineHeight; // Cuenta la última línea
        });
        return y; // Devuelve la altura total
    }

    // Función que abre una ventana emergente (modal)
    function openModal(config) {
        console.log('📱 openModal llamada con config:', config);
        
        appState.modal = { ...appState.modal, isOpen: true, scrollOffset: 0, totalChatHeight: 0, ...config };
        console.log('📱 Estado del modal actualizado:', appState.modal);
        
        if (config.type === 'advisor_chat') {
            console.log('💬 Configurando chat interface...');
            chatInterface.style.display = 'flex'; // Muestra la interfaz de chat
            const { width, height } = canvas.getBoundingClientRect();
            const modalW = Math.min(width * 0.8, 600);
            const modalH = Math.min(height * 0.8, 500);
            const modalY = (height - modalH) / 2;
            chatInterface.style.width = `${modalW - 60}px`;
            chatInterface.style.bottom = `${modalY + 15}px`;
            console.log('💬 Chat interface configurado');
        }
        
        console.log('🎨 Llamando a draw()...');
        draw(); // Redibuja para mostrar la ventana
        console.log('✅ openModal completado');
    }

    // Función que cierra la ventana emergente
    function closeModal() {
        appState.modal.isOpen = false;
        chatInterface.style.display = 'none'; // Oculta el chat
        chatInput.value = ''; // Limpia el texto escrito
        draw(); // Redibuja sin la ventana
    }

    // Función que proporciona respuestas inteligentes del asesor virtual sin depender de APIs externas
    async function callGemini() {
        appState.modal.isLoading = true; // Muestra que está cargando
        draw();

        // Simular un pequeño retraso para que parezca más real
        await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));

        try {
            const userMessage = appState.modal.chatHistory[appState.modal.chatHistory.length - 1];
            const userInput = userMessage.parts[0].text.toLowerCase();
            
            let response = generateIntelligentResponse(userInput);
            
            // Si no hay respuesta específica, usar respuesta contextual
            if (!response) {
                response = generateContextualResponse(userInput);
            }
            
            // Agregar la respuesta al historial
            appState.modal.chatHistory.push({ 
                role: 'model', 
                parts: [{ text: response }] 
            });
            
        } catch (error) {
            console.error("Error generando respuesta:", error);
            // Si hay error, muestra un mensaje de disculpa
            appState.modal.chatHistory.push({ 
                role: 'model', 
                parts: [{ text: 'Lo siento, hubo un problema al procesar tu consulta. ¿Podrías reformular tu pregunta? 😊' }] 
            });
        } finally {
            appState.modal.isLoading = false; // Ya no está cargando
            // Hace scroll automático hacia abajo para mostrar la respuesta nueva
            const chatAreaHeight = Math.min(canvas.getBoundingClientRect().height * 0.8, 500) - 160;
            const maxScroll = Math.max(0, appState.modal.totalChatHeight - chatAreaHeight);
            appState.modal.scrollOffset = maxScroll;
            draw();
        }
    }

    // Función para generar respuestas inteligentes basadas en el contenido del mensaje
    function generateIntelligentResponse(userInput) {
        const responses = {
            // Saludos y cortesías
            'hola|saludo|buenas': [
                "¡Hola! 😊 Me da mucho gusto conocerte. Soy tu asesor virtual de Seguros Bolívar y estoy aquí para ayudarte a encontrar la protección perfecta para tu estilo de vida. ¿Qué te gustaría proteger hoy?",
                "¡Hola! 👋 ¡Qué bueno que estés aquí! Soy tu asesor especializado en seguros para jóvenes. ¿En qué puedo ayudarte a proteger tu día a día?",
                "¡Hola! 🌟 Bienvenido a Seguros Bolívar. Estoy aquí para hacer que elegir tu seguro sea súper fácil. ¿Qué quieres asegurar?"
            ],
            
            // Preguntas sobre patinetas
            'patineta|scooter|eléctrica': [
                "¡Excelente elección! 🛴 Las patinetas eléctricas son el futuro de la movilidad urbana. Tenemos 3 planes perfectos:\n\n🔸 **Plan Esencial** ($32.900/mes): Ideal para empezar, cubre hurto calificado y daños a terceros hasta $10M\n🔸 **Plan Plus** ($48.900/mes): Incluye daño total accidental y grúa especializada\n🔸 **Plan Premium** ($65.900/mes): La protección más completa con patineta de reemplazo\n\n¿Cuál te interesa más?",
                "¡Perfecto! 🛴⚡ Las patinetas eléctricas necesitan protección especializada. Nuestros planes cubren desde hurto hasta daños accidentales, y el Premium incluso incluye una patineta de cortesía mientras reparamos la tuya. ¿Qué tan seguido la usas?"
            ],
            
            // Preguntas sobre bicicletas
            'bicicleta|bici|bike': [
                "¡Genial! 🚴‍♂️ Las bicis son libertad pura. Nuestros planes están diseñados para ciclistas urbanos:\n\n🔸 **Plan Esencial** ($28.900/mes): Perfecto para uso básico, incluye kit de herramientas\n🔸 **Plan Plus** ($42.900/mes): Con mecánico a domicilio mensual\n🔸 **Plan Premium** ($58.900/mes): Bici de cortesía + programa fitness\n\n¿Tu bici es tu medio de transporte principal?",
                "¡Excelente! 🚴‍♀️ Los ciclistas saben que la bici no es solo transporte, es estilo de vida. Nuestros seguros incluyen desde protección básica hasta servicios premium como mecánico a domicilio. ¿Qué tipo de ciclista eres?"
            ],
            
            // Preguntas sobre motos
            'moto|motocicleta|eléctrica': [
                "¡Increíble! 🏍️ Las motos eléctricas son el futuro. Tenemos cobertura especializada:\n\n🔸 **Plan Esencial** ($45.900/mes): Para comenzar con seguridad\n🔸 **Plan Plus** ($68.900/mes): Grúa especializada y talleres certificados\n🔸 **Plan Premium** ($89.900/mes): Moto de cortesía + seguro de batería\n\n¿Ya tienes moto eléctrica o estás pensando en comprar una?",
                "¡Excelente elección! 🏍️⚡ Las motos eléctricas requieren atención especializada. Nuestros talleres están certificados para vehículos eléctricos y ofrecemos hasta moto de cortesía. ¿De qué cilindrada estamos hablando?"
            ],
            
            // Preguntas sobre celulares
            'celular|teléfono|smartphone|móvil': [
                "¡Perfecto! 📱 Tu celular es tu vida digital. Nuestros planes están diseñados para la generación conectada:\n\n🔸 **Plan Esencial** ($29.900/mes): Protección básica contra hurto y daños\n🔸 **Plan Plus** ($42.900/mes): Incluye reparación de pantalla y servicio a domicilio\n🔸 **Plan Premium** ($58.900/mes): Cobertura total + celular de respaldo\n\n¿Qué marca y modelo tienes?",
                "¡Excelente! 📱✨ Tu smartphone merece la mejor protección. Cubrimos desde pantallas rotas hasta daños por líquidos. El plan Premium incluso incluye transferencia de datos. ¿Tu celular es tu herramienta de trabajo?"
            ],
            
            // Preguntas sobre portátiles
            'portátil|laptop|computador|pc': [
                "¡Genial! 💻 Tu portátil es tu oficina móvil. Tenemos cobertura especializada para equipos de trabajo:\n\n🔸 **Plan Esencial** ($55.900/mes): Protección básica + soporte técnico\n🔸 **Plan Plus** ($74.900/mes): Equipos de préstamo durante reparaciones\n🔸 **Plan Premium** ($94.900/mes): Respaldo automático en la nube\n\n¿Es tu equipo de trabajo o estudio?",
                "¡Perfecto! 💻⚡ Los equipos de trabajo necesitan protección premium. Incluimos recuperación de datos y hasta equipos de reemplazo. ¿Qué tan crítico es tu portátil para tu día a día?"
            ],
            
            // Preguntas sobre gadgets
            'audífono|tablet|gadget|dispositivo': [
                "¡Excelente! 🎧 Los gadgets completan tu setup perfecto. Nuestros planes cubren audífonos, tablets y más:\n\n🔸 **Plan Esencial** ($18.900/mes): Ideal para audífonos básicos\n🔸 **Plan Plus** ($26.900/mes): Con reemplazo temporal\n🔸 **Plan Premium** ($34.900/mes): Optimización de audio incluida\n\n¿Qué dispositivos quieres proteger?",
                "¡Genial! 🎧📱 Los gadgets son el toque final de tu estilo digital. Desde audífonos hasta tablets, tenemos cobertura especializada. ¿Son profesionales o para entretenimiento?"
            ],
            
            // Preguntas sobre precios
            'precio|costo|cuánto|valor|barato|caro': [
                "¡Excelente pregunta! 💰 Nuestros precios están diseñados para jóvenes:\n\n**🚀 TRANSPORTE:**\n• Patinetas: $32.900 - $65.900\n• Bicicletas: $28.900 - $58.900\n• Motos: $45.900 - $89.900\n\n**💻 TECNOLOGÍA:**\n• Celulares: $29.900 - $58.900\n• Portátiles: $55.900 - $94.900\n• Gadgets: $18.900 - $34.900\n\n¿Cuál se ajusta mejor a tu presupuesto?",
                "¡Buena pregunta! 💸 Tenemos opciones desde $18.900/mes. Lo mejor es que puedes combinar planes y hay descuentos con bancos aliados. ¿Tienes algún presupuesto en mente?"
            ],
            
            // Preguntas sobre coberturas
            'cubre|cobertura|protege|incluye|qué pasa si': [
                "¡Excelente pregunta! 🛡️ Nuestras coberturas son súper completas:\n\n**BÁSICAS:** Hurto calificado, daños accidentales\n**PLUS:** + Daños parciales, servicios técnicos\n**PREMIUM:** + Hurto simple, coberturas especiales\n\n**EXTRA:** Grúas, equipos de reemplazo, soporte 24/7\n\n¿Hay algún riesgo específico que te preocupa?",
                "¡Súper importante preguntar! 🔒 Cubrimos desde lo básico (hurto, daños) hasta lo premium (líquidos, sobretensión). Cada plan tiene beneficios únicos. ¿Qué tipo de accidentes te preocupan más?"
            ],
            
            // Comparaciones y recomendaciones
            'mejor|recomendación|cuál|diferencia|comparar': [
                "¡Me encanta que preguntes! 🤔 Para recomendarte el mejor plan necesito conocerte:\n\n📍 **¿Cómo te mueves?** (pie, bici, moto, patineta)\n💼 **¿Trabajas/estudias?** (qué dispositivos usas)\n🏠 **¿Dónde vives?** (zona de riesgo)\n💰 **¿Cuál es tu presupuesto?**\n\nCon esta info te armo el plan perfecto. ¿Me cuentas un poco?",
                "¡Excelente! 🎯 Para darte la mejor recomendación, cuéntame sobre tu día típico. ¿Eres más de transporte o tecnología? ¿Estudias, trabajas, o ambos? Con eso te armo un plan a tu medida."
            ],
            
            // Beneficios extras
            'beneficio|extra|adicional|ventaja|incluye': [
                "¡Los beneficios extras son lo mejor! ✨ Tenemos dos categorías:\n\n**🚀 TRANSPORTE:**\n• Descuentos en cascos y equipo\n• Marcación segura anti-robo\n• Mantenimiento preventivo gratis\n\n**💻 TECNOLOGÍA:**\n• 1TB almacenamiento en la nube\n• Day-Pass en co-workings\n• Apps de productividad\n\n¿Cuál categoría te interesa más?",
                "¡Los extras hacen la diferencia! 🌟 Desde equipos de protección hasta almacenamiento en la nube. Depende de tus planes activos. ¿Ya tienes algún seguro con nosotros?"
            ],
            
            // Proceso y trámites
            'cómo|proceso|trámite|activar|contratar': [
                "¡Súper fácil! 📱 Todo es 100% digital:\n\n1️⃣ **Eliges** tu plan ideal\n2️⃣ **Configuras** tus beneficios extras\n3️⃣ **Pagas** con descuentos bancarios\n4️⃣ **¡Listo!** Protección inmediata\n\n✨ **Sin papeleos, sin filas, sin complicaciones**\n\n¿Quieres que empecemos ahora mismo?",
                "¡Es súper simple! 🚀 En menos de 5 minutos tienes tu seguro activo. Todo desde la app, con gestión digital completa. ¿Te ayudo a elegir tu plan ahora?"
            ],
            
            // Descuentos y promociones
            'descuento|promoción|oferta|rebaja': [
                "¡Tenemos descuentos geniales! 🎉\n\n💳 **Tarjetas aliadas:** 10% descuento + puntos\n🏦 **Débito aliado:** 15% cashback directo\n🎁 **Combos:** Descuentos por múltiples seguros\n💰 **Estudiantes:** Tarifas preferenciales\n\n¿Tienes cuenta en algún banco aliado?",
                "¡Sí, tenemos promociones! 💸 Los mejores descuentos son con bancos aliados. El débito te da 15% cashback inmediato. ¿Quieres que revisemos tus opciones de pago?"
            ]
        };
        
        // Buscar coincidencias en las respuestas
        for (const [keywords, responseList] of Object.entries(responses)) {
            if (keywords.split('|').some(keyword => userInput.includes(keyword))) {
                return responseList[Math.floor(Math.random() * responseList.length)];
            }
        }
        
        return null; // No hay respuesta específica
    }

    // Función para generar respuestas contextuales cuando no hay coincidencia específica
    function generateContextualResponse(userInput) {
        const activeSeguro = getActiveSeguro();
        
        // Respuestas generales amigables
        const generalResponses = [
            "¡Interesante! 🤔 Cuéntame más detalles para poder ayudarte mejor. ¿Qué tipo de seguro te interesa: transporte (patinetas, bicis, motos) o tecnología (celulares, portátiles, gadgets)?",
            "¡Genial que preguntes! 😊 Para darte la mejor recomendación, necesito conocer un poco más sobre tu estilo de vida. ¿Cómo te mueves por la ciudad? ¿Qué dispositivos usas más?",
            "¡Excelente! 🌟 Me encanta ayudar a encontrar el seguro perfecto. ¿Podrías contarme qué quieres proteger específicamente? ¿Es algo relacionado con movilidad o tecnología?",
            "¡Súper! 🚀 Estoy aquí para hacer que elegir tu seguro sea fácil y divertido. ¿Hay algún producto específico que te interese? ¿O prefieres que te cuente sobre nuestras categorías?",
            "¡Me gusta tu pregunta! 💡 Para darte la respuesta más útil, cuéntame: ¿eres más de andar en bici/patineta/moto, o tu vida gira más en torno a la tecnología?",
            "¡Perfecto! ✨ Veo que tienes curiosidad por nuestros seguros. ¿Te gustaría que empecemos por conocer qué quieres proteger? ¿Tu movilidad o tus dispositivos tecnológicos?"
        ];
        
        // Si tiene un seguro activo, personalizar la respuesta
        if (activeSeguro) {
            return `¡Genial! 😊 Veo que ya tienes activo el ${activeSeguro.planName} para ${activeSeguro.productName}. ¿Tu pregunta es sobre este plan o te interesa algo adicional? Estoy aquí para ayudarte con lo que necesites.`;
        }
        
        // Respuesta general aleatoria
        return generalResponses[Math.floor(Math.random() * generalResponses.length)];
    }

    // Función que se ejecuta cuando el usuario hace clic en el botón de explicación (estrella)
    function handleExplainCoverageClick(category, plan) {
        // Crea un mensaje personalizado para que la IA explique la cobertura
        const prompt = `Eres un asesor experto y amigable de Seguros Bolívar. Tu misión es explicarle a un joven de forma muy clara y sencilla qué significa la cobertura de su seguro. Usa emojis para hacerlo más cercano. Explica qué significa la cobertura '${plan.coverage}' para el '${plan.name}' en la categoría de '${category.title}'. Incluye dos ejemplos claros de situaciones que SÍ cubriría y un ejemplo de algo que NO cubriría.`;
        const chatHistory = [{ role: 'user', parts: [{ text: prompt }] }];
        openModal({ type: 'advisor_chat', title: `¿Qué cubre este plan?`, chatHistory });
        callGemini(); // Llama a la IA para que responda
    }

    // Función que se ejecuta cuando el usuario hace clic en el asesor virtual
    function handleVirtualAdvisorClick() {
        console.log('🚀 handleVirtualAdvisorClick ejecutándose...');
        
        // Obtener información de los seguros activos para personalizar la bienvenida
        const activeSeguro = getActiveSeguro();
        console.log('📊 Seguro activo encontrado:', activeSeguro);
        
        let prompt = "¡Hola! 😊 Soy tu asesor virtual de Seguros Bolívar. ";
        
        if (activeSeguro) {
            prompt += getContextualWelcome(activeSeguro);
            console.log('💬 Usando prompt contextual');
        } else {
            prompt += "Cuéntame un poco sobre ti y tu día a día para poder recomendarte el seguro perfecto. Por ejemplo, ¿qué dispositivos usas?, ¿cómo te mueves por la ciudad?";
            console.log('💬 Usando prompt por defecto');
        }
        
        console.log('📝 Prompt generado:', prompt);
        console.log('🎯 Abriendo modal...');
        
        openModal({ 
            type: 'advisor_chat', 
            title: '✨ Asesor Virtual', 
            chatHistory: [{ role: 'model', parts: [{ text: prompt }] }] 
        });
        
        console.log('✅ Modal abierto, estado actual:', appState.modal);
    }

    // Función para obtener el seguro activo del usuario
    function getActiveSeguro() {
        for (const category of data.categories) {
            if (category.options) {
                for (const [productKey, productValue] of Object.entries(category.options)) {
                    for (const plan of productValue.plans) {
                        if (plan.active) {
                            return {
                                category: category.id,
                                categoryTitle: category.title,
                                product: productKey,
                                productName: productValue.title,
                                plan: plan.id,
                                planName: plan.name,
                                price: plan.price,
                                coverage: plan.coverage,
                                benefits: plan.benefits
                            };
                        }
                    }
                }
            }
        }
        return null;
    }

    // Función para generar mensaje de bienvenida contextual
    function getContextualWelcome(activeSeguro) {
        const responses = {
            patineta: {
                esencial: "Veo que tienes el Plan Esencial para patineta 🛴. ¡Excelente elección! Este plan te protege contra hurto y daños. ¿Te gustaría saber más sobre la cobertura o tienes alguna pregunta específica sobre cómo usar tu seguro?",
                plus: "¡Genial! Tienes el Plan Plus para patineta 🛴✨. Con este plan tienes una cobertura más amplia incluyendo grúa especializada. ¿Hay algo específico sobre tu plan que te gustaría aclarar?",
                premium: "¡Perfecto! Tienes el Plan Premium para patineta 🛴💎. La cobertura más completa que ofrecemos. ¿Te gustaría conocer todos los beneficios incluidos o tienes alguna consulta específica?"
            },
            bicicleta: {
                esencial: "Veo que tienes el Plan Esencial para bicicleta 🚴‍♂️. ¡Buena decisión! Este plan te cubre contra los riesgos más comunes. ¿Quieres que te explique la cobertura o tienes alguna duda?",
                plus: "¡Excelente! Tienes el Plan Plus para bicicleta 🚴‍♂️⭐. Con beneficios adicionales como asistencia técnica. ¿Hay algo en particular que te gustaría saber?",
                premium: "¡Increíble! Tienes el Plan Premium para bicicleta 🚴‍♂️🏆. La protección más completa para tu bici. ¿Te gustaría revisar todos tus beneficios o consultar algo específico?"
            },
            motos: {
                esencial: "Veo que tienes el Plan Esencial para moto 🏍️. ¡Muy bien! Estás protegido contra hurto y daños básicos. ¿Quieres que revisemos la cobertura juntos?",
                plus: "¡Perfecto! Tienes el Plan Plus para moto 🏍️🌟. Con cobertura ampliada y servicios adicionales. ¿Hay algo sobre tu plan que te gustaría aclarar?",
                premium: "¡Fantástico! Tienes el Plan Premium para moto 🏍️💫. La máxima protección disponible. ¿Te interesa conocer todos los detalles de tu cobertura?"
            },
            celular: {
                esencial: "Veo que protegiste tu celular con el Plan Esencial 📱. ¡Inteligente! Estás cubierto contra los daños más frecuentes. ¿Tienes alguna pregunta sobre la cobertura?",
                plus: "¡Excelente! Tienes el Plan Plus para celular 📱✨. Con beneficios adicionales muy útiles. ¿Quieres que repasemos qué incluye tu plan?",
                premium: "¡Perfecto! Tienes el Plan Premium para celular 📱💎. La protección más completa para tu dispositivo. ¿Te gustaría conocer todos los servicios incluidos?"
            },
            portatil: {
                esencial: "Veo que aseguraste tu portátil con el Plan Esencial 💻. ¡Muy buena decisión! Tu equipo está protegido. ¿Hay algo específico que te gustaría saber?",
                plus: "¡Genial! Tienes el Plan Plus para portátil 💻⭐. Con cobertura ampliada y servicios especiales. ¿Quieres revisar los beneficios incluidos?",
                premium: "¡Increíble! Tienes el Plan Premium para portátil 💻🏆. La máxima protección tecnológica. ¿Te interesa conocer todos los detalles de tu plan?"
            },
            gadgets: {
                esencial: "Veo que protegiste tus gadgets con el Plan Esencial 🎧. ¡Excelente! Tus dispositivos están seguros. ¿Tienes alguna consulta sobre la cobertura?",
                plus: "¡Perfecto! Tienes el Plan Plus para gadgets 🎧✨. Con beneficios adicionales muy convenientes. ¿Hay algo sobre tu plan que quieras aclarar?",
                premium: "¡Fantástico! Tienes el Plan Premium para gadgets 🎧💫. La protección más completa disponible. ¿Te gustaría revisar todos tus beneficios?"
            }
        };

        const planType = activeSeguro.plan.includes('esencial') ? 'esencial' : 
                        activeSeguro.plan.includes('plus') ? 'plus' : 'premium';
        
        return responses[activeSeguro.product]?.[planType] || 
               `Veo que tienes un plan activo. ¿En qué puedo ayudarte hoy? 😊`;
    }

    // Función que maneja cuando el usuario envía un mensaje en el chat
    function handleChatSubmit() {
        const userInput = chatInput.value;
        if (!userInput.trim() || appState.modal.isLoading) return; // No hace nada si está vacío o cargando
        
        // Agrega el mensaje del usuario al historial (esto SÍ se muestra)
        appState.modal.chatHistory.push({ role: 'user', parts: [{ text: userInput }] });
        chatInput.value = ''; // Limpia el campo de texto
        draw(); // Redibuja para mostrar el mensaje
        
        // Analizar el contexto del mensaje para dar respuestas inteligentes (INTERNO - no se muestra)
        const contextualPrompt = generateContextualPrompt(userInput);
        
        // Si hay contexto específico, usarlo para generar una respuesta más inteligente
        if (contextualPrompt) {
            // En lugar de agregar al historial, generar respuesta directamente
            generateIntelligentResponseWithContext(contextualPrompt, userInput);
        } else {
            // Generar respuesta normal
            callGemini(); // Obtiene la respuesta de la IA
        }
    }

    // Nueva función para generar respuestas con contexto sin mostrar el prompt
    async function generateIntelligentResponseWithContext(contextualPrompt, originalUserInput) {
        appState.modal.isLoading = true;
        draw();

        // Simular un pequeño retraso para que parezca más real
        await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));

        try {
            // Usar el contexto para generar una respuesta más específica
            let response = generateSpecificResponse(originalUserInput, contextualPrompt);
            
            // Si no hay respuesta específica, usar respuesta contextual
            if (!response) {
                response = generateContextualResponse(originalUserInput);
            }
            
            // Agregar la respuesta al historial (esto SÍ se muestra)
            appState.modal.chatHistory.push({ 
                role: 'model', 
                parts: [{ text: response }] 
            });
            
        } catch (error) {
            console.error("Error generando respuesta:", error);
            // Si hay error, muestra un mensaje de disculpa
            appState.modal.chatHistory.push({ 
                role: 'model', 
                parts: [{ text: 'Lo siento, hubo un problema al procesar tu consulta. ¿Podrías reformular tu pregunta? 😊' }] 
            });
        } finally {
            appState.modal.isLoading = false; // Ya no está cargando
            // Hace scroll automático hacia abajo para mostrar la respuesta nueva
            const chatAreaHeight = Math.min(canvas.getBoundingClientRect().height * 0.8, 500) - 160;
            const maxScroll = Math.max(0, appState.modal.totalChatHeight - chatAreaHeight);
            appState.modal.scrollOffset = maxScroll;
            draw();
        }
    }

    // Nueva función para generar respuestas específicas basadas en el contexto
    function generateSpecificResponse(userInput, contextualPrompt) {
        const input = userInput.toLowerCase();
        
        // Respuestas específicas basadas en el tipo de consulta detectada
        if (contextualPrompt.includes('patineta') || 
            contextualPrompt.includes('bicicleta') || 
            contextualPrompt.includes('moto') || 
            contextualPrompt.includes('celular') || 
            contextualPrompt.includes('portátil') || 
            contextualPrompt.includes('gadgets')) {
            return generateIntelligentResponse(input);
        }
        
        return null; // No hay respuesta específica
    }

    // Función para generar prompts contextuales basados en la consulta del usuario
    function generateContextualPrompt(userInput) {
        const input = userInput.toLowerCase();
        const activeSeguro = getActiveSeguro();
        
        // Información detallada de todos los seguros disponibles
        const segurosInfo = {
            transporte: {
                patineta: {
                    descripcion: "Seguros para patinetas eléctricas y tradicionales",
                    planes: ["Esencial ($65.000/mes)", "Plus ($98.000/mes)", "Premium ($140.000/mes)"],
                    coberturas: "Hurto, daño total/parcial, daños a terceros hasta $40M",
                    beneficios_especiales: "Descuentos en candados, asistencia básica, grúa especializada"
                },
                bicicleta: {
                    descripcion: "Seguros para bicicletas tradicionales y eléctricas",
                    planes: ["Esencial ($75.000/mes)", "Plus ($110.000/mes)", "Premium ($160.000/mes)"],
                    coberturas: "Hurto, daño total/parcial, daños a terceros, asistencia en carretera",
                    beneficios_especiales: "Servicio de grúa, asistencia técnica 24/7, descuentos en repuestos"
                },
                motos: {
                    descripcion: "Seguros para motocicletas de todas las cilindradas",
                    planes: ["Esencial ($120.000/mes)", "Plus ($180.000/mes)", "Premium ($250.000/mes)"],
                    coberturas: "Hurto, daño total/parcial, daños a terceros hasta $50M, asistencia vial",
                    beneficios_especiales: "Grúa especializada, asistencia mecánica, descuentos en repuestos"
                }
            },
            tecnologia: {
                celular: {
                    descripcion: "Seguros para smartphones de todas las marcas",
                    planes: ["Esencial ($45.000/mes)", "Plus ($70.000/mes)", "Premium ($95.000/mes)"],
                    coberturas: "Daño accidental, robo, hurto, daño por líquidos",
                    beneficios_especiales: "Reparación express, dispositivo de reemplazo, respaldo de datos"
                },
                portatil: {
                    descripcion: "Seguros para laptops y computadores portátiles",
                    planes: ["Esencial ($80.000/mes)", "Plus ($120.000/mes)", "Premium ($170.000/mes)"],
                    coberturas: "Daño accidental, robo, hurto, fallas eléctricas",
                    beneficios_especiales: "Soporte técnico, respaldo de datos, equipos de reemplazo"
                },
                gadgets: {
                    descripcion: "Seguros para audífonos, tablets y otros dispositivos",
                    planes: ["Esencial ($35.000/mes)", "Plus ($55.000/mes)", "Premium ($75.000/mes)"],
                    coberturas: "Daño accidental, robo, hurto, fallas de fábrica",
                    beneficios_especiales: "Reparación especializada, reemplazo rápido, garantía extendida"
                }
            }
        };

        // Detectar consultas específicas sobre seguros
        if (input.includes('patineta') || input.includes('scooter')) {
            return `El usuario pregunta sobre seguros para patinetas. Información completa: ${JSON.stringify(segurosInfo.transporte.patineta)}. Responde de forma amigable y detallada sobre precios, coberturas y beneficios.`;
        }
        
        if (input.includes('bicicleta') || input.includes('bici') || input.includes('bike')) {
            return `El usuario pregunta sobre seguros para bicicletas. Información completa: ${JSON.stringify(segurosInfo.transporte.bicicleta)}. Explica los planes disponibles, precios y qué cubre cada uno.`;
        }
        
        if (input.includes('moto') || input.includes('motocicleta')) {
            return `El usuario pregunta sobre seguros para motos. Información completa: ${JSON.stringify(segurosInfo.transporte.motos)}. Detalla los planes, precios y coberturas específicas.`;
        }
        
        if (input.includes('celular') || input.includes('teléfono') || input.includes('smartphone') || input.includes('móvil')) {
            return `El usuario pregunta sobre seguros para celulares. Información completa: ${JSON.stringify(segurosInfo.tecnologia.celular)}. Explica los planes, precios y qué situaciones cubre.`;
        }
        
        if (input.includes('portátil') || input.includes('laptop') || input.includes('computador') || input.includes('pc')) {
            return `El usuario pregunta sobre seguros para portátiles. Información completa: ${JSON.stringify(segurosInfo.tecnologia.portatil)}. Detalla los planes disponibles y sus beneficios.`;
        }
        
        if (input.includes('audífono') || input.includes('tablet') || input.includes('gadget') || input.includes('dispositivo')) {
            return `El usuario pregunta sobre seguros para gadgets. Información completa: ${JSON.stringify(segurosInfo.tecnologia.gadgets)}. Explica qué dispositivos cubre y los planes disponibles.`;
        }
        
        // Consultas sobre precios
        if (input.includes('precio') || input.includes('costo') || input.includes('cuánto') || input.includes('valor')) {
            let priceInfo = "Precios de todos los seguros: ";
            for (const categoria in segurosInfo) {
                for (const producto in segurosInfo[categoria]) {
                    priceInfo += `${producto}: ${segurosInfo[categoria][producto].planes.join(', ')}. `;
                }
            }
            return `El usuario pregunta sobre precios. ${priceInfo} Explica los precios de forma clara y ayuda a comparar opciones según su presupuesto.`;
        }
        
        // Consultas sobre coberturas
        if (input.includes('cubre') || input.includes('cobertura') || input.includes('protege') || input.includes('incluye')) {
            if (activeSeguro) {
                return `El usuario pregunta sobre coberturas. Tiene activo: ${activeSeguro.productName} ${activeSeguro.planName}. Cobertura actual: ${activeSeguro.coverage}. Beneficios: ${activeSeguro.benefits.join(', ')}. Explica detalladamente qué cubre su plan actual.`;
            }
            return `El usuario pregunta sobre coberturas en general. Explica qué cubre cada tipo de seguro de forma clara y con ejemplos prácticos.`;
        }
        
        // Consultas sobre beneficios extras
        if (input.includes('beneficio') || input.includes('extra') || input.includes('adicional') || input.includes('ventaja')) {
            const activePlans = getActiveTransportPlans().concat(getActiveTechnologyPlans());
            if (activePlans.length > 0) {
                const category = getActiveTransportPlans().length > 0 ? 'transporte' : 'tecnologia';
                const extraBenefits = appState.extraBenefits[category];
                return `El usuario pregunta sobre beneficios extras. Beneficios disponibles para ${category}: ${extraBenefits.map(b => b.name).join(', ')}. Explica qué beneficios puede agregar y cómo funcionan.`;
            }
            return `El usuario pregunta sobre beneficios extras. Explica los beneficios adicionales disponibles según el tipo de seguro que elija.`;
        }
        
        // Consultas sobre comparaciones
        if (input.includes('mejor') || input.includes('recomendación') || input.includes('cuál') || input.includes('diferencia')) {
            return `El usuario busca recomendaciones o comparaciones. Analiza sus necesidades y recomienda el mejor seguro y plan. Compara opciones de forma clara y justifica tus recomendaciones.`;
        }
        
        return null; // No hay contexto específico necesario
    }
    
    // Configuración de los eventos del chat
    if (chatSubmit) {
        chatSubmit.addEventListener('click', handleChatSubmit);
    }
    
    if (chatInput) {
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) { // Enter envía el mensaje (Shift+Enter hace salto de línea)
                e.preventDefault();
                handleChatSubmit();
            }
        });
    }

    // Función para manejar la selección de opciones de transporte
    function handleTransportOptionClick(option) {
        console.log('Opción de transporte seleccionada:', option);
        // Aquí se podría agregar lógica para filtrar planes según la opción
    }

    // Al final, carga las imágenes de transporte y tecnología cuando la página esté lista
    loadTransportImages();
    loadTechnologyImages();
});