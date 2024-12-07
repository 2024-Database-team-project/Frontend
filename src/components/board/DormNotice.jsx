import { useState, useEffect } from 'react';
import axios from 'axios';
import Api from '../../api/api';

const DormNotice = () => {
    const [notices, setNotices] = useState([]);
    const [selectedNotice, setSelectedNotice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await Api.get(`/dorm/notice`); // 서버의 API 호출
                setNotices(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching notices:', err);
                setError('공지사항을 불러오는 중 오류가 발생했습니다.');
                setLoading(false);
            }
        };

        fetchNotices();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
                <span className="ml-2">공지사항 로딩 중...</span>
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center p-4">{error}</div>;
    }

    const viewNotice = (notice) => {
        setSelectedNotice(notice);
    };

    const goBackToList = () => {
        setSelectedNotice;
    };

    if (selectedNotice) {
        return (
            <div className="p-4">
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">{selectedNotice.title}</h2>
                    <div className="mb-4 text-gray-600">
                        <span className="ml-4">작성자: {selectedNotice.author}</span>
                        <span className="ml-4">작성시간: {selectedNotice.date}</span>
                    </div>
                    <div className="whitespace-pre-wrap">{selectedNotice}</div>
                    <button
                        onClick={goBackToList}
                        className="mt-4 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                    >
                        목록으로
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">기숙사 공지사항</h2>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2 text-left">번호</th>
                        <th className="border p-2 text-left">글쓴이</th>
                        <th className="border p-2 text-left">제목</th>
                        <th className="border p-2 text-left">날짜</th>
                    </tr>
                </thead>
                <tbody>
                    {notices.map((notice, index) => (
                        <tr
                            key={notice.noticeIdx}
                            className="hover:bg-gray-50 cursor-pointer"
                            onClick={() => viewNotice(notice)}
                        >
                            <td className="border p-2">{index + 1}</td>
                            <td className="border p-2">{notice.noticeWriter}</td>
                            <td className="border p-2">{notice.noticeTitle}</td>
                            <td className="border p-2">{notice.noticeDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DormNotice;
