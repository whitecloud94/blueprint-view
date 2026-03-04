import { useState, useCallback } from 'react';

export const useToast = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState('');

    const showToast = useCallback((msg: string, duration = 2500) => {
        setMessage(msg);
        setIsVisible(true);
        setTimeout(() => setIsVisible(false), duration);
    }, []);

    const showDevToast = useCallback(() => {
        showToast("현재 개발중입니다.");
    }, [showToast]);

    return { isVisible, message, showToast, showDevToast };
};
