class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        this.load.on('complete', () => {
            document.getElementById('loading').style.display = 'none';
        });
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

        this.add.text(centerX, centerY - 150, 'DAOsail Simulator', {
            fontSize: '32px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        this.add.text(centerX, centerY - 100, 'Правила расхождения яхт', {
            fontSize: '18px',
            fill: '#4a90e2',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        this.add.text(centerX, centerY - 50, 'Выберите модуль для изучения:', {
            fontSize: '20px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Модуль COLREGs 12
        const module12Button = this.add.text(centerX, centerY, 'COLREGs 12: Встречные парусные суда', {
            fontSize: '18px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            backgroundColor: '#27ae60',
            padding: { x: 20, y: 10 }
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
        const module13Button = this.add.text(centerX, centerY + 60, 'COLREGs 13: Обгон судов', {
            fontSize: '18px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            backgroundColor: '#e67e22',
            padding: { x: 20, y: 10 }
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

        // Информация внизу
        this.add.text(centerX, centerY + 120, 'Для прохождения модуля нужно 80% правильных ответов', {
            fontSize: '14px',
            fill: '#95a5a6',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
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
            console.warn(`Could not load JSON data for ${this.moduleId}, using fallback:`, error);
            this.moduleData = this.getFallbackData();
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

    drawBoat(boat, wind) {
        const color = boat.isPlayer ? 0x27ae60 : 0x4a90e2;
        const isMotorboat = boat.id.includes('мотор') || boat.id.includes('- мотор');
        
        // Определяем галс для парусных судов
        let tack = null;
        if (!isMotorboat) {
            tack = this.determineTack(boat.course, wind.direction);
        }
        
        // Рисуем корпус судна
        if (isMotorboat) {
            // Моторное судно - прямоугольник
            const rect = this.add.rectangle(boat.x, boat.y, 20, 12, color);
            rect.setRotation(Phaser.Math.DegToRad(boat.course));
            
            // Добавляем "винт" для моторного судна
            const propeller = this.add.circle(boat.x, boat.y, 3, 0xffffff, 0.8);
        } else {
            // Парусное судно - треугольник (корпус) + парус
            const hull = this.add.triangle(boat.x, boat.y, 0, -15, -10, 10, 10, 10, color);
            hull.setRotation(Phaser.Math.DegToRad(boat.course));
            
            // Рисуем парус
            this.drawSail(boat, tack, color);
        }
        
        // Стрелка направления движения
        const arrowLength = 25;
        const arrowX = boat.x + Math.sin(Phaser.Math.DegToRad(boat.course)) * arrowLength;
        const arrowY = boat.y - Math.cos(Phaser.Math.DegToRad(boat.course)) * arrowLength;
        
        const line = this.add.line(0, 0, boat.x, boat.y, arrowX, arrowY, color, 0.7);
        line.setLineWidth(2);
        
        // Подписи
        this.drawBoatLabels(boat, tack, isMotorboat);
    }

    drawSail(boat, tack, color) {
        // Парус смещается в зависимости от галса
        const sailOffset = tack === 'правый' ? -15 : 15;
        const sailX = boat.x + sailOffset * Math.cos(Phaser.Math.DegToRad(boat.course + 90));
        const sailY = boat.y + sailOffset * Math.sin(Phaser.Math.DegToRad(boat.course + 90));
        
        // Рисуем парус как дугу
        const sail = this.add.arc(sailX, sailY, 8, 0, 180, false, tack === 'правый' ? 0x87ceeb : 0xffd700, 0.6);
        sail.setRotation(Phaser.Math.DegToRad(boat.course + (tack === 'правый' ? -30 : 30)));
    }

    drawBoatLabels(boat, tack, isMotorboat) {
        const labelY = boat.y + 35;
        
        // Название судна
        this.add.text(boat.x, labelY, `Судно ${boat.id}`, {
            fontSize: '14px',
            fill: boat.isPlayer ? '#27ae60' : '#ffffff',
            fontFamily: 'Arial',
            fontWeight: boat.isPlayer ? 'bold' : 'normal'
        }).setOrigin(0.5);

        // Курс
        this.add.text(boat.x, labelY + 18, `Курс: ${boat.course}°`, {
            fontSize: '12px',
            fill: '#cccccc',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
        
        // Галс для парусных или тип для моторных
        if (isMotorboat) {
            this.add.text(boat.x, labelY + 34, 'МОТОРНОЕ', {
                fontSize: '10px',
                fill: '#ff6b6b',
                fontFamily: 'Arial',
                fontWeight: 'bold'
            }).setOrigin(0.5);
        } else if (tack) {
            const tackColor = tack === 'правый' ? '#87ceeb' : '#ffd700';
            this.add.text(boat.x, labelY + 34, `${tack.toUpperCase()} ГАЛС`, {
                fontSize: '10px',
                fill: tackColor,
                fontFamily: 'Arial',
                fontWeight: 'bold'
            }).setOrigin(0.5);
        }
        
        // Скорость
        if (boat.speed) {
            this.add.text(boat.x, labelY + 50, `${boat.speed} уз`, {
                fontSize: '10px',
                fill: '#95a5a6',
                fontFamily: 'Arial'
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

        boats.forEach(boat => {
            this.drawBoat(boat, wind);
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
        const startY = 450;
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
            // Модуль завершен, показываем результаты
            this.showModuleResults();
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

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#1e3a5f',
    scene: [BootScene, MenuScene, ScenarioScene],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
};

const game = new Phaser.Game(config);