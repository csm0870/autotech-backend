import { Col, Container, Row } from "reactstrap";
import { PasswordInput } from "../../fields/password-input/password-input";
import './login.css';
import { EmailInput } from "../../fields/email-input/email-input";
import { useState } from "react";
import { networkCall } from "../../../utils/network-call/network-call";
import { AlertMessage } from "../../alert-message/alert-message";
import { useDispatch } from "react-redux";
import { AlertMessageType, hideAlertMessage, showAlertMessage } from "../../../redux/reducer/alert-message.reducer";
import { isValidEmail } from "../../../utils/is-valid-email/is-valid-email";
import { showDefaultErrorMessages } from "../../../utils/show-default-error-message/show-default-error-messages";
import { AxiosResponse } from "axios";
import { LoginSuccessResponse } from "../../../constant/type/api/login/login-success-response.type";
import { GroupEnum } from "../../../constant/enum/group.enum";
import { useNavigate } from "react-router-dom";
import { DefaultErrorResponse } from "../../../constant/type/api/error/default-error-response/default-error-respose.type";
import { ValidationErrorResponseData } from "../../../constant/type/api/error/validation-error-response-data/validation-error-response-data.type.";

export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: {
            value: '',
            error: ''
        },
        password: {
            value: '',
            error: ''
        }
    });

    const handleInputChange = (name: string, value: string) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm[name].value = value;
        newForm[name].error = '';
        setForm(newForm);
    };

    const validateForm = () => {
        dispatch(hideAlertMessage());
        let valid = true;
        const newForm = JSON.parse(JSON.stringify(form));
        for (const key in newForm) {
            if(newForm[key].value === '') {
                newForm[key].error = 'Mező kitöltése kötelező.';
                valid = false;
            }
        }

        if (!valid) {
            setForm(newForm);
            dispatch(showAlertMessage({
                alertMessageText: 'Hibásan megadott beviteli mezők.',
                alertMessageType: 'error'
            }));
            return false;
        }

        if (!isValidEmail(newForm.email.value)) {
            newForm.email.error = 'Nem megfelelő formátum.';
            setForm(newForm);
            dispatch(showAlertMessage({
                alertMessageText: 'Hibásan megadott beviteli mezők.',
                alertMessageType: 'error'
            }));
            return false;
        }

        return true;
    };

    const clearErrors = () => {
        const newForm = JSON.parse(JSON.stringify(form));
        for (const key in newForm) {
            newForm[key].error = '';
        }
        setForm(newForm);
    };

    const handleLogin = async () => {
        if (validateForm()) {
            const response = await networkCall('/users/login', {
                method: 'POST',
                body: {
                    email: form.email.value,
                    password: form.password.value
                }
            });

            const messageShowed = showDefaultErrorMessages(response);

            if(messageShowed || response === undefined) return;

            dispatch(hideAlertMessage());
            const alertMessage = {
                alertMessageText: 'Ismeretlen hiba történt. Kérjük próbálja újra!',
                alertMessageType: 'error'
            };

            if (response.status === 200) {

                const res: AxiosResponse<LoginSuccessResponse> = response;

                switch(res.data.user.group.name.toLowerCase()) {
                    case GroupEnum.Admin:
                        navigate('/cms/admin');
                        break;
                    case GroupEnum.Organizer:
                        navigate('/cms/organizer');
                        break;
                    case GroupEnum.Employer:
                        navigate('/cms/employer');
                        break;
                    case GroupEnum.JobSeeker:
                        navigate('/cms/job-seeker');
                        break;
                    default:
                        alertMessage.alertMessageText = 'Hibás email cím vagy jelszó.';

                }

            }else if(response.status === 400){

                const res: AxiosResponse<DefaultErrorResponse<ValidationErrorResponseData[]>> = response;
    
                switch (res.data.code) {

                    case 10:
                        alertMessage.alertMessageText ='Hibásan megadott beviteli mezők.';

                        if (Array.isArray(res.data.data)) {

                            const newForm = JSON.parse(JSON.stringify(form));

                            res.data.data.forEach(element => {
                                if (Array.isArray(element.errors)) {
                                    let errors = '';

                                    element.errors.forEach( (error) => {
                                        errors += error + ' ';
                                    });

                                    newForm[element.field].error = errors;

                                }
                            });

                            setForm(newForm);

                        }
                        break;

                }

            }else if(response.status === 404){
                alertMessage.alertMessageText ='Hibás email cím vagy jelszó.';
            }

            dispatch(showAlertMessage({
                alertMessageText: alertMessage.alertMessageText,
                alertMessageType: alertMessage.alertMessageType as AlertMessageType
            }));
        }
    };

    return (
        <Container>
            <Row>

                <Col xs="12" className="koszontelek-a-vr-bor">
                    Köszöntelek a VR börzén!
                </Col>

                <Col xs="12" className="az-allasborzek-megte">
                    Az állásbörzék megtekintéséhez kérlek lépj be vagy<br/>regisztrálj!
                </Col>

                <Col xs="12" md="6" style={{marginTop: "20px"}}>

                    <AlertMessage />

                    <EmailInput
                        defaultValue={form.email.value}
                        error={form.email.error}
                        placeholder="Email cím"
                        required
                        onChange={(value) => {
                            handleInputChange('email', value)
                        }}
                    />
                </Col>

                <Col md='6'></Col>

                <Col xs="12" md="6" style={{marginTop: "20px"}}>
                    <PasswordInput
                        defaultValue={form.password.value}
                        error={form.password.error}
                        placeholder="Jelszó"
                        required
                        onChange={(value) => {
                            handleInputChange('password', value)
                        }}
                    />
                </Col>

                <Col md='6'></Col>

                <Col xs='12' md='4' style={{marginTop: "20px"}}>
                    <button className="button" onClick={handleLogin}>Belépés</button>
                </Col>

                <Col xs='12'></Col>

                <Col xs="12" md="4" className="forgotten-password">
                    Elfelejtettem a jelszavam
                </Col>

            </Row>
        </Container>
    );
}