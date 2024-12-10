import { useState, useEffect } from 'react';
import axios from 'axios';
import Api from '../../api/api';

const DeliveryService = () => {
    const [deliveries, setDeliveries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [notificationEnabled, setNotificationEnabled] = useState(false);

    // 택배 목록 불러오기
    useEffect(() => {
        const fetchDeliveries = async () => {
            try {
                const response = await Api.get('/api/deliveries');
                setDeliveries(response.data);
                setLoading(false);
            } catch (err) {
                console.error('택배 정보 로딩 중 오류:', err);
                setError('택배 정보를 불러오는 중 오류가 발생했습니다.');
                setLoading(false);
            }
        };

        fetchDeliveries();
    }, []);

    // 웹 푸시 알림 권한 요청
    const requestNotificationPermission = async () => {
        try {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                setNotificationEnabled(true);
                // 백엔드에 알림 설정 저장
                await axios.post('/api/notifications/enable');
            }
        } catch (err) {
            console.error('알림 권한 요청 중 오류:', err);
        }
    };

    // 택배 수령 처리
    const handlePickupDelivery = async (deliveryId) => {
        try {
            await axios.post(`/api/deliveries/${deliveryId}/pickup`);
            // 택배 목록에서 해당 항목 제거
            setDeliveries((prevDeliveries) => prevDeliveries.filter((delivery) => delivery.id !== deliveryId));
        } catch (err) {
            console.error('택배 수령 처리 중 오류:', err);
        }
    };

    // 알림 비활성화
    const disableNotifications = async () => {
        try {
            await axios.post('/api/notifications/disable');
            setNotificationEnabled(false);
        } catch (err) {
            console.error('알림 비활성화 중 오류:', err);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
                <span className="ml-2">택배 정보를 불러오는 중...</span>
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center p-4">{error}</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">택배 알림 서비스</h1>

            {/* 알림 설정 섹션 */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4">알림 설정</h2>
                {!notificationEnabled ? (
                    <button
                        onClick={requestNotificationPermission}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        택배 도착 알림 활성화
                    </button>
                ) : (
                    <div className="flex items-center">
                        <span className="text-green-600 mr-4">알림이 활성화되었습니다.</span>
                        <button
                            onClick={disableNotifications}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            알림 비활성화
                        </button>
                    </div>
                )}
            </div>

            {/* 택배 목록 섹션 */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">내 택배 목록</h2>

                {deliveries.length === 0 ? (
                    <div className="text-center text-gray-500">도착한 택배가 없습니다.</div>
                ) : (
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2 text-left">도착 날짜</th>
                                <th className="border p-2 text-left">택배사</th>
                                <th className="border p-2 text-left">운송장 번호</th>
                                <th className="border p-2 text-left">보관 위치</th>
                                <th className="border p-2 text-left">수령 여부</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deliveries.map((delivery) => (
                                <tr key={delivery.id} className="hover:bg-gray-50">
                                    <td className="border p-2">
                                        {new Date(delivery.arrivalDate).toLocaleDateString()}
                                    </td>
                                    <td className="border p-2">{delivery.courier}</td>
                                    <td className="border p-2">{delivery.trackingNumber}</td>
                                    <td className="border p-2">{delivery.storageLocation}</td>
                                    <td className="border p-2">
                                        <button
                                            onClick={() => handlePickupDelivery(delivery.id)}
                                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                        >
                                            수령 완료
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default DeliveryService;
