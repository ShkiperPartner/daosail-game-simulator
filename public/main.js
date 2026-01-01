class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Принудительно скрыть загрузку, так как нет файлов для загрузки
        document.getElementById('loading').style.display = 'none';
    }

    create() {
        this.scene.start('MenuScene');
    }
}

class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        this.add.text(centerX, centerY - 120, 'DAOsail Simulator', {
            fontSize: '28px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        this.add.text(centerX, centerY - 85, 'Правила расхождения яхт', {
            fontSize: '16px',
            fill: '#4a90e2',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        this.add.text(centerX, centerY - 55, 'Выберите модуль для изучения:', {
            fontSize: '18px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Модуль COLREGs 12
        const module12Button = this.add.text(centerX, centerY - 20, 'COLREGs 12: Встречные парусные суда', {
            fontSize: '16px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            backgroundColor: '#27ae60',
            padding: { x: 15, y: 8 }
        }).setOrigin(0.5).setInteractive();

        module12Button.on('pointerdown', () => {
            this.scene.start('ScenarioScene', { moduleId: 'colregs_12' });
        });

        module12Button.on('pointerover', () => {
            module12Button.setStyle({ backgroundColor: '#219a52' });
        });

        module12Button.on('pointerout', () => {
            module12Button.setStyle({ backgroundColor: '#27ae60' });
        });

        // Модуль COLREGs 13
        const module13Button = this.add.text(centerX, centerY + 20, 'COLREGs 13: Обгон судов', {
            fontSize: '16px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            backgroundColor: '#e67e22',
            padding: { x: 15, y: 8 }
        }).setOrigin(0.5).setInteractive();

        module13Button.on('pointerdown', () => {
            this.scene.start('ScenarioScene', { moduleId: 'colregs_13' });
        });

        module13Button.on('pointerover', () => {
            module13Button.setStyle({ backgroundColor: '#d35400' });
        });

        module13Button.on('pointerout', () => {
            module13Button.setStyle({ backgroundColor: '#e67e22' });
        });

        // Модуль COLREGs 14
        const module14Button = this.add.text(centerX, centerY + 60, 'COLREGs 14: Встречные курсы судов', {
            fontSize: '16px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            backgroundColor: '#8e44ad',
            padding: { x: 15, y: 8 }
        }).setOrigin(0.5).setInteractive();

        module14Button.on('pointerdown', () => {
            this.scene.start('ScenarioScene', { moduleId: 'colregs_14' });
        });

        module14Button.on('pointerover', () => {
            module14Button.setStyle({ backgroundColor: '#732d91' });
        });

        module14Button.on('pointerout', () => {
            module14Button.setStyle({ backgroundColor: '#8e44ad' });
        });

        // Модуль COLREGs 15
        const module15Button = this.add.text(centerX, centerY + 100, 'COLREGs 15: Пересечение курсов', {
            fontSize: '16px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            backgroundColor: '#e74c3c',
            padding: { x: 15, y: 8 }
        }).setOrigin(0.5).setInteractive();

        module15Button.on('pointerdown', () => {
            this.scene.start('ScenarioScene', { moduleId: 'colregs_15' });
        });

        module15Button.on('pointerover', () => {
            module15Button.setStyle({ backgroundColor: '#c0392b' });
        });

        module15Button.on('pointerout', () => {
            module15Button.setStyle({ backgroundColor: '#e74c3c' });
        });

        // Кнопка Quiz режима
        const quizButton = this.add.text(centerX, centerY + 150, '🎯 Режим QUIZ', {
            fontSize: '18px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            backgroundColor: '#9b59b6',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();

        quizButton.on('pointerdown', () => {
            // Показать меню выбора модуля для квиза
            this.showQuizModuleSelection();
        });

        quizButton.on('pointerover', () => {
            quizButton.setStyle({ backgroundColor: '#8e44ad' });
            quizButton.setScale(1.05);
        });

        quizButton.on('pointerout', () => {
            quizButton.setStyle({ backgroundColor: '#9b59b6' });
            quizButton.setScale(1);
        });

        // Информация внизу
        this.add.text(centerX, centerY + 200, 'Quiz режим: серия из 5 вопросов подряд', {
            fontSize: '12px',
            fill: '#95a5a6',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
        
        this.add.text(centerX, centerY + 220, 'Для прохождения модуля нужно 80% правильных ответов', {
            fontSize: '11px',
            fill: '#7f8c8d',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
    }

    showQuizModuleSelection() {
        // Затемняем фон
        const overlay = this.add.rectangle(this.cameras.main.width / 2, this.cameras.main.height / 2, 
            this.cameras.main.width, this.cameras.main.height, 0x000000, 0.8);

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // Заголовок
        const title = this.add.text(centerX, centerY - 100, 'Выберите модуль для Quiz', {
            fontSize: '24px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            fontWeight: 'bold'
        }).setOrigin(0.5);

        // Кнопки модулей
        const quiz12Button = this.add.text(centerX, centerY - 30, 'Quiz: COLREGs 12 - Встречные суда', {
            fontSize: '18px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            backgroundColor: '#27ae60',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();

        quiz12Button.on('pointerdown', () => {
            this.scene.start('ScenarioScene', { moduleId: 'colregs_12', isQuizMode: true });
        });

        const quiz13Button = this.add.text(centerX, centerY + 30, 'Quiz: COLREGs 13 - Обгон судов', {
            fontSize: '18px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            backgroundColor: '#e67e22',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();

        quiz13Button.on('pointerdown', () => {
            this.scene.start('ScenarioScene', { moduleId: 'colregs_13', isQuizMode: true });
        });

        const quiz14Button = this.add.text(centerX, centerY + 90, 'Quiz: COLREGs 14 - Встречные курсы', {
            fontSize: '18px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            backgroundColor: '#8e44ad',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();

        quiz14Button.on('pointerdown', () => {
            this.scene.start('ScenarioScene', { moduleId: 'colregs_14', isQuizMode: true });
        });

        const quiz15Button = this.add.text(centerX, centerY + 150, 'Quiz: COLREGs 15 - Пересечение курсов', {
            fontSize: '18px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            backgroundColor: '#e74c3c',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();

        quiz15Button.on('pointerdown', () => {
            this.scene.start('ScenarioScene', { moduleId: 'colregs_15', isQuizMode: true });
        });

        // Кнопка закрытия
        const closeButton = this.add.text(centerX, centerY + 210, 'Отмена', {
            fontSize: '16px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            backgroundColor: '#95a5a6',
            padding: { x: 15, y: 8 }
        }).setOrigin(0.5).setInteractive();

        closeButton.on('pointerdown', () => {
            overlay.destroy();
            title.destroy();
            quiz12Button.destroy();
            quiz13Button.destroy();
            quiz14Button.destroy();
            quiz15Button.destroy();
            closeButton.destroy();
        });

        // Hover эффекты
        [quiz12Button, quiz13Button, quiz14Button, quiz15Button, closeButton].forEach(button => {
            button.on('pointerover', () => button.setScale(1.05));
            button.on('pointerout', () => button.setScale(1));
        });
    }
}

class ScenarioScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ScenarioScene' });
        this.currentScenario = null;
        this.scenarioIndex = 0;
        this.score = 0;
        this.totalQuestions = 5;
        this.answered = false;
        this.moduleId = 'colregs_12';
        this.moduleData = null;
    }

    init(data) {
        if (data.moduleId) {
            this.moduleId = data.moduleId;
        }
        if (data.scenarioIndex !== undefined) {
            this.scenarioIndex = data.scenarioIndex;
        } else {
            // Если новый модуль - сбрасываем индекс
            this.scenarioIndex = 0;
        }
        if (data.score !== undefined) {
            this.score = data.score;
        } else {
            // Если новый модуль - сбрасываем очки
            this.score = 0;
        }
        // Поддержка Quiz режима
        this.isQuizMode = data.isQuizMode || false;
    }

    async create() {
        this.answered = false;
        await this.loadModuleData();
        this.loadScenario();
        this.createUI();
    }

    async loadModuleData() {
        try {
            const response = await fetch(`data/${this.moduleId}.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.moduleData = await response.json();
            console.log(`Loaded module ${this.moduleId} with ${this.moduleData.scenarios.length} scenarios`);
        } catch (error) {
            console.error(`Failed to load JSON data for ${this.moduleId}:`, error);

            // Пробуем использовать fallback только для известных модулей
            if (this.moduleId === 'colregs_12' || this.moduleId === 'colregs_13') {
                console.warn(`Using fallback data for ${this.moduleId}`);
                this.moduleData = this.getFallbackData();
            } else {
                // Для остальных модулей показываем ошибку
                const errorMsg = error.message || 'Network error';
                this.showErrorModal(`Ошибка: ${errorMsg}`);
                return; // Прерываем создание сцены
            }
        }
    }

    getFallbackData() {
        if (this.moduleId === 'colregs_13') {
            return {
                module: {
                    id: "colregs_13",
                    title: "COLREGs 13: Обгон судов",
                    description: "Изучение правил обгона",
                    rule: "COLREGs 13",
                    passingScore: 80
                },
                scenarios: [
                    {
                        "id": "s101",
                        "title": "Обгон с правого борта",
                        "rule": "COLREGs 13",
                        "goal": "Вы управляете судном А и обгоняете судно B с правого борта. Что должно сделать ВАШЕ судно?",
                        "initial": {
                            "boats": [
                                { "id": "А (ВЫ)", "course": 10, "speed": 6, "x": 500, "y": 320, "isPlayer": true },
                                { "id": "B", "course": 0, "speed": 4, "x": 450, "y": 300, "isPlayer": false }
                            ],
                            "wind": { "direction": 90, "strength": 8 }
                        },
                        "options": [
                            "Продолжить обгон справа",
                            "Снизить скорость и следовать за судном B",
                            "Обогнать слева"
                        ],
                        "answer": 0,
                        "explain": "Правильно! Согласно COLREGs 13, обгоняющее судно должно держаться в стороне от обгоняемого. Начав обгон справа, продолжайте этот маневр.",
                        "refs": ["COLREGs §13"]
                    },
                    {
                        "id": "s102",
                        "title": "Обгон с левого борта",
                        "rule": "COLREGs 13", 
                        "goal": "Вы управляете судном А и приближаетесь к судну B сзади слева. Что должно сделать ВАШЕ судно?",
                        "initial": {
                            "boats": [
                                { "id": "А (ВЫ)", "course": 350, "speed": 6, "x": 480, "y": 280, "isPlayer": true },
                                { "id": "B", "course": 0, "speed": 4, "x": 500, "y": 300, "isPlayer": false }
                            ],
                            "wind": { "direction": 270, "strength": 8 }
                        },
                        "options": [
                            "Продолжить обгон слева",
                            "Перейти на правый борт для обгона",
                            "Снизить скорость"
                        ],
                        "answer": 0,
                        "explain": "Правильно! Обгоняющее судно может выбрать любую сторону для обгона, но должно держаться в стороне. Начав обгон слева, продолжайте безопасно.",
                        "refs": ["COLREGs §13"]
                    },
                    {
                        "id": "s103",
                        "title": "Сомнительная ситуация обгона",
                        "rule": "COLREGs 13",
                        "goal": "Вы управляете судном А и не уверены, является ли ваша позиция обгоном. Что делать?",
                        "initial": {
                            "boats": [
                                { "id": "А (ВЫ)", "course": 15, "speed": 5, "x": 450, "y": 290, "isPlayer": true },
                                { "id": "B", "course": 0, "speed": 4, "x": 500, "y": 300, "isPlayer": false }
                            ],
                            "wind": { "direction": 45, "strength": 10 }
                        },
                        "options": [
                            "Считать себя обгоняющим и действовать соответственно",
                            "Считать это пересечением курсов",
                            "Подать звуковой сигнал для уточнения"
                        ],
                        "answer": 0,
                        "explain": "Правильно! При сомнениях судно должно считать себя обгоняющим и действовать согласно правилу 13 - держаться в стороне.",
                        "refs": ["COLREGs §13"]
                    },
                    {
                        "id": "s104",
                        "title": "Обгон в узком проходе",
                        "rule": "COLREGs 13",
                        "goal": "Вы обгоняете судно B в узком канале. Судно B может безопасно уступить место. Что делать?",
                        "initial": {
                            "boats": [
                                { "id": "А (ВЫ)", "course": 0, "speed": 6, "x": 380, "y": 300, "isPlayer": true },
                                { "id": "B", "course": 0, "speed": 3, "x": 450, "y": 300, "isPlayer": false }
                            ],
                            "wind": { "direction": 180, "strength": 6 }
                        },
                        "options": [
                            "Подать 2 длинных + 2 коротких сигнала, ждать ответа",
                            "Обогнать без сигналов",
                            "Снизить скорость до скорости судна B"
                        ],
                        "answer": 0,
                        "explain": "Правильно! В узких проходах для безопасного обгона нужно подать соответствующий звуковой сигнал и получить разрешение обгоняемого судна.",
                        "refs": ["COLREGs §13", "COLREGs §9"]
                    },
                    {
                        "id": "s105",
                        "title": "Обгон парусного судна моторным",
                        "rule": "COLREGs 13",
                        "goal": "Вы на моторном судне А обгоняете парусное судно B. Кто должен уступить дорогу?",
                        "initial": {
                            "boats": [
                                { "id": "А (ВЫ) - мотор", "course": 5, "speed": 8, "x": 400, "y": 320, "isPlayer": true },
                                { "id": "B - парус", "course": 0, "speed": 4, "x": 500, "y": 300, "isPlayer": false }
                            ],
                            "wind": { "direction": 315, "strength": 12 }
                        },
                        "options": [
                            "Вы должны уступить как обгоняющее судно", 
                            "Парусник должен уступить моторному судну",
                            "Применяется правило правого борта"
                        ],
                        "answer": 0,
                        "explain": "Правильно! Правило обгона (13) имеет приоритет над правилом 'парус-мотор' (18). Обгоняющее судно всегда должно держаться в стороне.",
                        "refs": ["COLREGs §13", "COLREGs §18"]
                    }
                ]
            };
        } else if (this.moduleId === 'colregs_14') {
            return {
                module: {
                    id: "colregs_14",
                    title: "COLREGs 14: Встречные курсы судов",
                    description: "Изучение правил расхождения судов при встречных курсах",
                    rule: "COLREGs 14",
                    passingScore: 80
                },
                scenarios: [
                    {
                        "id": "s201",
                        "title": "Прямое встречное сближение",
                        "rule": "COLREGs 14",
                        "goal": "Вы управляете судном А и идете прямо навстречу судну B. Что должно сделать ВАШЕ судно?",
                        "initial": {
                            "boats": [
                                { "id": "А (ВЫ)", "course": 0, "speed": 5, "x": 400, "y": 200, "isPlayer": true },
                                { "id": "B", "course": 180, "speed": 5, "x": 400, "y": 400, "isPlayer": false }
                            ],
                            "wind": { "direction": 90, "strength": 12 }
                        },
                        "options": [
                            "Изменить курс вправо",
                            "Изменить курс влево", 
                            "Сохранить курс"
                        ],
                        "answer": 0,
                        "explain": "Правильно! При встречном сближении оба судна должны изменить курс вправо согласно COLREGs 14.",
                        "refs": ["COLREGs §14"]
                    },
                    {
                        "id": "s202", 
                        "title": "Встречное сближение под углом",
                        "rule": "COLREGs 14",
                        "goal": "Вы управляете судном А и сближаетесь с судном B под небольшим углом. Что должно сделать ВАШЕ судно?",
                        "initial": {
                            "boats": [
                                { "id": "А (ВЫ)", "course": 350, "speed": 4, "x": 350, "y": 200, "isPlayer": true },
                                { "id": "B", "course": 170, "speed": 4, "x": 450, "y": 400, "isPlayer": false }
                            ],
                            "wind": { "direction": 45, "strength": 10 }
                        },
                        "options": [
                            "Изменить курс вправо",
                            "Изменить курс влево",
                            "Увеличить скорость"
                        ],
                        "answer": 0,
                        "explain": "Верно! Даже при небольшом угле встречи оба судна должны отклониться вправо для безопасного расхождения.",
                        "refs": ["COLREGs §14"]
                    },
                    {
                        "id": "s203",
                        "title": "Встреча на пересекающихся курсах",
                        "rule": "COLREGs 14", 
                        "goal": "Вы управляете судном А. Судно B идет встречным курсом с правого борта. Что должно сделать ВАШЕ судно?",
                        "initial": {
                            "boats": [
                                { "id": "А (ВЫ)", "course": 45, "speed": 5, "x": 300, "y": 300, "isPlayer": true },
                                { "id": "B", "course": 225, "speed": 5, "x": 500, "y": 200, "isPlayer": false }
                            ],
                            "wind": { "direction": 270, "strength": 8 }
                        },
                        "options": [
                            "Изменить курс вправо",
                            "Изменить курс влево",
                            "Снизить скорость"
                        ],
                        "answer": 0,
                        "explain": "Правильно! При пересекающихся встречных курсах оба судна должны отклониться вправо от первоначальных курсов.",
                        "refs": ["COLREGs §14"]
                    },
                    {
                        "id": "s204",
                        "title": "Встреча в узкости",
                        "rule": "COLREGs 14",
                        "goal": "Вы управляете судном А в узком проходе. Встречное судно B приближается. Что должно сделать ВАШЕ судно?",
                        "initial": {
                            "boats": [
                                { "id": "А (ВЫ)", "course": 90, "speed": 3, "x": 200, "y": 300, "isPlayer": true },
                                { "id": "B", "course": 270, "speed": 3, "x": 600, "y": 300, "isPlayer": false }
                            ],
                            "wind": { "direction": 0, "strength": 6 }
                        },
                        "options": [
                            "Изменить курс вправо насколько позволяет узкость",
                            "Остановиться и ждать",
                            "Изменить курс влево"
                        ],
                        "answer": 0,
                        "explain": "Верно! В узкости применяются те же правила - отклонение вправо насколько позволяют обстоятельства.",
                        "refs": ["COLREGs §14", "COLREGs §9"]
                    },
                    {
                        "id": "s205",
                        "title": "Встреча при сильном ветре",
                        "rule": "COLREGs 14",
                        "goal": "Вы управляете судном А при сильном ветре. Встречное судно B на collision course. Что должно сделать ВАШЕ судно?",
                        "initial": {
                            "boats": [
                                { "id": "А (ВЫ)", "course": 315, "speed": 6, "x": 300, "y": 250, "isPlayer": true },
                                { "id": "B", "course": 135, "speed": 6, "x": 500, "y": 350, "isPlayer": false }
                            ],
                            "wind": { "direction": 225, "strength": 18 }
                        },
                        "options": [
                            "Изменить курс вправо, несмотря на ветер",
                            "Привестись к ветру (курс влево)",
                            "Уменьшить парусность и ждать"
                        ],
                        "answer": 0,
                        "explain": "Правильно! COLREGs 14 действует независимо от силы ветра - оба судна должны отклониться вправо для безопасного расхождения.",
                        "refs": ["COLREGs §14"]
                    }
                ]
            };
        } else if (this.moduleId === 'colregs_15') {
            return {
                module: {
                    id: "colregs_15",
                    title: "COLREGs 15: Пересечение курсов",
                    description: "Изучение правил пересечения курсов судов с механическим двигателем",
                    rule: "COLREGs 15",
                    passingScore: 80
                },
                scenarios: [
                    {
                        "id": "s301",
                        "title": "Судно справа по борту",
                        "rule": "COLREGs 15",
                        "goal": "Вы управляете моторным судном А. Моторное судно B приближается справа по борту. Что должно сделать ВАШЕ судно?",
                        "initial": {
                            "boats": [
                                { "id": "А (ВЫ) - мотор", "course": 0, "speed": 8, "x": 350, "y": 350, "isPlayer": true },
                                { "id": "B - мотор", "course": 270, "speed": 8, "x": 500, "y": 250, "isPlayer": false }
                            ],
                            "wind": { "direction": 180, "strength": 5 }
                        },
                        "options": [
                            "Уступить дорогу - изменить курс или снизить скорость",
                            "Сохранить курс и скорость",
                            "Подать звуковой сигнал и ждать"
                        ],
                        "answer": 0,
                        "explain": "Правильно! По COLREGs 15, судно видящее другое справа по борту должно уступить дорогу.",
                        "refs": ["COLREGs §15"]
                    },
                    {
                        "id": "s302", 
                        "title": "Парусное против моторного - судно слева",
                        "rule": "COLREGs 15",
                        "goal": "Вы управляете парусным судном А. Моторное судно B приближается слева по борту. Что должно сделать ВАШЕ судно?",
                        "initial": {
                            "boats": [
                                { "id": "А (ВЫ)", "course": 45, "speed": 5, "x": 400, "y": 300, "isPlayer": true },
                                { "id": "B - мотор", "course": 315, "speed": 7, "x": 300, "y": 200, "isPlayer": false }
                            ],
                            "wind": { "direction": 90, "strength": 10 }
                        },
                        "options": [
                            "Сохранить курс - парус имеет преимущество",
                            "Уступить дорогу моторному судну",
                            "Изменить курс влево"
                        ],
                        "answer": 0,
                        "explain": "Верно! Парусное судно имеет преимущество перед моторным (COLREGs 18). Моторное судно должно уступить дорогу.",
                        "refs": ["COLREGs §15", "COLREGs §18"]
                    },
                    {
                        "id": "s303",
                        "title": "Парусное судно пересекает курс моторного",
                        "rule": "COLREGs 15", 
                        "goal": "Вы управляете моторным судном А. Парусное судно B пересекает ваш курс справа. Что должно сделать ВАШЕ судно?",
                        "initial": {
                            "boats": [
                                { "id": "А (ВЫ) - мотор", "course": 0, "speed": 8, "x": 350, "y": 350, "isPlayer": true },
                                { "id": "B - парус", "course": 270, "speed": 6, "x": 500, "y": 250, "isPlayer": false }
                            ],
                            "wind": { "direction": 315, "strength": 10 }
                        },
                        "options": [
                            "Уступить дорогу парусному судну",
                            "Сохранить курс - моторное судно имеет преимущество",
                            "Подать сигнал и ждать"
                        ],
                        "answer": 0,
                        "explain": "Правильно! Моторное судно должно уступить дорогу парусному (COLREGs 18), даже если парусное справа.",
                        "refs": ["COLREGs §15", "COLREGs §18"]
                    },
                    {
                        "id": "s304",
                        "title": "Пересечение в узкости",
                        "rule": "COLREGs 15",
                        "goal": "Вы управляете моторным судном А в узком канале. Судно B пересекает канал справа. Что должно сделать ВАШЕ судно?",
                        "initial": {
                            "boats": [
                                { "id": "А (ВЫ) - мотор", "course": 90, "speed": 4, "x": 250, "y": 300, "isPlayer": true },
                                { "id": "B - мотор", "course": 180, "speed": 5, "x": 450, "y": 150, "isPlayer": false }
                            ],
                            "wind": { "direction": 0, "strength": 6 }
                        },
                        "options": [
                            "Уступить дорогу насколько позволяет канал",
                            "Сохранить курс - канал дает преимущество",
                            "Остановиться и ждать"
                        ],
                        "answer": 0,
                        "explain": "Верно! COLREGs 15 действует и в узкости - судно справа по борту имеет преимущество.",
                        "refs": ["COLREGs §15", "COLREGs §9"]
                    },
                    {
                        "id": "s305",
                        "title": "Сомнительная ситуация пересечения",
                        "rule": "COLREGs 15",
                        "goal": "Вы управляете моторным судном А. Не уверены, пересекает ли судно B ваш курс справа. Что должно сделать ВАШЕ судно?",
                        "initial": {
                            "boats": [
                                { "id": "А (ВЫ) - мотор", "course": 45, "speed": 6, "x": 300, "y": 300, "isPlayer": true },
                                { "id": "B - мотор", "course": 315, "speed": 6, "x": 480, "y": 220, "isPlayer": false }
                            ],
                            "wind": { "direction": 135, "strength": 10 }
                        },
                        "options": [
                            "Считать что судно пересекает курс и уступить дорогу",
                            "Сохранить курс пока не станет ясно",
                            "Подать сигнал и ждать ответа"
                        ],
                        "answer": 0,
                        "explain": "Правильно! При сомнениях следует считать ситуацию пересечением курсов и уступить дорогу судну справа.",
                        "refs": ["COLREGs §15", "COLREGs §5"]
                    }
                ]
            };
        }
        
        // Fallback для COLREGs 12
        return {
            module: {
                id: "colregs_12",
                title: "COLREGs 12: Встречные парусные суда",
                description: "Изучение правил расхождения парусных судов при встречных курсах",
                rule: "COLREGs 12",
                passingScore: 80
            },
            scenarios: [
                {
                    "id": "s001",
                    "title": "Встречный курс - левый галс уступает",
                    "rule": "COLREGs 12",
                    "goal": "Вы управляете судном А (левое). Два парусника идут встречными курсами. Что должно сделать ВАШЕ судно?",
                    "initial": {
                        "boats": [
                            { "id": "А (ВЫ)", "course": 0, "speed": 4, "x": 200, "y": 300, "isPlayer": true },
                            { "id": "B", "course": 180, "speed": 4, "x": 600, "y": 300, "isPlayer": false }
                        ],
                        "wind": { "direction": 45, "strength": 10 }
                    },
                    "options": [
                        "Лечь правее",
                        "Лечь левее", 
                        "Сохранить курс"
                    ],
                    "answer": 0,
                    "explain": "Правильно! У вашего судна А ветер дует слева (левый галс), поэтому вы должны уступить дорогу судну B, которое идет правым галсом. Манёвр — отклонение вправо.",
                    "refs": ["COLREGs §12"]
                },
                {
                    "id": "s002", 
                    "title": "Встречный курс - правый галс имеет преимущество",
                    "rule": "COLREGs 12",
                    "goal": "Вы управляете судном А (левое). Ветер дует справа. Что должно сделать ВАШЕ судно?",
                    "initial": {
                        "boats": [
                            { "id": "А (ВЫ)", "course": 0, "speed": 4, "x": 200, "y": 300, "isPlayer": true },
                            { "id": "B", "course": 180, "speed": 4, "x": 600, "y": 300, "isPlayer": false }
                        ],
                        "wind": { "direction": 315, "strength": 10 }
                    },
                    "options": [
                        "Лечь правее",
                        "Лечь левее",
                        "Сохранить курс"
                    ],
                    "answer": 2,
                    "explain": "Правильно! У вашего судна А ветер дует справа (правый галс), поэтому судно B должно уступить вам дорогу. Вы сохраняете курс.",
                    "refs": ["COLREGs §12"]
                },
                {
                    "id": "s003",
                    "title": "Встречный курс - попутный ветер слева",
                    "rule": "COLREGs 12", 
                    "goal": "Вы управляете судном А (левое). Попутный ветер дует слева. Что должно сделать ВАШЕ судно?",
                    "initial": {
                        "boats": [
                            { "id": "А (ВЫ)", "course": 0, "speed": 4, "x": 200, "y": 300, "isPlayer": true },
                            { "id": "B", "course": 180, "speed": 4, "x": 600, "y": 300, "isPlayer": false }
                        ],
                        "wind": { "direction": 225, "strength": 10 }
                    },
                    "options": [
                        "Лечь правее",
                        "Лечь левее",
                        "Сохранить курс"
                    ],
                    "answer": 0,
                    "explain": "Правильно! При попутном ветре слева вы идете левым галсом и должны уступить дорогу судну B, которое идет правым галсом. Манёвр — отклонение вправо.",
                    "refs": ["COLREGs §12"]
                },
                {
                    "id": "s004",
                    "title": "Встречный курс - попутный ветер справа", 
                    "rule": "COLREGs 12",
                    "goal": "Вы управляете судном А (левое). Попутный ветер дует справа. Что должно сделать ВАШЕ судно?",
                    "initial": {
                        "boats": [
                            { "id": "А (ВЫ)", "course": 0, "speed": 4, "x": 200, "y": 300, "isPlayer": true },
                            { "id": "B", "course": 180, "speed": 4, "x": 600, "y": 300, "isPlayer": false }
                        ],
                        "wind": { "direction": 135, "strength": 10 }
                    },
                    "options": [
                        "Лечь правее",
                        "Лечь левее", 
                        "Сохранить курс"
                    ],
                    "answer": 2,
                    "explain": "Правильно! При попутном ветре справа вы идете правым галсом и имеете преимущество. Судно B должно уступить вам дорогу.",
                    "refs": ["COLREGs §12"]
                },
                {
                    "id": "s005",
                    "title": "Встречный курс - боковой ветер",
                    "rule": "COLREGs 12",
                    "goal": "Вы управляете судном А (левое). Боковой ветер дует слева по траверзу. Что должно сделать ВАШЕ судно?", 
                    "initial": {
                        "boats": [
                            { "id": "А (ВЫ)", "course": 0, "speed": 4, "x": 200, "y": 300, "isPlayer": true },
                            { "id": "B", "course": 180, "speed": 4, "x": 600, "y": 300, "isPlayer": false }
                        ],
                        "wind": { "direction": 270, "strength": 10 }
                    },
                    "options": [
                        "Лечь правее",
                        "Лечь левее",
                        "Сохранить курс"
                    ],
                    "answer": 0,
                    "explain": "Правильно! При боковом ветре слева вы идете левым галсом и должны уступить дорогу судну B, которое идет правым галсом. Манёвр — отклонение вправо.",
                    "refs": ["COLREGs §12"]
                }
            ]
        };
    }

    showErrorModal(errorMessage) {
        // Очищаем сцену
        this.children.removeAll();

        // Затемненный фон
        const overlay = this.add.rectangle(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            this.cameras.main.width,
            this.cameras.main.height,
            0x000000,
            0.9
        );

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // Заголовок ошибки
        this.add.text(centerX, centerY - 80, '⚠️ Ошибка загрузки', {
            fontSize: '28px',
            fill: '#e74c3c',
            fontFamily: 'Arial',
            fontWeight: 'bold'
        }).setOrigin(0.5);

        // Сообщение об ошибке
        this.add.text(centerX, centerY - 20, 'Не удалось загрузить данные модуля', {
            fontSize: '18px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        this.add.text(centerX, centerY + 10, `Модуль: ${this.moduleId}`, {
            fontSize: '14px',
            fill: '#95a5a6',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Техническая информация
        this.add.text(centerX, centerY + 40, errorMessage, {
            fontSize: '12px',
            fill: '#7f8c8d',
            fontFamily: 'Arial',
            wordWrap: { width: 600 }
        }).setOrigin(0.5);

        // Кнопка "Перезагрузить"
        const reloadButton = this.add.text(centerX - 100, centerY + 100, 'Перезагрузить страницу', {
            fontSize: '16px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            backgroundColor: '#e74c3c',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();

        reloadButton.on('pointerdown', () => {
            window.location.reload();
        });

        reloadButton.on('pointerover', () => {
            reloadButton.setStyle({ backgroundColor: '#c0392b' });
            reloadButton.setScale(1.05);
        });

        reloadButton.on('pointerout', () => {
            reloadButton.setStyle({ backgroundColor: '#e74c3c' });
            reloadButton.setScale(1);
        });

        // Кнопка "Вернуться в меню"
        const menuButton = this.add.text(centerX + 100, centerY + 100, 'Вернуться в меню', {
            fontSize: '16px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            backgroundColor: '#3498db',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();

        menuButton.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });

        menuButton.on('pointerover', () => {
            menuButton.setStyle({ backgroundColor: '#2980b9' });
            menuButton.setScale(1.05);
        });

        menuButton.on('pointerout', () => {
            menuButton.setStyle({ backgroundColor: '#3498db' });
            menuButton.setScale(1);
        });
    }

    loadScenario() {
        if (this.moduleData && this.moduleData.scenarios) {
            this.currentScenario = this.moduleData.scenarios[this.scenarioIndex];
            this.totalQuestions = this.moduleData.scenarios.length;
            console.log(`Loading scenario ${this.scenarioIndex + 1}/${this.totalQuestions} from module ${this.moduleId}`);
        } else {
            console.error('Module data not loaded');
        }
    }

    createUI() {
        const centerX = this.cameras.main.width / 2;
        
        // Название модуля
        this.add.text(centerX, 20, this.moduleData.module.title, {
            fontSize: '18px',
            fill: '#4a90e2',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
        
        // Счетчик вопросов и очков
        this.add.text(50, 50, `Вопрос: ${this.scenarioIndex + 1}/${this.totalQuestions}`, {
            fontSize: '16px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        });
        
        this.add.text(this.cameras.main.width - 50, 50, `Очки: ${this.score}/${this.totalQuestions}`, {
            fontSize: '16px',
            fill: '#27ae60',
            fontFamily: 'Arial'
        }).setOrigin(1, 0);
        
        this.add.text(centerX, 80, this.currentScenario.title, {
            fontSize: '20px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        this.add.text(centerX, 110, this.currentScenario.goal, {
            fontSize: '16px',
            fill: '#4a90e2',
            fontFamily: 'Arial',
            wordWrap: { width: 600 }
        }).setOrigin(0.5);

        this.drawScenario();
        this.drawLegend();
        this.createOptions();
    }

    drawLegend() {
        const legendX = 50;
        const legendY = 150;
        
        // Заголовок легенды
        this.add.text(legendX, legendY, 'ОБОЗНАЧЕНИЯ:', {
            fontSize: '12px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            fontWeight: 'bold'
        });
        
        // Правый галс
        const rightTackCircle = this.add.circle(legendX + 10, legendY + 25, 6, 0x87ceeb);
        this.add.text(legendX + 25, legendY + 25, 'Правый галс', {
            fontSize: '10px',
            fill: '#87ceeb',
            fontFamily: 'Arial'
        }).setOrigin(0, 0.5);
        
        // Левый галс
        const leftTackCircle = this.add.circle(legendX + 10, legendY + 45, 6, 0xffd700);
        this.add.text(legendX + 25, legendY + 45, 'Левый галс', {
            fontSize: '10px',
            fill: '#ffd700',
            fontFamily: 'Arial'
        }).setOrigin(0, 0.5);
        
        // Моторное судно
        const motorRect = this.add.rectangle(legendX + 10, legendY + 65, 12, 8, 0xff6b6b);
        this.add.text(legendX + 25, legendY + 65, 'Моторное судно', {
            fontSize: '10px',
            fill: '#ff6b6b',
            fontFamily: 'Arial'
        }).setOrigin(0, 0.5);
        
        // Ваше судно
        const playerBoat = this.add.triangle(legendX + 10, legendY + 85, 0, -6, -4, 4, 4, 4, 0x27ae60);
        this.add.text(legendX + 25, legendY + 85, 'Ваше судно', {
            fontSize: '10px',
            fill: '#27ae60',
            fontFamily: 'Arial',
            fontWeight: 'bold'
        }).setOrigin(0, 0.5);
    }

    drawBoat(boat, wind, allBoats) {
        const color = boat.isPlayer ? 0x27ae60 : 0x4a90e2;
        const isMotorboat = boat.id.includes('мотор') || boat.id.includes('- мотор');

        // Определяем галс для парусных судов
        let tack = null;
        if (!isMotorboat) {
            tack = this.determineTack(boat.course, wind.direction);
        }

        // Рисуем корпус судна (увеличен в 1.8 раза)
        let hull;
        if (isMotorboat) {
            // Моторное судно - прямоугольник
            hull = this.add.rectangle(boat.x, boat.y, 36, 22, color);
            hull.setRotation(Phaser.Math.DegToRad(boat.course));

            // Добавляем "винт" для моторного судна
            const propeller = this.add.circle(boat.x, boat.y, 5, 0xffffff, 0.8);

            // Иконка мотора
            const motorIcon = this.add.circle(boat.x, boat.y, 3, 0xff6b6b);
        } else {
            // Парусное судно - треугольник (корпус) с обводкой
            hull = this.add.triangle(boat.x, boat.y, 0, -27, -18, 18, 18, 18, color);
            hull.setRotation(Phaser.Math.DegToRad(boat.course));
            hull.setStrokeStyle(2, 0xffffff, 0.3); // Тонкая белая обводка для четкости

            // Мачта с улучшенным видом
            const mastLength = 35;
            const mastX = boat.x + Math.sin(Phaser.Math.DegToRad(boat.course)) * mastLength * 0.2;
            const mastY = boat.y - Math.cos(Phaser.Math.DegToRad(boat.course)) * mastLength * 0.2;
            const mastEndX = boat.x + Math.sin(Phaser.Math.DegToRad(boat.course)) * mastLength * 0.8;
            const mastEndY = boat.y - Math.cos(Phaser.Math.DegToRad(boat.course)) * mastLength * 0.8;

            const mast = this.add.line(0, 0, mastX, mastY, mastEndX, mastEndY, 0x8B4513);
            mast.setLineWidth(3);

            // Тонкая обводка мачты для четкости
            const mastOutline = this.add.line(0, 0, mastX, mastY, mastEndX, mastEndY, 0xffffff, 0.2);
            mastOutline.setLineWidth(5);

            // Рисуем парус с улучшенной визуализацией
            this.drawSail(boat, tack, color, wind);
        }

        // Стрелка направления движения (увеличена)
        const arrowLength = 40;
        const arrowX = boat.x + Math.sin(Phaser.Math.DegToRad(boat.course)) * arrowLength;
        const arrowY = boat.y - Math.cos(Phaser.Math.DegToRad(boat.course)) * arrowLength;

        const line = this.add.line(0, 0, boat.x, boat.y, arrowX, arrowY, color, 0.8);
        line.setLineWidth(3);

        // Стрелка на конце линии
        const arrowHead = this.add.triangle(arrowX, arrowY, 0, -8, -5, 5, 5, 5, color);
        arrowHead.setRotation(Phaser.Math.DegToRad(boat.course));

        // Подписи с передачей массива всех судов для проверки конфликтов
        this.drawBoatLabels(boat, tack, isMotorboat, allBoats);
    }

    drawSail(boat, tack, color, wind) {
        // Улучшенная визуализация паруса с учетом ветра
        const windAngle = wind.direction;
        const boatAngle = boat.course;
        
        // Рассчитываем относительный угол ветра к курсу лодки
        let relativeWindAngle = windAngle - boatAngle;
        while (relativeWindAngle > 180) relativeWindAngle -= 360;
        while (relativeWindAngle < -180) relativeWindAngle += 360;
        
        // Определяем реальную сторону паруса на основе ветра и галса
        let sailSide;
        if (tack === 'правый') {
            // На правом галсе парус справа от мачты (если смотреть с кормы)
            sailSide = 1;
        } else {
            // На левом галсе парус слева от мачты
            sailSide = -1;
        }
        
        // Рассчитываем точки мачты
        const mastBase = {
            x: boat.x - Math.sin(Phaser.Math.DegToRad(boatAngle)) * 8,
            y: boat.y + Math.cos(Phaser.Math.DegToRad(boatAngle)) * 8
        };
        
        const mastTop = {
            x: boat.x + Math.sin(Phaser.Math.DegToRad(boatAngle)) * 25,
            y: boat.y - Math.cos(Phaser.Math.DegToRad(boatAngle)) * 25
        };
        
        // Угол паруса относительно ветра (парус всегда отклонен от ветра)
        let sailAngle;
        
        // Определяем угол паруса в зависимости от курса относительно ветра
        if (Math.abs(relativeWindAngle) < 60) {
            // Острый курс - парус сильно подтянут
            sailAngle = boatAngle + (sailSide * 20);
        } else if (Math.abs(relativeWindAngle) < 120) {
            // Полуветер - парус средне отпущен
            sailAngle = boatAngle + (sailSide * 35);
        } else {
            // Фордевинд - парус полностью отпущен
            sailAngle = boatAngle + (sailSide * 70);
        }
        
        // Точки паруса
        const sailTip = {
            x: mastTop.x + Math.sin(Phaser.Math.DegToRad(sailAngle)) * 28,
            y: mastTop.y - Math.cos(Phaser.Math.DegToRad(sailAngle)) * 28
        };
        
        const sailBottom = {
            x: mastBase.x + Math.sin(Phaser.Math.DegToRad(sailAngle)) * 20,
            y: mastBase.y - Math.cos(Phaser.Math.DegToRad(sailAngle)) * 20
        };
        
        // Рисуем парус как треугольник с улучшенной видимостью
        const sailColor = tack === 'правый' ? 0x87ceeb : 0xffd700;
        const sail = this.add.polygon(0, 0, [
            mastTop.x, mastTop.y,
            sailTip.x, sailTip.y,
            sailBottom.x, sailBottom.y,
            mastBase.x, mastBase.y
        ], sailColor, 0.9); // Увеличена непрозрачность для четкости

        // Обводка паруса цветом судна для визуальной связи
        sail.setStrokeStyle(2, color, 0.6);
        
        // Индикатор направления ветра на парусе
        this.drawWindIndicatorOnSail(boat, wind, tack);
        
        return sail;
    }

    drawWindIndicatorOnSail(boat, wind, tack) {
        // Маленькая стрелка на парусе, показывающая отношение к ветру
        const windIndicatorX = boat.x + (tack === 'правый' ? -15 : 15);
        const windIndicatorY = boat.y - 10;
        
        // Рассчитываем относительный угол ветра
        let relativeWind = wind.direction - boat.course;
        while (relativeWind > 180) relativeWind -= 360;
        while (relativeWind < -180) relativeWind += 360;
        
        // Цвет стрелки в зависимости от угла ветра
        let windColor;
        if (Math.abs(relativeWind) < 45) windColor = 0xff0000; // Красный - против ветра
        else if (Math.abs(relativeWind) > 135) windColor = 0x00ff00; // Зелёный - по ветру
        else windColor = 0xffff00; // Жёлтый - полуветер
        
        const windArrow = this.add.triangle(windIndicatorX, windIndicatorY, 0, -5, -3, 3, 3, 3, windColor, 0.8);
        windArrow.setRotation(Phaser.Math.DegToRad(wind.direction));
    }

    createInfoButton(boat, hull) {
        // Создаём кнопку информации возле судна
        const infoButton = this.add.circle(boat.x + 25, boat.y - 25, 10, 0x3498db, 0.8);
        infoButton.setStrokeStyle(2, 0x2980b9);
        
        // Текст "i"
        const infoText = this.add.text(boat.x + 25, boat.y - 25, 'i', {
            fontSize: '14px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            fontWeight: 'bold'
        }).setOrigin(0.5);
        
        // Делаем кнопку интерактивной
        infoButton.setInteractive();
        
        // При наведении показываем информацию
        infoButton.on('pointerover', () => {
            infoButton.setScale(1.2);
            this.showBoatTooltip(boat, infoButton.x, infoButton.y);
        });
        
        infoButton.on('pointerout', () => {
            infoButton.setScale(1);
            this.hideBoatTooltip();
        });
        
        return infoButton;
    }

    drawBoatLabels(boat, tack, isMotorboat, allBoats) {
        // Базовая позиция метки
        let labelX = boat.x;
        let labelY = boat.y + 50;

        // Проверяем конфликты с другими судами
        if (allBoats && allBoats.length > 1) {
            allBoats.forEach(otherBoat => {
                if (otherBoat !== boat) {
                    const distanceY = Math.abs(otherBoat.y - boat.y);
                    const distanceX = Math.abs(otherBoat.x - boat.x);

                    // Если суда близко друг к другу по вертикали (метки могут наложиться)
                    if (distanceY < 85 && distanceX < 180) {
                        // Сдвигаем метку влево или вправо
                        const offset = 70;
                        if (boat.x < otherBoat.x) {
                            labelX = boat.x - offset; // Сдвиг влево
                        } else {
                            labelX = boat.x + offset; // Сдвиг вправо
                        }
                    }
                }
            });
        }

        // Размеры фона (компактная метка - 3 строки)
        const bgWidth = 130;
        const bgHeight = 48;

        // Полупрозрачный фон под метку для читаемости
        this.add.rectangle(labelX, labelY + 14, bgWidth, bgHeight, 0x1a1a2e, 0.75)
            .setOrigin(0.5);

        // Строка 1: Название судна (уже содержит "(ВЫ)" если нужно)
        this.add.text(labelX, labelY, boat.id, {
            fontSize: '12px',
            fill: boat.isPlayer ? '#27ae60' : '#ffffff',
            fontFamily: 'Arial',
            fontWeight: boat.isPlayer ? 'bold' : 'normal'
        }).setOrigin(0.5);

        // Строка 2: Курс
        this.add.text(labelX, labelY + 16, `Курс ${boat.course}°`, {
            fontSize: '11px',
            fill: '#cccccc',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Строка 3: Галс/Тип + Скорость (компактно)
        let thirdLine = '';
        let thirdLineColor = '#95a5a6';

        if (isMotorboat) {
            thirdLine = boat.speed ? `МОТОР • ${boat.speed} уз` : 'МОТОР';
            thirdLineColor = '#ff6b6b';
        } else if (tack) {
            const tackSymbol = tack === 'правый' ? 'П' : 'Л';
            thirdLine = boat.speed ? `${tackSymbol}-галс • ${boat.speed} уз` : `${tackSymbol}-галс`;
            thirdLineColor = tack === 'правый' ? '#87ceeb' : '#ffd700';
        } else if (boat.speed) {
            thirdLine = `${boat.speed} уз`;
        }

        if (thirdLine) {
            this.add.text(labelX, labelY + 32, thirdLine, {
                fontSize: '10px',
                fill: thirdLineColor,
                fontFamily: 'Arial',
                fontWeight: isMotorboat ? 'bold' : 'normal'
            }).setOrigin(0.5);
        }
    }

    determineTack(boatCourse, windDirection) {
        // Определяем относительное направление ветра к курсу судна
        let relativeWind = windDirection - boatCourse;
        
        // Нормализуем угол в диапазоне -180 до 180
        while (relativeWind > 180) relativeWind -= 360;
        while (relativeWind < -180) relativeWind += 360;
        
        // Правый галс - ветер дует справа (от 0 до 180 градусов относительно носа)
        // Левый галс - ветер дует слева (от -180 до 0 градусов относительно носа)
        return relativeWind > 0 ? 'правый' : 'левый';
    }

    drawScenario() {
        const boats = this.currentScenario.initial.boats;
        const wind = this.currentScenario.initial.wind;

        // Передаем массив всех судов в drawBoat для интеллектуального позиционирования меток
        boats.forEach(boat => {
            this.drawBoat(boat, wind, boats);
        });

        this.drawWindIndicator(wind);
    }

    drawWindIndicator(wind) {
        const windX = this.cameras.main.width - 100;
        const windY = 150;
        
        // Компас-роза для ветра
        const compassRadius = 25;
        const compass = this.add.circle(windX, windY, compassRadius, 0x2c3e50, 0.3);
        compass.setStrokeStyle(2, 0x34495e);
        
        // Стрелка ветра (показывает ОТКУДА дует ветер)
        const windArrow = this.add.triangle(windX, windY, 0, -18, -6, 6, 6, 6, 0xff6b6b);
        windArrow.setRotation(Phaser.Math.DegToRad(wind.direction));
        
        // Добавляем хвост стрелки
        const tailLength = 15;
        const tailX = windX - Math.sin(Phaser.Math.DegToRad(wind.direction)) * tailLength;
        const tailY = windY + Math.cos(Phaser.Math.DegToRad(wind.direction)) * tailLength;
        const tailLine = this.add.line(0, 0, windX, windY, tailX, tailY, 0xff6b6b);
        tailLine.setLineWidth(3);
        
        // Подписи
        this.add.text(windX, windY + 45, 'ВЕТЕР', {
            fontSize: '14px',
            fill: '#ff6b6b',
            fontFamily: 'Arial',
            fontWeight: 'bold'
        }).setOrigin(0.5);

        this.add.text(windX, windY + 65, `${wind.direction}°`, {
            fontSize: '12px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
        
        this.add.text(windX, windY + 80, `${wind.strength} узлов`, {
            fontSize: '10px',
            fill: '#cccccc',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
        
        // Добавляем компас-румбы (N, E, S, W)
        const rumbs = [
            { angle: 0, label: 'N' },
            { angle: 90, label: 'E' },
            { angle: 180, label: 'S' },
            { angle: 270, label: 'W' }
        ];
        
        rumbs.forEach(rumb => {
            const rumbX = windX + Math.sin(Phaser.Math.DegToRad(rumb.angle)) * (compassRadius + 10);
            const rumbY = windY - Math.cos(Phaser.Math.DegToRad(rumb.angle)) * (compassRadius + 10);
            
            this.add.text(rumbX, rumbY, rumb.label, {
                fontSize: '10px',
                fill: '#95a5a6',
                fontFamily: 'Arial',
                fontWeight: 'bold'
            }).setOrigin(0.5);
        });
    }

    createOptions() {
        const startY = 500;
        const spacing = 45;

        this.currentScenario.options.forEach((option, index) => {
            const button = this.add.text(this.cameras.main.width / 2, startY + index * spacing, option, {
                fontSize: '16px',
                fill: '#ffffff',
                fontFamily: 'Arial',
                backgroundColor: '#2c3e50',
                padding: { x: 15, y: 8 }
            }).setOrigin(0.5).setInteractive();

            button.on('pointerdown', () => {
                if (!this.answered) {
                    this.selectOption(index);
                }
            });

            button.on('pointerover', () => {
                if (!this.answered) {
                    button.setStyle({ backgroundColor: '#34495e' });
                }
            });

            button.on('pointerout', () => {
                if (!this.answered) {
                    button.setStyle({ backgroundColor: '#2c3e50' });
                }
            });
        });
    }

    selectOption(selectedIndex) {
        this.answered = true;
        const isCorrect = selectedIndex === this.currentScenario.answer;
        const resultColor = isCorrect ? '#27ae60' : '#e74c3c';
        const resultText = isCorrect ? 'Правильно!' : 'Неправильно!';
        
        if (isCorrect) {
            this.score++;
        }

        this.add.rectangle(this.cameras.main.width / 2, this.cameras.main.height / 2, 
            this.cameras.main.width, this.cameras.main.height, 0x000000, 0.8);

        this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 - 80, resultText, {
            fontSize: '32px',
            fill: resultColor,
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 - 20, this.currentScenario.explain, {
            fontSize: '16px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            wordWrap: { width: 500 },
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 + 60, `Правило: ${this.currentScenario.rule}`, {
            fontSize: '14px',
            fill: '#4a90e2',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Проверяем, не последний ли это вопрос
        if (this.scenarioIndex < this.totalQuestions - 1) {
            const nextButton = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 + 100, 'Следующий вопрос', {
                fontSize: '18px',
                fill: '#ffffff',
                fontFamily: 'Arial',
                backgroundColor: '#27ae60',
                padding: { x: 15, y: 8 }
            }).setOrigin(0.5).setInteractive();

            nextButton.on('pointerdown', () => {
                this.scene.start('ScenarioScene', { 
                    scenarioIndex: this.scenarioIndex + 1, 
                    score: this.score,
                    moduleId: this.moduleId
                });
            });
        } else {
            // Квиз завершен - переходим к экрану результатов
            const resultsButton = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 + 100, 'Посмотреть результаты', {
                fontSize: '18px',
                fill: '#ffffff',
                fontFamily: 'Arial',
                backgroundColor: '#27ae60',
                padding: { x: 15, y: 8 }
            }).setOrigin(0.5).setInteractive();

            resultsButton.on('pointerdown', () => {
                this.scene.start('QuizResultsScene', {
                    score: this.score,
                    totalQuestions: this.totalQuestions,
                    moduleId: this.moduleId,
                    moduleTitle: this.moduleData.module.title
                });
            });
        }
    }

    showModuleResults() {
        const percentage = Math.round((this.score / this.totalQuestions) * 100);
        const passed = percentage >= this.moduleData.module.passingScore;
        
        this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 + 100, 'Модуль завершен!', {
            fontSize: '24px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 + 130, `Результат: ${this.score}/${this.totalQuestions} (${percentage}%)`, {
            fontSize: '18px',
            fill: passed ? '#27ae60' : '#e74c3c',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 + 160, 
            passed ? 'Модуль пройден успешно!' : `Для прохождения нужно ${this.moduleData.module.passingScore}% правильных ответов`, {
            fontSize: '16px',
            fill: passed ? '#27ae60' : '#e74c3c',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        const menuButton = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 + 200, 'В главное меню', {
            fontSize: '18px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            backgroundColor: '#4a90e2',
            padding: { x: 15, y: 8 }
        }).setOrigin(0.5).setInteractive();

        menuButton.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });

        if (!passed) {
            const retryButton = this.add.text(this.cameras.main.width / 2 - 100, this.cameras.main.height / 2 + 200, 'Повторить', {
                fontSize: '18px',
                fill: '#ffffff',
                fontFamily: 'Arial',
                backgroundColor: '#e67e22',
                padding: { x: 15, y: 8 }
            }).setOrigin(0.5).setInteractive();

            retryButton.on('pointerdown', () => {
                this.scene.start('ScenarioScene', { 
                    scenarioIndex: 0, 
                    score: 0,
                    moduleId: this.moduleId
                });
            });

            menuButton.setX(this.cameras.main.width / 2 + 100);
        }
    }
}

// Сцена результатов Quiz
class QuizResultsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'QuizResultsScene' });
    }

    init(data) {
        this.score = data.score || 0;
        this.totalQuestions = data.totalQuestions || 5;
        this.moduleId = data.moduleId || 'colregs_12';
        this.moduleTitle = data.moduleTitle || 'COLREGs модуль';
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // Заголовок
        this.add.text(centerX, 80, 'Квиз завершён!', {
            fontSize: '32px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            fontWeight: 'bold'
        }).setOrigin(0.5);

        // Название модуля
        this.add.text(centerX, 120, this.moduleTitle, {
            fontSize: '18px',
            fill: '#4a90e2',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Результат
        const percentage = Math.round((this.score / this.totalQuestions) * 100);
        const isPassed = percentage >= 80;
        
        this.add.text(centerX, centerY - 40, `Ваш результат: ${this.score} из ${this.totalQuestions}`, {
            fontSize: '24px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        this.add.text(centerX, centerY, `${percentage}%`, {
            fontSize: '48px',
            fill: isPassed ? '#27ae60' : '#e74c3c',
            fontFamily: 'Arial',
            fontWeight: 'bold'
        }).setOrigin(0.5);

        // Оценка результата
        let resultText, resultColor;
        if (percentage >= 90) {
            resultText = 'Отлично! Вы отлично знаете правила!';
            resultColor = '#27ae60';
        } else if (percentage >= 80) {
            resultText = 'Хорошо! Правила усвоены!';
            resultColor = '#27ae60';
        } else if (percentage >= 60) {
            resultText = 'Удовлетворительно. Рекомендуем повторить материал.';
            resultColor = '#f39c12';
        } else {
            resultText = 'Требуется изучение правил. Попробуйте ещё раз!';
            resultColor = '#e74c3c';
        }

        this.add.text(centerX, centerY + 60, resultText, {
            fontSize: '16px',
            fill: resultColor,
            fontFamily: 'Arial',
            wordWrap: { width: 600 },
            align: 'center'
        }).setOrigin(0.5);

        // Прогресс-бар
        this.createProgressBar(centerX, centerY + 100, percentage);

        // Кнопки
        const buttonY = centerY + 160;
        
        // Кнопка "Повторить квиз"
        const retryButton = this.add.text(centerX - 100, buttonY, 'Повторить квиз', {
            fontSize: '16px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            backgroundColor: '#e67e22',
            padding: { x: 15, y: 8 }
        }).setOrigin(0.5).setInteractive();

        retryButton.on('pointerdown', () => {
            this.scene.start('ScenarioScene', { 
                moduleId: this.moduleId,
                scenarioIndex: 0,
                score: 0,
                isQuizMode: true 
            });
        });

        // Кнопка "В главное меню"
        const menuButton = this.add.text(centerX + 100, buttonY, 'Главное меню', {
            fontSize: '16px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            backgroundColor: '#4a90e2',
            padding: { x: 15, y: 8 }
        }).setOrigin(0.5).setInteractive();

        menuButton.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });

        // Hover эффекты
        [retryButton, menuButton].forEach(button => {
            button.on('pointerover', () => {
                button.setScale(1.1);
            });
            button.on('pointerout', () => {
                button.setScale(1);
            });
        });
    }

    createProgressBar(x, y, percentage) {
        const barWidth = 300;
        const barHeight = 20;
        
        // Фон прогресс-бара
        const bg = this.add.rectangle(x, y, barWidth, barHeight, 0x2c3e50);
        bg.setStrokeStyle(2, 0x34495e);
        
        // Заполнение прогресс-бара
        const fillWidth = (barWidth * percentage) / 100;
        let fillColor;
        if (percentage >= 80) fillColor = 0x27ae60;
        else if (percentage >= 60) fillColor = 0xf39c12;
        else fillColor = 0xe74c3c;
        
        const fill = this.add.rectangle(x - barWidth/2 + fillWidth/2, y, fillWidth, barHeight, fillColor);
        
        // Подпись прогресса
        this.add.text(x, y + 35, 'Прогресс изучения модуля', {
            fontSize: '12px',
            fill: '#95a5a6',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
    }

    showBoatTooltip(boat, x, y) {
        // Удаляем предыдущую подсказку, если есть
        this.hideBoatTooltip();
        
        const isMotorboat = boat.id.includes('мотор') || boat.id.includes('- мотор');
        const windDir = this.currentScenario?.initial?.wind?.direction || 0;
        const tack = isMotorboat ? null : this.determineTack(boat.course, windDir);
        
        // Определяем статус движения
        let movementStatus = 'Движется';
        if (boat.speed === 0) movementStatus = 'Стоит на якоре';
        else if (isMotorboat) movementStatus = 'Идёт под мотором';
        else movementStatus = 'Идёт под парусом';
        
        // Определяем размер и стеснённость
        let sizeInfo = 'Обычное судно';
        if (boat.id.includes('большое')) sizeInfo = 'Большое судно, ограничено размерами';
        else if (boat.id.includes('малое')) sizeInfo = 'Малое судно';
        
        // Рассчитываем относительный ветер
        let relativeWind = windDir - boat.course;
        while (relativeWind > 180) relativeWind -= 360;
        while (relativeWind < -180) relativeWind += 360;
        
        let windDirection = '';
        if (Math.abs(relativeWind) < 45) windDirection = 'Встречный ветер';
        else if (Math.abs(relativeWind) > 135) windDirection = 'Попутный ветер';
        else if (relativeWind > 0) windDirection = 'Ветер справа';
        else windDirection = 'Ветер слева';
        
        // Создаём подсказку
        const tooltipWidth = 220;
        const tooltipHeight = 140;
        const tooltipX = Math.min(x + 20, this.cameras.main.width - tooltipWidth - 10);
        const tooltipY = Math.max(y - tooltipHeight / 2, 10);
        
        // Фон подсказки
        this.tooltip = this.add.group();
        
        const bg = this.add.rectangle(tooltipX + tooltipWidth/2, tooltipY + tooltipHeight/2, tooltipWidth, tooltipHeight, 0x2c3e50, 0.95);
        bg.setStrokeStyle(2, 0x3498db);
        this.tooltip.add(bg);
        
        // Текст с информацией
        const info = [
            `Судно: ${boat.id}`,
            `Курс: ${boat.course}°`,
            `Скорость: ${boat.speed} узлов`,
            `Статус: ${movementStatus}`,
            tack ? `Галс: ${tack}` : '',
            `${windDirection}`,
            `Размер: ${sizeInfo}`
        ].filter(line => line); // Убираем пустые строки
        
        info.forEach((line, index) => {
            const text = this.add.text(tooltipX + 10, tooltipY + 15 + index * 18, line, {
                fontSize: '12px',
                fill: '#ffffff',
                fontFamily: 'Arial'
            });
            this.tooltip.add(text);
        });
    }

    hideBoatTooltip() {
        if (this.tooltip) {
            this.tooltip.destroy();
            this.tooltip = null;
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#1e3a5f',
    scene: [BootScene, MenuScene, ScenarioScene, QuizResultsScene],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
};

const game = new Phaser.Game(config);