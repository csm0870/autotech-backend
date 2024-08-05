import { Col, Container, Row } from "reactstrap";
import './job-seeker-registration-two.css';
import { AlertMessage } from "../../../../alert-message/alert-message";
import { ProcessCircles } from "../../../process-circles/process-circles";
import { TextInput } from "../../../../fields/text-input/text-input";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { hideAlertMessage, showAlertMessage } from "../../../../../redux/reducer/alert-message.reducer";
import { isValidEmail } from "../../../../../utils/is-valid-email/is-valid-email";
import { networkCall } from "../../../../../utils/network-call/network-call";
import { showDefaultErrorMessages } from "../../../../../utils/show-default-error-message/show-default-error-messages";
import { AxiosResponse } from "axios";
import { setJobSeekerRegistrationData } from "../../../../../redux/reducer/registration.reducer";
import { PasswordInput } from "../../../../fields/password-input/password-input";

export const JobSeekerRegistrationTwo = () => {
    const { jobSeekerRegistrationData } = useSelector((state: RootState) => state.registration);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        password: {
            value: jobSeekerRegistrationData.password,
            error: ''
        },
        passwordAgain: {
            value: jobSeekerRegistrationData.password,
            error: ''
        }
    });

    const handleChange = (name: string, value: string) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm[name].value = value;
        newForm[name].error = '';
        setForm(newForm);
    };

    const validateForm = () => {
        const newForm = JSON.parse(JSON.stringify(form));

        // clear errors
        dispatch(hideAlertMessage());
        for (const key in newForm) {
            newForm[key].error = '';
        }

        let valid = true;
        for (const key in form) {
            if (!form[key as keyof typeof form].value) {
                valid = false;
                newForm[key].error = 'Mező kitöltése kötelező.';
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

        if (form.password.value !== null && form.password.value.length < 8) {
            newForm.password.error = 'Legalább 8 karaktert kell tartalmaznia.';
            setForm(newForm);
            dispatch(showAlertMessage({
                alertMessageText: 'Hibásan megadott beviteli mezők.',
                alertMessageType: 'error'
            }));
            return false;
        }

        let regexp = new RegExp("[A-ZÁÖÜÓŐÚÉŰÍ]+");
        if (!regexp.test(form.password.value as string)) {
            newForm.password.error = 'Legalább egy nagybetűt kell tartalmaznia.';
            setForm(newForm);
            dispatch(showAlertMessage({
                alertMessageText: 'Hibásan megadott beviteli mezők.',
                alertMessageType: 'error'
            }));
            return false;
        }

        regexp = new RegExp("[0-9]+");
        if (!regexp.test(form.password.value as string)) {
            newForm.password.error = 'Legalább egy számot kell tartalmaznia.';
            setForm(newForm);
            dispatch(showAlertMessage({
                alertMessageText: 'Hibásan megadott beviteli mezők.',
                alertMessageType: 'error'
            }));
            return false;
        }

        if(form.password.value !== form.passwordAgain.value){
            newForm.password.error = 'A jelszavak nem egyeznek meg.'
            newForm.passwordAgain.error = 'A jelszavak nem egyeznek meg.'
            setForm(newForm);
            dispatch(showAlertMessage({
                alertMessageText: 'Hibásan megadott beviteli mezők.',
                alertMessageType: 'error'
            }));

            return false;
        }

        return true;
    };

    const handleNextClick = () => {
        if(!validateForm()) return;
        
        dispatch(setJobSeekerRegistrationData({
            password: form.password.value
        }));

        navigate('/job-seeker-registration-three');
    };

    return (
        <Container className="job-seeker-registration-two">

            <Row>

                <Col xs="12">
                    
                    <p className="fo-a-biztonsagr">
                        Fő a biztonság.
                    </p>

                    <p className="kerlek-add-meg-a-jel">
                        Kérlek add meg a jelszavad!
                    </p>

                    <AlertMessage />

                    <Row>
                        <Col xs='12' md='6' style={{ marginTop: '20px' }}>
                            <PasswordInput
                                defaultValue={form.password.value}
                                error={form.password.error}
                                placeholder='Jelszó'
                                required
                                onChange={(value) => handleChange('password', value)}
                            />
                        </Col>

                        <Col xs='12' md='6' style={{ marginTop: '20px' }}>
                            <PasswordInput
                                defaultValue={form.passwordAgain.value}
                                error={form.passwordAgain.error}
                                placeholder='Jelszó újra'
                                required
                                onChange={(value) => handleChange('passwordAgain', value)}
                            />
                        </Col>
                    </Row>

                    <p className="kerlek-add-meg-a-jel" style={{ marginTop: '30px' }}>
                        min 8 karakter
                    </p>

                    <p className="kerlek-add-meg-a-jel" style={{ marginTop: '10px' }}>
                        tartalmaz számot
                    </p>

                    <p className="kerlek-add-meg-a-jel" style={{ marginTop: '10px' }}>
                        tartalmaz nagybetűt
                    </p>

                    <ProcessCircles  activeCircle={2} countOfCircles={9} style={{ marginTop: '250px', marginBottom: '30px' }} />
                    
                </Col>

                <Col xs={{ size: 12, offset: 0 }} sm={{ size: 4, offset: 7 }} style={{ marginTop: '30px' }}>
                    <button className='button' onClick={handleNextClick}>Tovább</button>
                </Col>

            </Row>


        </Container>
    );
};