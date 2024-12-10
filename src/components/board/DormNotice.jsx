import { useState, useEffect } from 'react';
import Api from '../../api/api';

const DormNotice = ({ isMainPage }) => {
    const [notices, setNotices] = useState([]);
    const [selectedNotice, setSelectedNotice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // 페이지 번호
    const noticesPerPage = isMainPage ? 5 : 10; // 메인 화면에서는 5개, 공지사항 페이지에서는 10개

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
        setSelectedNotice(null);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // 페이지네이션 계산
    const startIndex = (currentPage - 1) * noticesPerPage;
    const paginatedNotices = notices.slice(startIndex, startIndex + noticesPerPage);
    const totalPages = Math.ceil(notices.length / noticesPerPage);

    if (selectedNotice) {
        return (
            <div className="p-4">
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">{selectedNotice.noticeTitle}</h2>
                    <div className="mb-4 text-gray-600">
                        <span className="ml-4">작성자: {selectedNotice.noticeWriter}</span>
                        <span className="ml-4">작성시간: {selectedNotice.noticeDate}</span>
                    </div>
                    <div className="whitespace-pre-wrap">{selectedNotice.noticeContent}</div>
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
                    {paginatedNotices.map((notice) => (
                        <tr
                            key={notice.noticeIdx}
                            className="hover:bg-gray-50 cursor-pointer"
                            onClick={() => viewNotice(notice)}
                        >
                            <td className="border p-2">{notice.noticeIdx}</td>
                            <td className="border p-2">{notice.noticeWriter}</td>
                            <td className="border p-2">{notice.noticeTitle}</td>
                            <td className="border p-2">{notice.noticeDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* 페이지네이션 */}
            {!isMainPage && (
                <div className="flex justify-center mt-4">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-4 py-2 mx-1 rounded ${
                                currentPage === index + 1
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-300 text-black hover:bg-gray-400'
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DormNotice;
