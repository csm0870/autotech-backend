import { AxiosResponse } from "axios"
import { store } from "../../redux/store";
import { hideAlertMessage, showAlertMessage } from "../../redux/reducer/alert-message.reducer";

export const showDefaultErrorMessages = (response: AxiosResponse | undefined | null): boolean => {

    let messageShowed = false;
    
    if(!response){

        store.dispatch(hideAlertMessage());
        store.dispatch(showAlertMessage({
            alertMessageText: 'Hiba a hálózati kapcsolatban.',
            alertMessageType: 'error'
        }));
        messageShowed = true;

    } else {

        switch(response.status) {
            case 0:
                store.dispatch(hideAlertMessage());
                store.dispatch(showAlertMessage({
                    alertMessageText: 'Hiba a hálózati kapcsolatban.',
                    alertMessageType: 'error'
                }));
                messageShowed = true;
                break;
            case 400:
                if(response.data.code !== undefined){
                    
                    if(response.data.code === 13) {
                        store.dispatch(hideAlertMessage());
                        store.dispatch(showAlertMessage({
                            alertMessageText: 'A kérés linkje nem megfelelő, az azonosító rosszul szerepel.',
                            alertMessageType: 'error'
                        }));
                        messageShowed = true;
                    }
                    
                }
                break;
            case 401:
                store.dispatch(hideAlertMessage());
                store.dispatch(showAlertMessage({
                    alertMessageText: 'Be kell jelentkeznie a funkció eléréséhez.',
                    alertMessageType: 'error'
                }));
                messageShowed = true;
                break;
            case 403:
                store.dispatch(hideAlertMessage());
                store.dispatch(showAlertMessage({
                    alertMessageText: 'Nincs jogosultsága ehhez a funkcióhoz.',
                    alertMessageType: 'error'
                }));
                messageShowed = true;
                break;
            case 429:
                store.dispatch(hideAlertMessage());
                store.dispatch(showAlertMessage({
                    alertMessageText: 'A szerver nem tudja kiszolgálni a kérést: túl sok kérés lett küldve. Próbálja újra később!',
                    alertMessageType: 'error'
                }));
                messageShowed = true;
                break;
            case 500:
                store.dispatch(hideAlertMessage());
                store.dispatch(showAlertMessage({
                    alertMessageText: 'Ismeretlen hiba történt. Kérjük próbálja újra!',
                    alertMessageType: 'error'
                }));
                messageShowed = true;
        
        }

    }

    return messageShowed;
}