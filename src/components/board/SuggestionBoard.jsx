import { useState, useEffect } from 'react';
import axios from 'axios';

// 생활관 옵션 정의
const DORMITORY_OPTIONS = ['남제관', '용지관', '광교관', '화홍관', '국제학사', '일신관'];

// 게시판 메인 컴포넌트
const SuggestionBoard = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [selectedSuggestion, setSelectedSuggestion] = useState(null);
    const [isWriteMode, setIsWriteMode] = useState(false);
    const [newSuggestion, setNewSuggestion] = useState({
        dormitory: '',
        title: '',
        content: '',
        author: '',
    });

    // 게시글 목록 불러오기
    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const response = await axios.get('/api/suggestions');
                setSuggestions(response.data);
            } catch (error) {
                console.error('게시글 불러오기 실패:', error);
            }
        };

        fetchSuggestions();
    }, []);

    // 게시글 작성 핸들러
    const handleSubmitSuggestion = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/suggestions', {
                ...newSuggestion,
                createdAt: new Date().toISOString(),
            });

            setSuggestions([...suggestions, response.data]);
            setIsWriteMode(false);
            setNewSuggestion({ dormitory: '', title: '', content: '', author: '' });
        } catch (error) {
            console.error('게시글 작성 실패:', error);
        }
    };

    // 게시글 상세보기 핸들러
    const handleViewSuggestion = (suggestion) => {
        setSelectedSuggestion(suggestion);
    };

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

    // 글쓰기 화면
    if (isWriteMode) {
        return (
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">건의사항 작성</h2>
                <form onSubmit={handleSubmitSuggestion} className="space-y-4">
                    <div>
                        <label className="block mb-2">생활관 선택</label>
                        <select
                            name="dormitory"
                            value={newSuggestion.dormitory}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border rounded"
                        >
                            <option value="">생활관을 선택하세요</option>
                            {DORMITORY_OPTIONS.map((dorm) => (
                                <option key={dorm} value={dorm}>
                                    {dorm}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2">작성자</label>
                        <input
                            type="text"
                            name="author"
                            value={newSuggestion.author}
                            onChange={handleInputChange}
                            required
                            placeholder="작성자명을 입력하세요"
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block mb-2">제목</label>
                        <input
                            type="text"
                            name="title"
                            value={newSuggestion.title}
                            onChange={handleInputChange}
                            required
                            placeholder="제목을 입력하세요"
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block mb-2">내용</label>
                        <textarea
                            name="content"
                            value={newSuggestion.content}
                            onChange={handleInputChange}
                            required
                            placeholder="내용을 입력하세요"
                            rows={6}
                            className="w-full p-2 border rounded"
                        ></textarea>
                    </div>
                    <div className="flex space-x-2">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            작성 완료
                        </button>
                        <button
                            type="button"
                            onClick={goBackToList}
                            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                        >
                            취소
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    // 게시글 상세보기 화면
    if (selectedSuggestion) {
        return (
            <div className="p-4">
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">{selectedSuggestion.title}</h2>
                    <div className="mb-4 text-gray-600">
                        <span>생활관: {selectedSuggestion.dormitory}</span>
                        <span className="ml-4">작성자: {selectedSuggestion.author}</span>
                        <span className="ml-4">
                            작성시간: {new Date(selectedSuggestion.createdAt).toLocaleString()}
                        </span>
                    </div>
                    <div className="whitespace-pre-wrap">{selectedSuggestion.content}</div>
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
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">건의사항 게시판</h2>
                <button
                    onClick={switchToWriteMode}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    글쓰기
                </button>
            </div>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2 text-left">번호</th>
                        <th className="border p-2 text-left">생활관</th>
                        <th className="border p-2 text-left">제목</th>
                        <th className="border p-2 text-left">작성자</th>
                        <th className="border p-2 text-left">작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {suggestions.map((suggestion, index) => (
                        <tr
                            key={suggestion.id}
                            onClick={() => handleViewSuggestion(suggestion)}
                            className="hover:bg-gray-50 cursor-pointer"
                        >
                            <td className="border p-2">{index + 1}</td>
                            <td className="border p-2">{suggestion.dormitory}</td>
                            <td className="border p-2">{suggestion.title}</td>
                            <td className="border p-2">{suggestion.author}</td>
                            <td className="border p-2">{new Date(suggestion.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SuggestionBoard;
