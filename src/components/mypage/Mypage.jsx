import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Api from '../../api/api';

const MyPage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [penaltyHistory, setPenaltyHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId] = useParams(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const [userResponse, penaltyResponse] = await Promise.all([Api.get(`/user/profile`)]);

                setUserInfo(userResponse.data);
                setPenaltyHistory(penaltyResponse.data);
                setLoading(false);
            } catch (err) {
                console.error('데이터 로딩 중 오류:', err);
                setError('정보를 불러오는 중 오류가 발생했습니다.');
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    // 총 벌점 계산 함수
    const calculateTotalPenalty = () => {
        return penaltyHistory.reduce((total, penalty) => total + penalty.points, 0);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
                <span className="ml-2">정보를 불러오는 중...</span>
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center p-4">{error}</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">마이페이지</h1>

            {/* 사용자 기본 정보 */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4">기본 정보</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <span className="font-medium">이름:</span> {userInfo.name}
                    </div>
                    <div>
                        <span className="font-medium">학과:</span> {userInfo.department}
                    </div>
                    <div>
                        <span className="font-medium">학번:</span> {userInfo.studentId}
                    </div>
                    <div>
                        <span className="font-medium">생활관:</span> {userInfo.dormitory}
                    </div>
                    <div>
                        <span className="font-medium">호실:</span> {userInfo.roomNumber}
                    </div>
                </div>
            </div>

            {/* 벌점 내역 */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">벌점 내역</h2>
                    <div className="text-lg font-bold text-red-600">총 벌점: {calculateTotalPenalty()}점</div>
                </div>

                {penaltyHistory.length === 0 ? (
                    <div className="text-center text-gray-500">벌점 내역이 없습니다.</div>
                ) : (
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2 text-left">날짜</th>
                                <th className="border p-2 text-left">벌점</th>
                                <th className="border p-2 text-left">사유</th>
                            </tr>
                        </thead>
                        <tbody>
                            {penaltyHistory.map((penalty, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="border p-2">{new Date(penalty.date).toLocaleDateString()}</td>
                                    <td className="border p-2 text-red-600">{penalty.points}점</td>
                                    <td className="border p-2">{penalty.reason}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default MyPage;
