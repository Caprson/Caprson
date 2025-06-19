import { useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const WS_URL = 'http://localhost:8086/ws'; // Cập nhật đúng host khi deploy

export default function useUserStoryEvents({ onCreated, onUpdated, onDeleted }) {
    useEffect(() => {
        const socket = new SockJS(WS_URL);
        const stompClient = new Client({
            webSocketFactory: () => socket,
            debug: (str) => console.log(str),
            reconnectDelay: 5000,
        });

        stompClient.onConnect = () => {
            console.log('✅ WebSocket Connected');

            stompClient.subscribe('/topic/userstory-created', (message) => {
                const payload = JSON.parse(message.body);
                onCreated?.(payload);
            });

            stompClient.subscribe('/topic/userstory-updated', (message) => {
                const payload = JSON.parse(message.body);
                onUpdated?.(payload);
            });

            stompClient.subscribe('/topic/userstory-deleted', (message) => {
                const payload = JSON.parse(message.body);
                onDeleted?.(payload);
            });
        };

        stompClient.activate();

        return () => {
            stompClient.deactivate();
        };
    }, [onCreated, onUpdated, onDeleted]);
}
