const Penalty = () => {
    const penaltyRules = [
        { code: 'R01', description: '자퇴, 휴학한 자', points: 30 },
        { code: 'R01', description: '범죄행위로 인하여 구속된 자', points: 30 },
        { code: 'R01', description: '학교로부터 유기정학 이상의 징계를 받은 자', points: 30 },
        { code: 'R01', description: '대리입사 및 비사생 동반하여 숙박하는 경우', points: 30 },
        {
            code: 'R01',
            description: '음주, 폭행, 도박, 화재발생 행위, 절도(타인의 우편물이나 택배 무단 수취 포함)',
            points: 30,
        },
        { code: 'R01', description: '파렴치한 행위 등 단체생활 부적격자', points: 30 },
        { code: 'R01', description: '비정상적인 통로를 통한 무단출입', points: 30 },
        { code: 'R01', description: '이성 생활관(층, 호실) 출입/숙박하거나 도운 행위', points: 30 },
        { code: 'R01', description: '감염병 예방을 위한 학교 및 기숙사 필수 안내 지침에 따르지 않는 행위', points: 30 },
        { code: 'R01', description: '생활관 내부에서의 흡연(전자담배 포함)', points: 30 },
        { code: 'R01', description: '생활관에서 요구하는 서류(건강검진결과 등)를 제출하지 않았을 경우', points: 30 },
        {
            code: 'R01',
            description: '생활관 건물 주변 외부 흡연금지 구역에서의 흡연, 호실 내 담배꽁초 적발',
            points: 20,
        },
        { code: 'R01', description: '임의로 호실 변경', points: 20 },
        { code: 'R01', description: '인터넷을 통해 허위사실 유포, 비방행위', points: 20 },
        {
            code: 'R01',
            description: '생활관 근무직원에게 불손한 언행(전화와 인터넷 포함)으로 업무 방해, 정당한 지시에 불이행',
            points: 20,
        },
        {
            code: 'R01',
            description: '생활관 기물과 시설물을 훼손, 임의 개조, 반출하는 행위 (훼손 시 변상)',
            points: 20,
        },
        {
            code: 'R01',
            description: '음주귀사 후 인사불성으로 인한 소란, 오인 입실, 구토, 용변 등으로 타인에게 피해를 주는 경우',
            points: 20,
        },
        {
            code: 'R01',
            description:
                '쓰레기(음식물 등)를 지정 장소가 아닌 곳에 배출 및 방치하거나 지정된 쓰레기 분리 배출 방식을 지키지 않는 행위',
            points: 20,
        },
        {
            code: 'R01',
            description: '소란 및 소음으로 타 사생의 생활에 지장을 주는 경우 (생활관 실내/외 전체)',
            points: 15,
        },
        {
            code: 'R01',
            description:
                '생활관 반입금지 물품 및 인화물질을 반입하거나 사용한 행위(반입가능하나 미승인된 물품 사용 포함)',
            points: 15,
        },
        { code: 'R01', description: '생활관 내 주식을 취사하는 경우(취사실 제외)', points: 15 },
        { code: 'R01', description: '학생증을 임의로 타인에게 대여 (모바일학생증 포함)', points: 15 },
        // 필요한 규칙 추가
    ];

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">기숙사 벌점 규정</h1>
            <p className="mb-4 text-lg">
                모든 사생은 사생규칙을 준수해야 합니다. 사생 수칙을 위반한 자는 다음과 같은 벌점이 적용됩니다.
            </p>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-2 text-left">코드</th>
                            <th className="border p-2 text-left">내용</th>
                            <th className="border p-2 text-left">벌점</th>
                        </tr>
                    </thead>
                    <tbody>
                        {penaltyRules.map((rule, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="border p-2">{rule.code}</td>
                                <td className="border p-2">{rule.description}</td>
                                <td className="border p-2 text-red-600">{rule.points}점</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Penalty;
