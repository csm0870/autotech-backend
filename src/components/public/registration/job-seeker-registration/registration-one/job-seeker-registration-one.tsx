import { Col, Container, Row } from "reactstrap";
import './job-seeker-registration-one.css';
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

export const JobSeekerRegistrationOne = () => {
    const { jobSeekerRegistrationData } = useSelector((state: RootState) => state.registration);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        lastName: {
            value: jobSeekerRegistrationData.lastName,
            error: ''
        },
        firstName: {
            value: jobSeekerRegistrationData.firstName,
            error: ''
        },
        email: {
            value: jobSeekerRegistrationData.email,
            error: ''
        }
    });

    const handleChange = (name: string, value: string) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm[name].value = value;
        newForm[name].error = '';
        setForm(newForm);
    };

    const validateForm = async () => {
        const newForm = JSON.parse(JSON.stringify(form));

        // clear errors
        dispatch(hideAlertMessage());
        for (const key in newForm) {
            newForm[key].error = '';
        }

        let valid = true;
        for (const key in newForm) {
            if (!newForm[key].value) {
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

        if (!isValidEmail(newForm.email.value)) {
            newForm.email.error = 'Nem megfelelő formátum.';
            setForm(newForm);
            dispatch(showAlertMessage({
                alertMessageText: 'Hibásan megadott beviteli mezők.',
                alertMessageType: 'error'
            }));
            return false;
        }

        const response = await networkCall('/users/email-exists', {
            method: 'POST',
            body: {
                email: form.email.value
            }
        });

        let messageShowed = showDefaultErrorMessages(response);
        if(messageShowed || !response) return false;

        if (response.status === 201) {

            const res = response as AxiosResponse<boolean>;
            if(res.data) {
                newForm.email.error = 'Ezzel az email címmel már regisztráltak.';
                setForm(newForm);
                dispatch(showAlertMessage({
                    alertMessageText: 'Hibásan megadott beviteli mezők.',
                    alertMessageType: 'error'
                }));
                return false;
            }

        } else {
            return false;
        }

        return true;
    };

    const handleNextClick = async () => {
        if(!await validateForm()) return;
        
        dispatch(setJobSeekerRegistrationData({
            email: form.email.value,
            lastName: form.lastName.value,
            firstName: form.firstName.value
        }));

        navigate('/job-seeker-registration-two');
    };

    return (
        <Container className="job-seeker-registration-one">

            <Row>

                <Col xs="12">
                    
                    <p className="csak-lepesrol-lepesr">
                        Csak lépésről lépésre…
                    </p>
                    <p className="kerlek-add-meg-az-al">
                        Kérlek add meg az alapadataidat!
                    </p>

                    <AlertMessage />

                    <Row>
                        <Col xs='12' md='6' style={{ marginTop: '20px' }}>
                            <TextInput
                                defaultValue={form.lastName.value}
                                error={form.lastName.error}
                                placeholder='Vezetéknév'
                                required
                                onChange={(value) => handleChange('lastName', value)}
                            />
                        </Col>

                        <Col xs='12' md='6' style={{ marginTop: '20px' }}>
                            <TextInput
                                defaultValue={form.firstName.value}
                                error={form.firstName.error}
                                placeholder='Keresztnév'
                                required
                                onChange={(value) => handleChange('firstName', value)}
                            />
                        </Col>
                    </Row>

                    <div style={{ marginTop: '20px' }}>
                        <TextInput
                            defaultValue={form.email.value}
                            error={form.email.error}
                            placeholder='Email cím'
                            required
                            onChange={(value) => handleChange('email', value)}
                        />
                    </div>

                    <ProcessCircles  activeCircle={1} countOfCircles={9} style={{ marginTop: '250px', marginBottom: '30px' }} />
                    
                </Col>

                <Col xs={{ size: 12, offset: 0 }} sm={{ size: 4, offset: 7 }} style={{ marginTop: '30px' }}>
                    <button className='button' onClick={handleNextClick}>Tovább</button>
                </Col>

            </Row>


        </Container>
    );
};