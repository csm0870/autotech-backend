import { Alert } from "antd";
import './alert-message.css';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import { hideAlertMessage } from "../../redux/reducer/alert-message.reducer";

export const AlertMessage = () => {
    const { alertMessageType, alertMessageText, visible } = useSelector((state: RootState) => state.alertMessage);
    const dispatch = useDispatch();

    useEffect(() => {
        if(visible) {
            const id = setTimeout(() => {
                dispatch(hideAlertMessage());
            }, 5000);
            
            return () => {
                clearTimeout(id);
            };
        }
    }, [dispatch, visible]);

    return (
        <>
            {
                visible &&
                <div className="alert-message-container">
                    <Alert
                        message={alertMessageText}
                        type={alertMessageType}
                        closable
                        showIcon
                    />
                </div>
            }
        </>
    );
};