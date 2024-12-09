import { useState, useEffect } from 'react';
import axios from 'axios';
import Api from '../../api/api';

// 생활관 옵션 정의
const DORMITORY_OPTIONS = ['남제관', '용지관', '광교관', '화홍관', '국제학사', '일신관'];

// 게시판 메인 컴포넌트
const SuggestionBoard = ({ isMainPage }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [selectedSuggestion, setSelectedSuggestion] = useState(null);
    const [response, setResponse] = useState(null);
    const [loadingResponse, setLoadingResponse] = useState(false);
    const [isWriteMode, setIsWriteMode] = useState(false);
    const [newSuggestion, setNewSuggestion] = useState({
        dormitory: '',
        title: '',
        content: '',
        author: '',
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = isMainPage ? 5 : 10; // 메인 화면에서는 5개, 게시판에서는 10개
    const paginatedSuggestions = suggestions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // 게시글 목록 불러오기
    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const response = await Api.get('/dorm/request');
                setSuggestions(response.data);
            } catch (error) {
                console.error('게시글 불러오기 실패:', error);
            }
        };

        fetchSuggestions();
    }, []);

    const handleViewSuggestion = async (suggestion) => {
        setSelectedSuggestion(suggestion);
        setLoadingResponse(true);
        try {
            const response = await Api.get(`/dorm/response/${suggestion.requestIdx}`);
            setResponse(response.data);
        } catch (error) {
            console.error('답변 불러오기 실패:', error);
            setResponse(null);
        } finally {
            setLoadingResponse(false);
        }
    };

    // 게시글 작성 핸들러
    // const handleSubmitSuggestion = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post('suggestions', {
    //             ...newSuggestion,
    //             createdAt: new Date().toISOString(),
    //         });

    //         setSuggestions([...suggestions, response.data]);
    //         setIsWriteMode(false);
    //         setNewSuggestion({ dormitory: '', title: '', content: '', author: '' });
    //     } catch (error) {
    //         console.error('게시글 작성 실패:', error);
    //     }
    // };

    // 게시글 상세보기 핸들러

    // 입력 변경 핸들러
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSuggestion((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // 글쓰기 모드로 전환
    const switchToWriteMode = () => {
        setIsWriteMode(true);
        setSelectedSuggestion(null);
    };

    // 목록으로 돌아가기
    const goBackToList = () => {
        setSelectedSuggestion(null);
        setIsWriteMode(false);
    };

    const totalPages = Math.ceil(suggestions.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // 글쓰기 화면
    // if (isWriteMode) {
    //     return (
    //         <div className="p-4">
    //             <h2 className="text-2xl font-bold mb-4">건의사항 작성</h2>
    //             <form onSubmit={handleSubmitSuggestion} className="space-y-4">
    //                 <div>
    //                     <label className="block mb-2">생활관 선택</label>
    //                     <select
    //                         name="dormitory"
    //                         value={newSuggestion.dormitory}
    //                         onChange={handleInputChange}
    //                         required
    //                         className="w-full p-2 border rounded"
    //                     >
    //                         <option value="">생활관을 선택하세요</option>
    //                         {DORMITORY_OPTIONS.map((dorm) => (
    //                             <option key={dorm} value={dorm}>
    //                                 {dorm}
    //                             </option>
    //                         ))}
    //                     </select>
    //                 </div>
    //                 <div>
    //                     <label className="block mb-2">작성자</label>
    //                     <input
    //                         type="text"
    //                         name="author"
    //                         value={newSuggestion.author}
    //                         onChange={handleInputChange}
    //                         required
    //                         placeholder="작성자명을 입력하세요"
    //                         className="w-full p-2 border rounded"
    //                     />
    //                 </div>
    //                 <div>
    //                     <label className="block mb-2">제목</label>
    //                     <input
    //                         type="text"
    //                         name="title"
    //                         value={newSuggestion.title}
    //                         onChange={handleInputChange}
    //                         required
    //                         placeholder="제목을 입력하세요"
    //                         className="w-full p-2 border rounded"
    //                     />
    //                 </div>
    //                 <div>
    //                     <label className="block mb-2">내용</label>
    //                     <textarea
    //                         name="content"
    //                         value={newSuggestion.content}
    //                         onChange={handleInputChange}
    //                         required
    //                         placeholder="내용을 입력하세요"
    //                         rows={6}
    //                         className="w-full p-2 border rounded"
    //                     ></textarea>
    //                 </div>
    //                 <div className="flex space-x-2">
    //                     <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
    //                         작성 완료
    //                     </button>
    //                     <button
    //                         type="button"
    //                         onClick={goBackToList}
    //                         className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
    //                     >
    //                         취소
    //                     </button>
    //                 </div>
    //             </form>
    //         </div>
    //     );
    // }

    // 게시글 상세보기 화면
    if (selectedSuggestion) {
        return (
            <div className="p-4">
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">{selectedSuggestion.requestTitle}</h2>
                    <div className="mb-4 text-gray-600">
                        <span>생활관: {selectedSuggestion.dormitory}</span>
                        <span className="ml-4">작성자: {selectedSuggestion.author}</span>
                        <span className="ml-4">작성시간: {selectedSuggestion.requestDate}</span>
                    </div>
                    <div className="whitespace-pre-wrap">{selectedSuggestion.requestContent}</div>
                    {loadingResponse ? (
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
                    ) : response ? (
                        <div className="whitespace-pre-wrap bg-gray-100 p-4 rounded">
                            <h3 className="text-lg font-bold mb-2">관리자 답변</h3>
                            <p>{response.responseContent}</p>
                            <p className="text-sm text-gray-600 mt-2">답변 날짜: {response.responseDate}</p>
                        </div>
                    ) : (
                        <p className="text-gray-500">답변이 아직 등록되지 않았습니다.</p>
                    )}
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

    // 게시글 목록 화면
    return (
        <div className="w-full p-4">
            <h2 className="text-2xl font-bold mb-4"> 건의사항 게시판</h2>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2 text-left">번호</th>
                        <th className="border p-2 text-left">제목</th>
                        <th className="border p-2 text-left">작성자</th>
                        <th className="border p-2 text-left">작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedSuggestions.map((suggestion) => (
                        <tr
                            key={suggestion.requestIdx}
                            className="hover:bg-gray-50 cursor-pointer"
                            onClick={() => handleViewSuggestion(suggestion)}
                        >
                            <td className="border p-2">{suggestion.requestIdx}</td>
                            <td className="border p-2">{suggestion.requestTitle}</td>
                            <td className="border p-2">{suggestion.studentID}</td>
                            <td className="border p-2">{suggestion.requestDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {!isMainPage && (
                <div className="mt-4 flex justify-center space-x-2">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-4 py-2 rounded ${
                                currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'
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

export default SuggestionBoard;
