document.addEventListener('DOMContentLoaded', function() {

    // ==================== Lógica para la página de Login ====================
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');
            const message = document.getElementById('message');

            const username = usernameInput.value;
            const password = passwordInput.value;

            if (username === 'admin' && password === '123') {

                window.location.href = '../index.html';
            } else {
                message.textContent = 'Usuario o contraseña incorrectos.';
            }
        });
    }

    // ==================== Lógica para la página de Trivia ====================
    const triviaPage = document.querySelector('.trivia-page');
    if (triviaPage) {
        const questions = [
            { question: "¿Qué es un sismo?", options: ["Un movimiento de aire", "Un movimiento brusco de la corteza terrestre", "Una tormenta de nieve", "Una erupción volcánica"], answer: "Un movimiento brusco de la corteza terrestre" },
            { question: "¿Cuál es el nombre del cinturón de fallas sísmicas que rodea el Océano Pacífico?", options: ["El Cinturón del Atlántico", "El Cinturón de Fuego del Pacífico", "La Cordillera de los Andes", "El Cinturón de África"], answer: "El Cinturón de Fuego del Pacífico" },
            { question: "¿Qué es un tsunami?", options: ["Una tormenta de arena", "Una ola gigante causada por un terremoto submarino", "Un tipo de huracán", "Un volcán en erupción"], answer: "Una ola gigante causada por un terremoto submarino" },
            { question: "¿Qué objeto no debería faltar en un kit de emergencia?", options: ["Una televisión", "Un paraguas", "Un botiquín de primeros auxilios", "Un balón de fútbol"], answer: "Un botiquín de primeros auxilios" },
            { question: "¿Qué debes hacer si estás atrapado en un edificio durante un sismo?", options: ["Correr hacia las escaleras", "Quedarte quieto y buscar refugio", "Lanzarte por la ventana", "Gritar con todas tus fuerzas"], answer: "Quedarte quieto y buscar refugio" },
            { question: "¿Qué se mide con la escala de Richter?", options: ["La velocidad del viento", "La temperatura", "La magnitud de un sismo", "La fuerza de un huracán"], answer: "La magnitud de un sismo" },
            { question: "¿Cuál es la capital de Nicaragua, una zona con alta actividad sísmica?", options: ["Granada", "León", "Managua", "Masaya"], answer: "Managua" },
            { question: "¿Qué se debe hacer si se produce un huracán?", options: ["Salir a la playa", "Proteger puertas y ventanas", "Ignorar las advertencias", "Pasear en bicicleta"], answer: "Proteger puertas y ventanas" },
            { question: "¿Qué es una inundación?", options: ["Un período de sequía", "Un desbordamiento de agua que cubre la tierra", "Un terremoto", "Una tormenta eléctrica"], answer: "Un desbordamiento de agua que cubre la tierra" },
            { question: "¿Es posible predecir cuándo ocurrirá un sismo?", options: ["Sí, con 100% de precisión", "No, es imposible", "Solo los científicos pueden", "Solo con la luna llena"], answer: "No, es imposible" },
            { question: "¿Qué es el epicentro de un sismo?", options: ["El lugar donde las personas viven", "El punto en la superficie de la Tierra directamente encima del foco del sismo", "El lugar más profundo del sismo", "El final del movimiento"], answer: "El punto en la superficie de la Tierra directamente encima del foco del sismo" },
            { question: "¿Qué debes hacer si hueles a gas durante un sismo?", options: ["Encender una vela para ver mejor", "Correr a encender las luces", "Abrir las ventanas y cerrar la llave de paso de gas", "Ignorarlo"], answer: "Abrir las ventanas y cerrar la llave de paso de gas" },
            { question: "¿Qué es la 'zona de subducción'?", options: ["Una zona de relajación", "Una zona donde una placa tectónica se desliza bajo otra", "Un área de la playa", "El centro de un volcán"], answer: "Una zona donde una placa tectónica se desliza bajo otra" },
            { question: "¿Qué tipo de desastre natural es causado por una erupción volcánica?", options: ["Inundación", "Sismo", "Flujo de lava", "Tornado"], answer: "Flujo de lava" },
            { question: "¿Qué es un tornado?", options: ["Un sismo", "Una tormenta con vientos giratorios y en forma de embudo", "Un tipo de huracán", "Una inundación"], answer: "Una tormenta con vientos giratorios y en forma de embudo" }
        ];

        let currentQuestionIndex = 0;
        let score = 0;
        const questionText = document.getElementById('question-text');
        const optionsContainer = document.getElementById('options-container');
        const nextBtn = document.getElementById('next-btn');
        const resultMessage = document.getElementById('result-message');

        function loadQuestion() {
            if (currentQuestionIndex < questions.length) {
                const currentQuestion = questions[currentQuestionIndex];
                questionText.textContent = currentQuestion.question;
                optionsContainer.innerHTML = '';
                resultMessage.textContent = '';
                nextBtn.style.display = 'none';

                currentQuestion.options.forEach(option => {
                    const button = document.createElement('button');
                    button.classList.add('option-btn');
                    button.textContent = option;
                    button.addEventListener('click', () => checkAnswer(button, option, currentQuestion.answer));
                    optionsContainer.appendChild(button);
                });
            } else {
                questionText.textContent = `¡Has completado la trivia! Tu puntuación final es: ${score} de ${questions.length}`;
                optionsContainer.innerHTML = '';
                resultMessage.textContent = "¡Felicidades por haber completado la trivia!";
                
                const restartBtn = document.createElement('button');
                restartBtn.textContent = 'Volver a Jugar';
                restartBtn.classList.add('option-btn');
                restartBtn.addEventListener('click', restartGame);
                optionsContainer.appendChild(restartBtn);
            }
        }

        function checkAnswer(button, selectedOption, correctAnswer) {
            if (selectedOption === correctAnswer) {
                button.classList.add('correct');
                resultMessage.textContent = "¡Respuesta Correcta! 🎉";
                score++;
            } else {
                button.classList.add('wrong');
                resultMessage.textContent = "Respuesta Incorrecta. 😥";
                Array.from(optionsContainer.children).forEach(btn => {
                    if (btn.textContent === correctAnswer) {
                        btn.classList.add('correct');
                    }
                });
            }
            
            Array.from(optionsContainer.children).forEach(btn => btn.disabled = true);
            
            nextBtn.style.display = 'block';
        }

        function restartGame() {
            currentQuestionIndex = 0;
            score = 0;
            loadQuestion();
        }

        nextBtn.addEventListener('click', () => {
            currentQuestionIndex++;
            loadQuestion();
        });

        window.onload = loadQuestion;
    }

