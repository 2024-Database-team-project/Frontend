import React, { useState, useEffect } from 'react';
import { Timer, AlertCircle, CheckCircle } from 'lucide-react';

const Laundry = () => {
    // 12개의 세탁기와 12개의 건조기 초기화
    const [washingMachines, setWashingMachines] = useState(
        Array.from({ length: 12 }, (_, index) => ({
            id: index + 1,
            inUse: false,
            startTime: null,
            remainingTime: 0,
            user: null,
        }))
    );

    const [dryerMachines, setDryerMachines] = useState(
        Array.from({ length: 12 }, (_, index) => ({
            id: index + 1,
            inUse: false,
            startTime: null,
            remainingTime: 0,
            user: null,
        }))
    );

    // 사용자 정보를 위한 상태 (예시)
    const [currentUser, setCurrentUser] = useState({
        id: 1,
        name: '이상민',
        room: '308호',
    });

    // 기계 시작 함수 (사용자 정보 추가)
    const startMachine = (type, machineId) => {
        const currentTime = new Date();
        const machines = type === 'washer' ? washingMachines : dryerMachines;
        const updatedMachines = machines.map((machine) =>
            machine.id === machineId && !machine.inUse
                ? {
                      ...machine,
                      inUse: true,
                      startTime: currentTime,
                      remainingTime: type === 'washer' ? 45 : 60,
                      user: currentUser,
                  }
                : machine
        );

        type === 'washer' ? setWashingMachines(updatedMachines) : setDryerMachines(updatedMachines);
    };

    // 기계 정지/완료 함수
    const stopMachine = (type, machineId) => {
        const machines = type === 'washer' ? washingMachines : dryerMachines;
        const updatedMachines = machines.map((machine) =>
            machine.id === machineId
                ? {
                      ...machine,
                      inUse: false,
                      startTime: null,
                      remainingTime: 0,
                      user: null,
                  }
                : machine
        );

        type === 'washer' ? setWashingMachines(updatedMachines) : setDryerMachines(updatedMachines);
    };

    // 시간 및 알림 관리 로직
    useEffect(() => {
        const interval = setInterval(() => {
            const updateMachines = (machines, setter) => {
                const updatedMachines = machines.map((machine) => {
                    if (machine.inUse) {
                        const elapsedTime = (new Date() - machine.startTime) / 60000;
                        const newRemainingTime = Math.max(0, machine.remainingTime - elapsedTime);

                        if (newRemainingTime <= 10) {
                            sendNotification(`${machine.user.name} 님, 기계 ${machine.id}의 작업이 곧 완료됩니다!`);
                        }

                        return {
                            ...machine,
                            remainingTime: newRemainingTime,
                            inUse: newRemainingTime > 0,
                        };
                    }
                    return machine;
                });

                setter(updatedMachines);
            };

            updateMachines(washingMachines, setWashingMachines);
            updateMachines(dryerMachines, setDryerMachines);
        }, 60000);

        return () => clearInterval(interval);
    }, [washingMachines, dryerMachines]);

    // 알림 발송 함수
    const sendNotification = (message) => {
        if ('Notification' in window) {
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    new Notification('세탁/건조 알림', { body: message });
                }
            });
        }
    };

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">기숙사 빨래 트래커</h1>

            <div className="grid grid-cols-2 gap-4">
                {/* 세탁기 섹션 */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">세탁기 (12대)</h2>
                    <div className="grid grid-cols-3 gap-2">
                        {washingMachines.map((machine) => (
                            <div
                                key={`washer-${machine.id}`}
                                className={`p-2 border rounded ${machine.inUse ? 'bg-yellow-100' : 'bg-white'}`}
                            >
                                <div className="flex flex-col items-center">
                                    <span className="text-sm mb-1">세탁기 {machine.id}</span>
                                    {machine.inUse ? (
                                        <div className="flex flex-col items-center">
                                            <Timer className="text-blue-500" />
                                            <span className="text-xs">{Math.round(machine.remainingTime)}분</span>
                                            <span className="text-xs text-gray-600">{machine.user?.name}</span>
                                            <button
                                                onClick={() => stopMachine('washer', machine.id)}
                                                className="mt-1 bg-red-500 text-white text-xs px-1 py-1 rounded"
                                            >
                                                중지
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => startMachine('washer', machine.id)}
                                            className="bg-green-500 text-white text-xs px-2 py-1 rounded"
                                        >
                                            시작
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 건조기 섹션 */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">건조기 (12대)</h2>
                    <div className="grid grid-cols-3 gap-2">
                        {dryerMachines.map((machine) => (
                            <div
                                key={`dryer-${machine.id}`}
                                className={`p-2 border rounded ${machine.inUse ? 'bg-yellow-100' : 'bg-white'}`}
                            >
                                <div className="flex flex-col items-center">
                                    <span className="text-sm mb-1">건조기 {machine.id}</span>
                                    {machine.inUse ? (
                                        <div className="flex flex-col items-center">
                                            <Timer className="text-blue-500" />
                                            <span className="text-xs">{Math.round(machine.remainingTime)}분</span>
                                            <span className="text-xs text-gray-600">{machine.user?.name}</span>
                                            <button
                                                onClick={() => stopMachine('dryer', machine.id)}
                                                className="mt-1 bg-red-500 text-white text-xs px-1 py-1 rounded"
                                            >
                                                중지
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => startMachine('dryer', machine.id)}
                                            className="bg-green-500 text-white text-xs px-2 py-1 rounded"
                                        >
                                            시작
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Laundry;
