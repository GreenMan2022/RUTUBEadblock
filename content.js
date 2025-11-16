(function () {
    'use strict';

    console.log('[Rutube Ad Skipper] Активирован');

    const handledContainers = new WeakSet();

    const observer = new MutationObserver(() => {
        // Ищем рекламные контейнеры
        const adContainers = document.querySelectorAll('div.yandex-advert-module__SDKWrapper___WMfXh');
        
        adContainers.forEach(container => {
            if (handledContainers.has(container)) return;

            const videos = container.querySelectorAll('video');
            videos.forEach(video => {
                try {
                    video.pause();
                    video.currentTime = video.duration || 999999;
                    video.src = '';
                    video.load();
                    console.log('[Rutube Ad Skipper] Реклама заблокирована');
                } catch (e) {
                    console.warn('[Rutube Ad Skipper] Ошибка при блокировке рекламы:', e);
                }
            });

            handledContainers.add(container);
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
