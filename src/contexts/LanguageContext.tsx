import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ru' | 'kk';

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

export const translations: Translations = {
  // Navbar
  'nav.features': { en: 'Features', ru: 'Возможности', kk: 'Мүмкіндіктер' },
  'nav.pricing': { en: 'Pricing', ru: 'Цены', kk: 'Бағалар' },
  'nav.docs': { en: 'Docs', ru: 'Документация', kk: 'Құжаттама' },
  'nav.signin': { en: 'Sign In', ru: 'Войти', kk: 'Кіру' },
  'nav.getstarted': { en: 'Get Started', ru: 'Начать', kk: 'Бастау' },
  'nav.dashboard': { en: 'Dashboard', ru: 'Панель', kk: 'Басқару панелі' },
  'nav.signout': { en: 'Sign Out', ru: 'Выйти', kk: 'Шығу' },

  // Hero
  'hero.badge': { en: 'Optimized for Central Asian strains', ru: 'Оптимизировано для штаммов Центральной Азии', kk: 'Орталық Азия штаммдары үшін оңтайландырылған' },
  'hero.title1': { en: 'Next-Gen', ru: 'Новое поколение', kk: 'Жаңа буын' },
  'hero.title2': { en: 'Vaccine Design', ru: 'дизайна вакцин', kk: 'вакцина дизайны' },
  'hero.with_ai': { en: 'with AI', ru: 'с ИИ', kk: 'ИИ-мен' },
  'hero.desc': { 
    en: 'Design optimized mRNA, protein, and vector vaccines in minutes. BaiVax combines state-of-the-art AI with local genomic data to protect Central Asia.',
    ru: 'Создавайте оптимизированные мРНК, белковые и векторные вакцины за считанные минуты. BaiVax объединяет современный ИИ с локальными геномными данными.',
    kk: 'Оңтайландырылған мРНК, белоктық және векторлық вакциналарды бірнеше минут ішінде жасаңыз. BaiVax заманауи ИИ-ді жергілікті геномдық деректермен біріктіреді.'
  },
  'hero.cta': { en: 'Start Free Pilot', ru: 'Начать бесплатный пилот', kk: 'Тегін пилотты бастау' },
  'hero.demo': { en: 'Watch Demo', ru: 'Смотреть демо', kk: 'Демоны көру' },

  // Stats
  'stats.faster': { en: 'Faster Design', ru: 'Быстрее дизайн', kk: 'Жылдам дизайн' },
  'stats.cost': { en: 'Cost Reduction', ru: 'Снижение затрат', kk: 'Шығындарды азайту' },
  'stats.fidelity': { en: 'Sequence Fidelity', ru: 'Точность последовательности', kk: 'Тізбек дәлдігі' },
  'stats.strains': { en: 'Local Strains', ru: 'Локальные штаммы', kk: 'Жергілікті штаммдар' },

  // Calculator
  'calc.title': { en: 'Savings Calculator', ru: 'Калькулятор экономии', kk: 'Үнемдеу калькуляторы' },
  'calc.desc': { en: 'See how much BaiVax can save your organization.', ru: 'Узнайте, сколько ваша организация может сэкономить с BaiVax.', kk: 'BaiVax сіздің ұйымыңызға қанша үнемдей алатынын көріңіз.' },
  'calc.timeline': { en: 'Current Design Timeline (Months)', ru: 'Текущие сроки дизайна (Месяцы)', kk: 'Қазіргі дизайн мерзімі (Айлар)' },
  'calc.budget': { en: 'Average R&D Budget ($)', ru: 'Средний бюджет на НИОКР ($)', kk: 'Орташа ҒЗТКЖ бюджеті ($)' },
  'calc.saved_time': { en: 'Estimated Time Saved', ru: 'Оцененная экономия времени', kk: 'Болжалды уақытты үнемдеу' },
  'calc.saved_capital': { en: 'Estimated Capital Saved', ru: 'Оцененная экономия капитала', kk: 'Болжалды капиталды үнемдеу' },
  'calc.months': { en: 'Months', ru: 'Месяцев', kk: 'Ай' },

  // Features
  'features.title': { en: 'Advanced Bio-AI Capabilities', ru: 'Передовые возможности Био-ИИ', kk: 'Жетілдірілген Био-ИИ мүмкіндіктері' },
  'features.desc': { en: 'Our platform combines state-of-the-art AI with structural biology to deliver production-ready vaccine designs.', ru: 'Наша платформа сочетает современный ИИ со структурной биологией для создания готовых к производству вакцин.', kk: 'Біздің платформа өндіріске дайын вакцина конструкцияларын жеткізу үшін заманауи ИИ-ді құрылымдық биологиямен біріктіреді.' },
  
  'feat1.title': { en: 'mRNA Optimization', ru: 'Оптимизация мРНК', kk: 'мРНК оңтайландыру' },
  'feat1.desc': { en: 'Deep learning algorithms optimize codon usage and secondary structure for maximum translation efficiency.', ru: 'Алгоритмы глубокого обучения оптимизируют использование кодонов и вторичную структуру.', kk: 'Терең оқыту алгоритмдері кодонды пайдалануды және екінші реттік құрылымды оңтайландырады.' },
  
  'feat2.title': { en: 'LNP Prediction', ru: 'Прогнозирование LNP', kk: 'LNP болжау' },
  'feat2.desc': { en: 'AI predicts the most effective Lipid Nanoparticle composition based on tissue targeting and immunogenicity.', ru: 'ИИ предсказывает наиболее эффективный состав липидных наночастиц.', kk: 'ИИ тіндердің нысанаға алынуы мен иммуногенділігіне негізделген ең тиімді липидті нанобөлшектердің құрамын болжайды.' },
  
  'feat3.title': { en: 'Regional Strains', ru: 'Локальные штаммы', kk: 'Жергілікті штаммдар' },
  'feat3.desc': { en: 'Pre-loaded database of Central Asian virus genotypes for precision vaccine engineering.', ru: 'Предустановленная база генотипов вирусов Центральной Азии для точной инженерии вакцин.', kk: 'Дәл вакцина инженериясы үшін Орталық Азия вирус генотиптерінің алдын ала жүктелген дерекқоры.' },

  // Pricing
  'pricing.title': { en: 'Predictable Pricing', ru: 'Прозрачные цены', kk: 'Болжамды баға белгілеу' },
  'pricing.desc': { en: 'Choose the plan that fits your research or commercial needs.', ru: 'Выберите план, который соответствует вашим исследовательским или коммерческим потребностям.', kk: 'Зерттеуіңізге немесе коммерциялық қажеттіліктеріңізге сәйкес келетін жоспарды таңдаңыз.' },
  'pricing.popular': { en: 'Popular', ru: 'Популярно', kk: 'Танымал' },
  'pricing.plan1.title': { en: 'Researcher', ru: 'Исследователь', kk: 'Зерттеуші' },
  'pricing.plan1.feat1': { en: '2 Project slots', ru: '2 слота для проектов', kk: '2 жобалық слот' },
  'pricing.plan1.feat2': { en: 'Basic mRNA optimization', ru: 'Базовая оптимизация мРНК', kk: 'Негізгі мРНК оңтайландыру' },
  'pricing.plan1.feat3': { en: 'Public strain access', ru: 'Доступ к общим штаммам', kk: 'Жалпы штаммдарға қол жеткізу' },
  'pricing.plan1.cta': { en: 'Choose Basic', ru: 'Выбрать Basic', kk: 'Basic таңдау' },
  'pricing.plan2.title': { en: 'Biotech Lab Pro', ru: 'Биотех Лаб Про', kk: 'Биотех Лаб Про' },
  'pricing.plan2.feat1': { en: '20 Project slots', ru: '20 слотов для проектов', kk: '20 жобалық слот' },
  'pricing.plan2.feat2': { en: 'Full AI Suite (mRNA + LNP)', ru: 'Полный ИИ-пакет (мРНК + LNP)', kk: 'Толық ИИ жинағы (мРНК + LNP)' },
  'pricing.plan2.feat3': { en: 'Team collaboration (5 users)', ru: 'Командная работа (5 польз.)', kk: 'Командалық жұмыс (5 пайд.)' },
  'pricing.plan2.feat4': { en: 'Export FASTA/SMILES/PDF', ru: 'Экспорт FASTA/SMILES/PDF', kk: 'FASTA/SMILES/PDF экспорты' },
  'pricing.plan2.cta': { en: 'Get Started', ru: 'Начать сейчас', kk: 'Қазір бастаңыз' },
  'pricing.plan3.title': { en: 'Enterprise', ru: 'Энтерпрайз', kk: 'Энтерпрайз' },
  'pricing.plan3.feat1': { en: 'Unlimited Projects', ru: 'Безлимитные проекты', kk: 'Шексіз жобалар' },
  'pricing.plan3.feat2': { en: 'Private Cloud Deployment', ru: 'Частное облачное развертывание', kk: 'Жеке бұлтты орналастыру' },
  'pricing.plan3.feat3': { en: 'Custom AI model training', ru: 'Обучение кастомных ИИ-моделей', kk: 'Таңдамалы ИИ модельдерін оқыту' },
  'pricing.plan3.feat4': { en: '24/7 Priority Support', ru: '24/7 Приоритетная поддержка', kk: '24/7 басымдықты қолдау' },
  'pricing.plan3.cta': { en: 'Contact Sales', ru: 'Связаться с отделом продаж', kk: 'Сату бөліміне хабарласыңыз' },

  // CTA
  'cta.title': { en: 'Ready to Design the Future?', ru: 'Готовы проектировать будущее?', kk: 'Болашақты жобалауға дайынсыз ба?' },
  'cta.desc': { en: 'Join leading biotech organizations in Central Asia using BaiVax to build a safer tomorrow.', ru: 'Присоединяйтесь к ведущим биотехнологическим организациям Центральной Азии.', kk: 'Ертеңгі күнді қауіпсіз ету үшін BaiVax пайдаланатын Орталық Азиядағы жетекші биотехнологиялық ұйымдарға қосылыңыз.' },
  'cta.button': { en: 'Create Your First Design', ru: 'Создать первый дизайн', kk: 'Алғашқы дизайнды жасау' },
  
  // Dashboard Items
  'dash.welcome': { en: 'Welcome back,', ru: 'С возвращением,', kk: 'Қош келдіңіз,' },
  'dash.new_project': { en: 'New Vaccine Design', ru: 'Новый дизайн вакцины', kk: 'Вакцинаның жаңа дизайны' },
  'dash.recent_projects': { en: 'Recent Projects', ru: 'Последние проекты', kk: 'Соңғы жобалар' },
  'dash.stats.projects': { en: 'Active Projects', ru: 'Активные проекты', kk: 'Белсенді жобалар' },
  'dash.stats.time': { en: 'Total Time Saved', ru: 'Всего времени сэкономлено', kk: 'Барлық үнемделген уақыт' },
  'dash.stats.adaptation': { en: 'Avg. Regional Adaptation', ru: 'Сред. региональная адаптация', kk: 'Орташа аймақтық бейімделу' },
  
  // New Project Wizard
  'wiz.step1': { en: 'Virus', ru: 'Вирус', kk: 'Вирус' },
  'wiz.step2': { en: 'Design', ru: 'Дизайн', kk: 'Дизайн' },
  'wiz.step3': { en: 'AI Analysis', ru: 'ИИ-анализ', kk: 'ИИ талдау' },
  'wiz.step4': { en: 'Review', ru: 'Обзор', kk: 'Шолу' },
  'wiz.target_title': { en: 'Target Selection', ru: 'Выбор цели', kk: 'Нысананы таңдау' },
  'wiz.target_desc': { en: 'Select a virus from our database of local strains or upload your own sequence.', ru: 'Выберите вирус из нашей базы локальных штаммов или загрузите свою последовательность.', kk: 'Біздің жергілікті штаммдар дерекқорынан вирусты таңдаңыз немесе өз тізбегіңізді жүктеңіз.' },
  'wiz.strain_db_label': { en: 'Strain Database (Central Asia)', ru: 'База штаммов (Центральная Азия)', kk: 'Штаммдар дерекқоры (Орталық Азия)' },
  'wiz.fasta_label': { en: 'FASTA Data', ru: 'Данные FASTA', kk: 'FASTA деректері' },
  'wiz.upload_fasta': { en: 'Upload .fasta', ru: 'Загрузить .fasta', kk: '.fasta жүктеу' },
  'wiz.fasta_note': { en: 'You can either paste the sequence or upload a file.', ru: 'Вы можете вставить последовательность или загрузить файл.', kk: 'Тізбекті қоюға немесе файлды жүктеуге болады.' },
  'wiz.next_config': { en: 'Next: Design Config', ru: 'Далее: Конфигурация', kk: 'Келесі: Конфигурация' },
  'wiz.config_title': { en: 'Design Configuration', ru: 'Конфигурация дизайна', kk: 'Дизайн конфигурациясы' },
  'wiz.config_desc': { en: 'Define your research goals and target platform.', ru: 'Определите цели исследования и целевую платформу.', kk: 'Зерттеу мақсаттары мен нысаналы платформаны анықтаңыз.' },
  'wiz.project_name_label': { en: 'Project Name', ru: 'Название проекта', kk: 'Жоба атауы' },
  'wiz.vaccine_platform_label': { en: 'Vaccine Platform', ru: 'Платформа вакцины', kk: 'Вакцина платформасы' },
  'wiz.optimization_priority_label': { en: 'Optimization Priority', ru: 'Приоритет оптимизации', kk: 'Оңтайландыру басымдығы' },
  'wiz.priority_immunogenicity': { en: 'Immunogenicity', ru: 'Иммуногенность', kk: 'Иммуногенділік' },
  'wiz.priority_safety': { en: 'Safety', ru: 'Безопасность', kk: 'Қауіпсіздік' },
  'wiz.priority_stability': { en: 'Stability', ru: 'Стабильность', kk: 'Тұрақтылық' },
  'wiz.priority_speed': { en: 'Speed', ru: 'Скорость', kk: 'Жылдамдық' },
  'wiz.start_analysis': { en: 'Start AI Analysis', ru: 'Начать ИИ-анализ', kk: 'ИИ талдауын бастау' },
  'wiz.back': { en: 'Back', ru: 'Назад', kk: 'Артқа' },
  'wiz.analyzing': { en: 'AI Genotype Analysis', ru: 'ИИ-анализ генотипа', kk: 'Генотипті ИИ талдау' },
  'wiz.progress_reading': { en: 'Reading Sequence...', ru: 'Чтение последовательности...', kk: 'Тізбекті оқу...' },
  'wiz.progress_hla': { en: 'Analyzing HLA compatibility...', ru: 'Анализ совместимости HLA...', kk: 'HLA үйлесімділігін талдау...' },
  'wiz.progress_delivery': { en: 'Designing Delivery system...', ru: 'Проектирование системы доставки...', kk: 'Жеткізу жүйесін жобалау...' },
  'wiz.executing': { en: 'Execute AI Design', ru: 'Выполнить ИИ-дизайн', kk: 'ИИ дизайнын орындау' },
  'wiz.design_title': { en: 'BaiVax Optimized Design', ru: 'Оптимизированный дизайн BaiVax', kk: 'BaiVax оңтайландырылған дизайны' },
  'wiz.ai_generated': { en: 'AI Generated', ru: 'Создано ИИ', kk: 'ИИ жасаған' },
  'wiz.regional_adaptation_title': { en: 'Regional Genetic Adaptation', ru: 'Региональная генетическая адаптация', kk: 'Аймақтық генетикалық бейімделу' },
  'wiz.regional_efficacy_label': { en: 'Regional Efficacy', ru: 'Региональная эффективность', kk: 'Аймақтық тиімділік' },
  'wiz.target_hla_label': { en: 'Target HLA Alleles', ru: 'Целевые аллели HLA', kk: 'Мақсатты HLA аллельдері' },
  'wiz.lnp_profile_title': { en: 'LNP Delivery Profile', ru: 'Профиль доставки LNP', kk: 'LNP жеткізу профилі' },
  'wiz.composition_label': { en: 'Composition', ru: 'Состав', kk: 'Құрамы' },
  'wiz.stability_score_label': { en: 'Stability Score', ru: 'Показатель стабильности', kk: 'Тұрақтылық көрсеткіші' },
  'wiz.sequence_design_title': { en: 'Sequence Design', ru: 'Дизайн последовательности', kk: 'Тізбек дизайны' },
  'wiz.mutations_covered_title': { en: 'Central Asian Mutations Covered', ru: 'Охваченные мутации Центр. Азии', kk: 'Қамтылған Орталық Азия мутациялары' },
  'wiz.modify_params': { en: 'Modify Parameters', ru: 'Изменить параметры', kk: 'Параметрлерді өзгерту' },
  'wiz.efficiency_impact_title': { en: 'Efficiency Impact', ru: 'Влияние на эффективность', kk: 'Тиімділікке әсері' },
  'wiz.time_saved_label': { en: 'Time Saved', ru: 'Сэкономлено времени', kk: 'Үнемделген уақыт' },
  'wiz.capital_saved_label': { en: 'Capital Saved', ru: 'Сэкономлено капитала', kk: 'Үнемделген капитал' },
  'wiz.next_steps_title': { en: 'Next Steps', ru: 'Следующие шаги', kk: 'Келесі қадамдар' },
  'wiz.next_step_1': { en: '1. Review mRNA secondary structure in Project Detail.', ru: '1. Проверьте вторичную структуру мРНК в деталях проекта.', kk: '1. Жоба мәліметтеріндегі мРНК екінші реттік құрылымын қарап шығыңыз.' },
  'wiz.next_step_2': { en: '2. Export sequences for synthesis partners.', ru: '2. Экспортируйте последовательности для партнеров по синтезу.', kk: '2. Синтез серіктестері үшін тізбектерді экспорттаңыз.' },
  'wiz.next_step_3': { en: '3. Simulate LNP binding dynamics.', ru: '3. Симулируйте динамику связывания LNP.', kk: '3. LNP байланысу динамикасын симуляциялау.' },
  'wiz.saving': { en: 'Saving Project...', ru: 'Сохранение проекта...', kk: 'Жоба сақталуда...' },
  'wiz.finish': { en: 'Finish & Save', ru: 'Завершить и сохранить', kk: 'Аяқтау және сақтау' },

  // Footer
  'footer.desc': { 
    en: 'Next-generation AI platform for vaccine design, enabling scientists to create optimized vaccines in minutes with a focus on nano-delivery and Central Asian strains.',
    ru: 'AI-платформа нового поколения для дизайна вакцин, позволяющая ученым создавать оптимизированные вакцины за считанные минуты.',
    kk: 'Вакцина дизайнына арналған келесі буын ИИ платформасы, ғалымдарға нано-жеткізуге және Орталық Азия штаммдарына назар аудара отырып, оңтайландырылған вакциналарды бірнеше минут ішінде жасауға мүмкіндік береді.'
  },
  'footer.platform': { en: 'Platform', ru: 'Платформа', kk: 'Платформа' },
  'footer.company': { en: 'Company', ru: 'Компания', kk: 'Компания' },
  'footer.legal': { en: 'Legal', ru: 'Юридическая информация', kk: 'Құқықтық ақпарат' },

  // Auth
  'auth.signin_title': { en: 'Sign In', ru: 'Войти', kk: 'Кіру' },
  'auth.signup_title': { en: 'Create Account', ru: 'Создать аккаунт', kk: 'Тіркелу' },
  'auth.signin_desc': { en: 'Enter your credentials to access the BaiVax dashboard', ru: 'Введите свои учетные данные для доступа к панели BaiVax', kk: 'BaiVax бақылау тақтасына кіру үшін деректеріңізді енгізіңіз' },
  'auth.signup_desc': { en: 'Join the next generation of vaccine design for Central Asia', ru: 'Присоединяйтесь к следующему поколению разработчиков вакцин', kk: 'Орталық Азия үшін вакцина дизайнының келесі буынына қосылыңыз' },
  'auth.or_continue': { en: 'Or continue with', ru: 'Или продолжить через', kk: 'Немесе арқылы жалғастырыңыз' },
  'auth.full_name': { en: 'Full Name', ru: 'Полное имя', kk: 'Толық аты-жөні' },
  'auth.email': { en: 'Email', ru: 'Электронная почта', kk: 'Электрондық пошта' },
  'auth.password': { en: 'Password', ru: 'Пароль', kk: 'Құпия сөз' },
  'auth.forgot_password': { en: 'Forgot password?', ru: 'Забыли пароль?', kk: 'Құпия сөзді ұмыттыңыз ба?' },
  'auth.signin_button': { en: 'Sign In', ru: 'Войти', kk: 'Кіру' },
  'auth.signup_button': { en: 'Create Account', ru: 'Создать аккаунт', kk: 'Тіркелу' },
  'auth.no_account': { en: "Don't have an account? Sign up", ru: 'Нет аккаунта? Зарегистрируйтесь', kk: 'Аккаунтыңыз жоқ па? Тіркеліңіз' },
  'auth.has_account': { en: 'Already have an account? Sign in', ru: 'Уже есть аккаунт? Войдите', kk: 'Аккаунтыңыз бар ма? Кіріңіз' },

  // History
  'history.title': { en: 'Project History', ru: 'История проектов', kk: 'Жоба тарихы' },
  'history.desc': { en: 'Comprehensive record of all your vaccine designs and analysis reports.', ru: 'Полный список всех ваших дизайнов вакцин и отчетов об анализе.', kk: 'Вакцина дизайндары мен талдау есептерінің толық тізімі.' },
  'history.searchPlaceholder': { en: 'Search by name or strain...', ru: 'Поиск по названию или штамму...', kk: 'Аты немесе штамм бойынша іздеу...' },
  'history.filterButton': { en: 'Filter', ru: 'Фильтр', kk: 'Сүзгі' },
  'history.exportCsvButton': { en: 'Export CSV', ru: 'Экспорт CSV', kk: 'CSV экспорты' },
  'history.viewDetailsButton': { en: 'View Details', ru: 'Подробнее', kk: 'Толығырақ' },
  'history.noProjectsFound.title': { en: 'No projects found', ru: 'Проекты не найдены', kk: 'Жобалар табылмады' },
  'history.noProjectsFound.desc': { en: 'Try adjusting your search or create a new design session.', ru: 'Попробуйте изменить поиск или создайте новый дизайн.', kk: 'Іздеуді өзгертіп көріңіз немесе жаңа дизайн жасаңыз.' },
  'history.newDesignButton': { en: 'New Vaccine Design', ru: 'Новый дизайн вакцины', kk: 'Вакцинаның жаңа дизайны' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
