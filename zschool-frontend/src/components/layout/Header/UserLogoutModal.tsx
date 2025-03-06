import { AlertCircle, CircleX } from "lucide-react";
import Modal from "../Modal";
import loadingIndicator from "../../../assets/tube-spinner.svg";
import { Alert, AlertDescription, AlertTitle } from "../../ui/alert";

type Props = {
  onClose: () => void;
  onLogout: () => void;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
};

const UserLogoutModal: React.FC<Props> = ({
  onClose,
  onLogout,
  isPending,
  isError,
  error,
}) => {
  return (
    <Modal>
      <div className="space-y-4">
        <div className="flex flex-row justify-between border-b-2 border-gray-200 pb-2">
          <h1 className="text-2xl text-red-400 font-bold">Đăng Xuất</h1>
          <button
            onClick={onClose}
            className="text-red-400 hover:text-red-500 cursor-pointer"
          >
            <CircleX size={30} />
          </button>
        </div>

        <p>Bạn có thật sự muốn rời xa không?</p>
        <p>Chúng tôi sẽ nhớ bạn rất nhiều – hãy quay lại sớm nhé!</p>

        {isPending && (
          <div className="flex justify-center items-center">
            <img src={loadingIndicator} className="size-24"></img>
          </div>
        )}

        {isError && (
          <Alert variant="destructive" className="my-2">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Lỗi</AlertTitle>
            <AlertDescription>{error?.message}</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-row justify-end border-t-2 border-gray-200 pt-2 space-x-4">
          <button
            onClick={onClose}
            className={`text-black px-4 py-2 rounded-lg ${
              isPending ? "bg-gray-300/50" : "bg-gray-300 hover:bg-gray-400"
            }`}
            disabled={isPending ? true : false}
          >
            Thoát
          </button>
          <button
            onClick={onLogout}
            className={`text-white px-4 py-2 rounded-lg ${
              isPending ? "bg-red-400/50" : "bg-red-400 hover:bg-red-500"
            } `}
            disabled={isPending ? true : false}
          >
            Đăng Xuất
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UserLogoutModal;
