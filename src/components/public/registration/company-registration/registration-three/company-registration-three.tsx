import { Col, Container, Modal, ModalBody, ModalFooter, Row } from "reactstrap";
import { AlertMessage } from "../../../../alert-message/alert-message";
import { TextInput } from "../../../../fields/text-input/text-input";
import './company-registration-three.css';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { AlertMessageType, hideAlertMessage, showAlertMessage } from "../../../../../redux/reducer/alert-message.reducer";
import { resetCompanyRegistrationData, setCompanyRegistrationData } from "../../../../../redux/reducer/registration.reducer";
import { useNavigate } from "react-router-dom";
import { networkCall } from "../../../../../utils/network-call/network-call";
import { showDefaultErrorMessages } from "../../../../../utils/show-default-error-message/show-default-error-messages";
import { AxiosResponse } from "axios";
import { ProcessCircles } from "../../../process-circles/process-circles";
import { DefaultErrorResponse } from "../../../../../constant/type/api/error/default-error-response/default-error-respose.type";
import { isValidEmail } from "../../../../../utils/is-valid-email/is-valid-email";

export const CompanyRegistrationThree = () => {
    const { companyRegistrationData } = useSelector((state: RootState) => state.registration);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        contactName: {
            value: companyRegistrationData.contactName,
            error: ''
        },
        contactEmail: {
            value: companyRegistrationData.contactEmail,
            error: ''
        },
        contactPhone: {
            value: companyRegistrationData.contactPhone,
            error: ''
        },
        contactPosition: {
            value: companyRegistrationData.contactPosition,
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
        for (const key in newForm) {
            if (newForm[key].value === '' || newForm[key].value === null) {
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

        if (!isValidEmail(form.contactEmail.value as string)) {
            newForm.contactEmail.error = 'Nem megfelelő formátum.';
            setForm(newForm);
            dispatch(showAlertMessage({
                alertMessageText: 'Hibásan megadott beviteli mezők.',
                alertMessageType: 'error'
            }));
            return false;
        }

        const regExp = new RegExp('^[+]?[0-9]{9,14}$');
        if (!regExp.test(newForm.contactPhone.value as string)) {
            newForm.contactPhone.error = 'Nem megfelelő formátum (Pl. +36206736529, 061933938).';
            setForm(newForm);
            dispatch(showAlertMessage({
                alertMessageText: 'Hibásan megadott beviteli mezők.',
                alertMessageType: 'error'
            }));
            return false;
        }

        return true;
    };

    const handleRegClick = async () => {
        if(!validateForm()) return;

        dispatch(setCompanyRegistrationData({
            contactName: form.contactName.value,
            contactEmail: form.contactEmail.value,
            contactPhone: form.contactPhone.value,
            contactPosition: form.contactPosition.value
        }));

        // korábbi adatok ellenőrzése
        if (!companyRegistrationData.email) {
            dispatch(hideAlertMessage());
            dispatch(showAlertMessage({
                alertMessageType: 'error',
                alertMessageText: 'Email megadása kötelező.'
            }));
            navigate('/company-registration-one');
            return;
        }

        if (!companyRegistrationData.password) {
            dispatch(hideAlertMessage());
            dispatch(showAlertMessage({
                alertMessageType: 'error',
                alertMessageText: 'Jelszó megadása kötelező.'
            }));
            navigate('/company-registration-one');
            return;
        }

        if (!companyRegistrationData.name) {
            dispatch(hideAlertMessage());
            dispatch(showAlertMessage({
                alertMessageType: 'error',
                alertMessageText: 'Név megadása kötelező.'
            }));
            navigate('/company-registration-one');
            return;
        }

        if (!companyRegistrationData.headquarters) {
            dispatch(hideAlertMessage());
            dispatch(showAlertMessage({
                alertMessageType: 'error',
                alertMessageText: 'Székhely megadása kötelező.'
            }));
            navigate('/company-registration-one');
            return;
        }

        if (!companyRegistrationData.taxNumber) {
            dispatch(hideAlertMessage());
            dispatch(showAlertMessage({
                alertMessageType: 'error',
                alertMessageText: 'Adószám év megadása kötelező.'
            }));
            navigate('/company-registration-one');
            return;
        }

        if (!companyRegistrationData.logo || companyRegistrationData.logo?.length === 0) {
            dispatch(hideAlertMessage());
            dispatch(showAlertMessage({
                alertMessageType: 'error',
                alertMessageText: 'Logó feltöltése kötelező.'
            }));
            navigate('/company-registration-two');
            return;
        }

        if (!companyRegistrationData.gdpr || companyRegistrationData.gdpr?.length === 0) {
            dispatch(hideAlertMessage());
            dispatch(showAlertMessage({
                alertMessageType: 'error',
                alertMessageText: 'GDPR nyilatkozat feltöltése kötelező.'
            }));
            navigate('/company-registration-two');
            return;
        }

        if (!companyRegistrationData.webSite) {
            dispatch(hideAlertMessage());
            dispatch(showAlertMessage({
                alertMessageType: 'error',
                alertMessageText: 'Weboldal megadása kötelező.'
            }));
            navigate('/company-registration-two');
            return;
        }

        if (!companyRegistrationData.facebook) {
            dispatch(hideAlertMessage());
            dispatch(showAlertMessage({
                alertMessageType: 'error',
                alertMessageText: 'Facebook megadása kötelező.'
            }));
            navigate('/company-registration-two');
            return;
        }

        const response = await networkCall('/companies/registration', {
            method: 'POST',
            requestBodyType: 'FILE_FORM',
            body: {
                ...companyRegistrationData,
                contactName: form.contactName.value,
                contactEmail: form.contactEmail.value,
                contactPhone: form.contactPhone.value,
                contactPosition: form.contactPosition.value
            }
        });

        const messageShowed = showDefaultErrorMessages(response);
        if (messageShowed || !response) return;

        dispatch(hideAlertMessage());
        const alertMessage = {
            alertMessageText: 'Ismeretlen hiba történt. Kérjük próbálja újra!',
            alertMessageType: 'error'
        };

        if (response.status === 201) {

            setIsModalOpen(true);
            return;

        } else if (response.status === 400) {

            const res: AxiosResponse<DefaultErrorResponse<undefined>> = response;

            switch (res.data.code) {

                case 10:
                    alertMessage.alertMessageText = 'Hibásan megadott beviteli mezők.';
                    navigate('/company-registration-one');
                    break;
                
                case 1003:
                    alertMessage.alertMessageText = 'Ez az email cím már létezik.';
                    navigate('/company-registration-one');
                    break; 

                case 1502:
                    alertMessage.alertMessageText = 'Ez a cégnév már létezik.';
                    navigate('/company-registration-one');
                    break;

                case 1503:
                    alertMessage.alertMessageText = 'Ez az adószám már létezik.';
                    navigate('/company-registration-one');
                    break;

            }
        }

        dispatch(showAlertMessage({
            alertMessageText: alertMessage.alertMessageText,
            alertMessageType: alertMessage.alertMessageType as AlertMessageType
        }));
    };

    const handleModalOkClick = () => {
        dispatch(resetCompanyRegistrationData());
        navigate('/login');
    };

    return (
        <Container className='company-registration-three'>

            <Row>

                <Col xs='12'>

                    <p className='mindjart-kesz'>
                        Mindjárt készen is vagy!
                    </p>

                    <p className='kerlek-add-meg-a-kapcs'>
                        Kérlek add meg a kapcsolattartó adatait!
                    </p>

                    <AlertMessage />

                    <div style={{ marginTop: '20px' }}>
                        <TextInput
                            defaultValue={form.contactName.value}
                            error={form.contactName.error}
                            placeholder='Kapcsolattartó neve'
                            required
                            onChange={(value) => handleChange('contactName', value)}
                        />
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <TextInput
                            defaultValue={form.contactEmail.value}
                            error={form.contactEmail.error}
                            placeholder='Kapcsolattartó email címe'
                            required
                            onChange={(value) => handleChange('contactEmail', value)}
                        />
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <TextInput
                            defaultValue={form.contactPhone.value}
                            error={form.contactPhone.error}
                            placeholder='Kapcsolattartó telefonszáma (Pl. +352067365229, 061933938'
                            required
                            onChange={(value) => handleChange('contactPhone', value)}
                        />
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <TextInput
                            defaultValue={form.contactPosition.value}
                            error={form.contactPosition.error}
                            placeholder='Kapcsolattartó beosztása'
                            required
                            onChange={(value) => handleChange('contactPosition', value)}
                        />
                    </div>

                    <ProcessCircles countOfCircles={4} activeCircle={3} style={{ marginTop: '250px', marginBottom: '30px' }} />

                </Col>

                <Col xs={{ size: 12, offset: 0 }} sm={{ size: 3, offset: 1 }} style={{ marginTop: '30px' }}>
                    <button className='button back-button' onClick={() => navigate('/company-registration-two')}>Vissza</button>
                </Col>

                <Col xs={{ size: 12, offset: 0 }} sm={{ size: 4, offset: 3 }} style={{ marginTop: '30px' }}>
                    <button className='button' onClick={handleRegClick}>Regisztráció</button>
                </Col>

            </Row>

            <Modal isOpen={isModalOpen} centered>

                <ModalBody>
                    <p className="my-4">Adatait sikeresen rögzítettük, a regisztráció adminisztátor jóváhagyására vár!</p>
                </ModalBody>

                <ModalFooter style={{ justifyContent: 'center' }}>
                    <button type="button" className="btn btn-success" onClick={handleModalOkClick}>Rendben</button>
                </ModalFooter>

            </Modal>

        </Container>
    );
};