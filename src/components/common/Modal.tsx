interface SuccessModalProps {
    onClose: () => void;
}

export default function SuccessModal({ onClose }: SuccessModalProps): JSX.Element {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-[335px] rounded-2xl p-6 mx-4 text-gray-700">
                <h2 className="text-xl font-semibold text-center mb-2">
                    전송 완료
                </h2>
                <p className="text-gray-600 text-center mb-6">
                    음성이 성공적으로 전송되었습니다.
                </p>
                <button
                    onClick={onClose}
                    className="w-full bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-600 active:bg-blue-700"
                >
                    확인
                </button>
            </div>
        </div>
    );
}