// ==================== Lógica para la página de Reportes ====================
    const reportPage = document.querySelector('.report-page-container');
    if (reportPage) {
        let map = null;
        let reportMarker = null; // Marcador arrastrable para la ubicación del reporte
        const reportForm = document.getElementById('report-form');
        const locationInput = document.getElementById('location');

        // 🟢 Inicializar el mapa al cargar la página
        const mapContainer = document.getElementById('map-container');
        if (mapContainer) {
            map = L.map('map-container').setView([12.1364, -85.2072], 7); // Coordenadas centradas en Nicaragua por defecto

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            // 🟢 Usar la API de geolocalización para encontrar la ubicación del usuario
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    function(position) {
                        const lat = position.coords.latitude;
                        const lon = position.coords.longitude;
                        const userLocation = [lat, lon];

                        // Centrar el mapa en la ubicación del usuario con un zoom más cercano
                        map.setView(userLocation, 18);

                        // Añadir un marcador arrastrable en la ubicación del usuario
                        reportMarker = L.marker(userLocation, {
                                draggable: true
                            }).addTo(map)
                            .bindPopup('Arrastra este marcador para afinar la ubicación del reporte.')
                            .openPopup();

                        // Llamar a la función para actualizar con coordenadas al inicio
                        updateLocationInput(userLocation);

                        // Evento para actualizar con coordenadas cuando el marcador se arrastra
                        reportMarker.on('dragend', function(event) {
                            const markerLatLng = event.target.getLatLng();
                            updateLocationInput([markerLatLng.lat, markerLatLng.lng]);
                        });
                    },
                    function(error) {
                        console.error("Error al obtener la ubicación:", error.message);
                        // Si falla, creamos el marcador en el centro de Nicaragua por defecto
                        const defaultLocation = [12.1364, -85.2072];
                        reportMarker = L.marker(defaultLocation, {
                                draggable: true
                            }).addTo(map)
                            .bindPopup('Arrastra este marcador para afinar la ubicación del reporte.')
                            .openPopup();
                        updateLocationInput(defaultLocation);
                        reportMarker.on('dragend', function(event) {
                            const markerLatLng = event.target.getLatLng();
                            updateLocationInput([markerLatLng.lat, markerLatLng.lng]);
                        });
                    }, {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0
                    }
                );
            } else {
                console.log("Geolocalización no está disponible en este navegador.");
                const defaultLocation = [12.1364, -85.2072];
                reportMarker = L.marker(defaultLocation, {
                        draggable: true
                    }).addTo(map)
                    .bindPopup('Arrastra este marcador para afinar la ubicación del reporte.')
                    .openPopup();
                updateLocationInput(defaultLocation);
                reportMarker.on('dragend', function(event) {
                    const markerLatLng = event.target.getLatLng();
                    updateLocationInput([markerLatLng.lat, markerLatLng.lng]);
                });
            }

            // Forzar la renderización del mapa
            map.invalidateSize();
        }

        // 🟢 Función para actualizar el input con las coordenadas
        function updateLocationInput(latLng) {
            const [lat, lon] = latLng;
            locationInput.value = `${lat.toFixed(6)}, ${lon.toFixed(6)}`;
        }

        if (reportForm) {
            reportForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const disasterType = document.getElementById('disasterType').value;
                const location = locationInput.value;
                const details = document.getElementById('details').value;
                const message = document.getElementById('message');

                // Aquí puedes enviar los datos al servidor.
                // Por ahora, solo los mostraremos en la consola y una alerta.
                console.log("Reporte Enviado:");
                console.log(`Tipo de Desastre: ${disasterType}`);
                console.log(`Coordenadas: ${location}`);
                console.log(`Detalles: ${details}`);

                alert("¡Reporte enviado con éxito! Gracias por tu colaboración.");
            });
        }
    }
    // ==================== Lógica para el Chatbot ====================
    const chatBox = document.getElementById('chat-box');
    if (chatBox) {
        const userInput = document.getElementById('user-input');
        const sendBtn = document.getElementById('send-btn');
        const responses = {
            "que es un sismo": "Un sismo es un movimiento brusco y repentino de la corteza terrestre, causado por la liberación de energía acumulada en las fallas geológicas.",
            "que es un huracan": "Un huracán es un tipo de tormenta tropical que se forma sobre aguas oceánicas cálidas. Se caracteriza por vientos fuertes y lluvias intensas.",
            "a quien debo llamar": "En caso de un desastre natural, debes llamar a los servicios de emergencia de tu localidad. En Nicaragua, puedes contactar a la Defensa Civil, la Cruz Roja o la Policía Nacional.",
            "kit de emergencia": "Un kit de emergencia debe contener: agua, alimentos no perecederos, un botiquín de primeros auxilios, una linterna, radio con baterías, un silbato, y tus documentos importantes.",
            "como actuar en un sismo": "Durante un sismo, agáchate, cúbrete debajo de un objeto resistente y agárrate. Mantén la calma y aléjate de ventanas y objetos que puedan caer.",
            "que es un tsunami": "Un tsunami es una serie de olas gigantes en el océano, causadas por un terremoto, una erupción volcánica o un deslizamiento de tierra submarino.",
            "que es una inundacion": "Una inundación es el desbordamiento de agua que cubre un área que normalmente está seca. Puede ser causada por fuertes lluvias, ríos desbordados o tsunamis.",
            "que es el cinturon de fuego": "El Cinturón de Fuego del Pacífico es una zona con alta actividad sísmica y volcánica que rodea el Océano Pacífico. Nicaragua se encuentra en esta zona.",
            "como prepararse para un huracan": "Para prepararte para un huracán, asegura puertas y ventanas, ten un kit de emergencia a mano, y mantente informado a través de los medios oficiales.",
            "riesgos de nicaragua": "Los principales desastres naturales en Nicaragua son sismos, erupciones volcánicas, huracanes e inundaciones debido a su ubicación geográfica y su clima tropical."
        };

        function addMessage(text, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message');
            if (sender === 'user') {
                messageDiv.classList.add('user-message');
            } else {
                messageDiv.classList.add('bot-message');
            }
            messageDiv.textContent = text;
            chatBox.appendChild(messageDiv);
            chatBox.scrollTop = chatBox.scrollHeight;
        }

        function getBotResponse(userMessage) {
            const cleanedMessage = userMessage.toLowerCase().trim().replace(/[¿?¡!.,]/g, '');
            const response = responses[cleanedMessage] || "Lo siento, no entiendo esa pregunta. Intenta preguntar sobre sismos, huracanes, o el kit de emergencia.";
            return response;
        }

        function sendMessage() {
            const userMessage = userInput.value;
            if (userMessage.trim() === "") return;
            addMessage(userMessage, 'user');
            userInput.value = '';
            setTimeout(() => {
                const botResponse = getBotResponse(userMessage);
                addMessage(botResponse, 'bot');
            }, 500);
        }

        if (sendBtn && userInput) {
            sendBtn.addEventListener('click', sendMessage);
            userInput.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    sendMessage();
                }
            });
        }
    }
});