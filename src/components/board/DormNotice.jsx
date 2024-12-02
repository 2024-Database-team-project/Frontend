// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import cheerio from 'cheerio';

// const DormNotice = () => {
//     const [notices, setNotices] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // CORS 우회를 위한 프록시 설정
//     const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
//     const DORM_NOTICE_URL = 'https://dorm.ajou.ac.kr/dorm/notice/notice.do';

//     useEffect(() => {
//         const fetchNotices = async () => {
//             try {
//                 // axios를 통한 크롤링
//                 const response = await axios.get(`${CORS_PROXY}${DORM_NOTICE_URL}`, {
//                     headers: {
//                         'X-Requested-With': 'XMLHttpRequest',
//                     },
//                 });

//                 // cheerio를 사용한 HTML 파싱
//                 const $ = cheerio.load(response.data);
//                 const crawledNotices = [];

//                 // 공지사항 테이블의 각 행 순회
//                 $('.board-list tr').each((index, element) => {
//                     // 각 열에서 필요한 정보 추출
//                     const id = $(element).find('td.no').text().trim();
//                     const titleElement = $(element).find('td.subject a');
//                     const title = titleElement.text().trim();
//                     const url = titleElement.attr('href')
//                         ? `https://dorm.ajou.ac.kr${titleElement.attr('href')}`
//                         : undefined;
//                     const date = $(element).find('td.date').text().trim();
//                     const author = $(element).find('td.name').text().trim();
//                     const views = parseInt($(element).find('td.hit').text().trim(), 10) || 0;

//                     // 유효한 공지사항만 추가
//                     if (title && date) {
//                         crawledNotices.push({
//                             id,
//                             title,
//                             date,
//                             author,
//                             views,
//                             url,
//                         });
//                     }
//                 });

//                 setNotices(crawledNotices);
//                 setLoading(false);
//             } catch (err) {
//                 console.error('크롤링 중 오류:', err);
//                 setError('공지사항을 불러오는 중 오류가 발생했습니다.');
//                 setLoading(false);
//             }
//         };

//         fetchNotices();
//     }, []);

//     // 로딩 상태 렌더링
//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-full">
//                 <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
//                 <span className="ml-2">공지사항 로딩 중...</span>
//             </div>
//         );
//     }

//     // 에러 상태 렌더링
//     if (error) {
//         return <div className="text-red-500 text-center p-4">{error}</div>;
//     }

//     // 공지사항 목록 렌더링
//     return (
//         <div className="p-4">
//             <h2 className="text-2xl font-bold mb-4">기숙사 공지사항</h2>
//             <table className="w-full border-collapse">
//                 <thead>
//                     <tr className="bg-gray-100">
//                         <th className="border p-2 text-left">번호</th>
//                         <th className="border p-2 text-left">제목</th>
//                         <th className="border p-2 text-left">날짜</th>
//                         <th className="border p-2 text-left">조회수</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {notices.map((notice, index) => (
//                         <tr
//                             key={notice.id}
//                             className="hover:bg-gray-50 cursor-pointer"
//                             onClick={() => notice.url && window.open(notice.url, '_blank')}
//                         >
//                             <td className="border p-2">{index + 1}</td>
//                             <td className="border p-2">{notice.title}</td>
//                             <td className="border p-2">{notice.date}</td>
//                             <td className="border p-2">{notice.views}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default DormNotice;
