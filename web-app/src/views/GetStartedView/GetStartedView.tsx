import { Button } from '@mui/material';
import { FastField, Form, Formik } from 'formik';
import { get } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { encryptWithAES, generateRSAKeyPair, hash } from '../../common/utils/crypto';
import notify from '../../common/utils/notify';
import { routes } from '../../common/utils/routes';
import Logo from '../../components/Logo/Logo';
import { FormikTextInput } from '../../components/TextInput/TextInput';
import api from '../../services/apiService';
import ChangeRegion from './ChangeRegion';

const linkCss = 'hover:underline cursor-pointer';

interface DefaultSignUpParams {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  confirmationPassword: string;
}

const GetStartedView: React.FC = () => {
  const { t } = useTranslation();
  const navigator = useNavigate();
  const defaultValue: DefaultSignUpParams = { email: '', password: '', firstName: '', lastName: '', confirmationPassword: '' };

  const signUpSchema = Yup.object().shape({
    email: Yup.string().required(t('form.error.fieldRequired')).email(t('form.error.invalidEmail')),
    password: Yup.string().required(t('form.error.fieldRequired')),
    firstName: Yup.string().required(t('form.error.fieldRequired')),
    lastName: Yup.string().required(t('form.error.fieldRequired')),
    confirmationPassword: Yup.string()
      .required(t('form.error.fieldRequired'))
      .oneOf([Yup.ref('password')], t('form.error.confirmationPasswordNotMatch')),
  });

  const onSubmit = async ({ email, password, firstName, lastName }: DefaultSignUpParams) => {
    try {
      const { publicKey, privateKey } = await generateRSAKeyPair();
      const hashedPassword = await hash(password);
      const { cipherText: ePrivateKey } = await encryptWithAES(hashedPassword, privateKey, email);
      await api.user.signUp({ email, password: hashedPassword, firstName, lastName, publicKey, ePrivateKey });
      notify.success(t('getStartedView.text.success.createSuccessfully'));
      navigator(routes.SIGN_IN);
    } catch (e) {
      const message = get(e, 'response.data.message');
      if (message === 'user.exist') {
        return notify.error(t('error.userExist'));
      }
      return notify.error(t('error.somethingWrong'));
    }
  };

  const onClickLogo = () => navigator(routes.DEFAULT);
  const toLogin = () => navigator(routes.SIGN_IN);

  return (
    <div className="container max-w-[768px] h-screen mx-auto flex flex-col">
      <Logo onClick={onClickLogo} wrapperClassName="mx-auto py-4" className="w-48" />
      <div className="grow flex flex-col flex-grow">
        <div className="text-center">
          <div className="text-5xl font-bold mb-3 sm:text-4xl">{t('getStartedView.text.title.enterEmailAndPassword')}</div>
          <div className="text-lg mb-8">
            <span>{t('getStartedView.text.subTitle.enterEmailAndPassword.1')}</span>
            <span className="px-1 font-medium">{t('getStartedView.text.subTitle.enterEmailAndPassword.2')}</span>
          </div>
        </div>
        <div className="flex flex-col grow items-center w-96 mx-auto">
          <Formik onSubmit={onSubmit} validateOnChange initialValues={defaultValue} validationSchema={signUpSchema}>
            {() => (
              <Form className="w-full">
                <FastField
                  className="w-full"
                  label={t('getStartedView.form.field.label.email')}
                  placeholder={t('getStartedView.form.field.placeholder.email')}
                  name="email"
                  component={FormikTextInput}
                />
                <FastField
                  className="w-full"
                  label={t('getStartedView.form.field.label.firstName')}
                  placeholder={t('getStartedView.form.field.label.firstName')}
                  name="firstName"
                  component={FormikTextInput}
                />
                <FastField
                  className="w-full"
                  label={t('getStartedView.form.field.label.lastName')}
                  placeholder={t('getStartedView.form.field.label.lastName')}
                  name="lastName"
                  component={FormikTextInput}
                />
                <FastField
                  label={t('getStartedView.form.field.label.password')}
                  placeholder={t('getStartedView.form.field.label.password')}
                  type="password"
                  name="password"
                  component={FormikTextInput}
                />
                <FastField
                  label={t('getStartedView.form.field.label.confirmationPassword')}
                  placeholder={t('getStartedView.form.field.label.confirmationPassword')}
                  type="password"
                  name="confirmationPassword"
                  component={FormikTextInput}
                />
                <Button className="w-full h-12 !text-xl !mt-4" variant="contained" type="submit">
                  {t('getStartedView.button.signIn')}
                </Button>
              </Form>
            )}
          </Formik>
          <hr className="border-solid border-[#ddd] border-t-1 mt-10 w-full" />
          <div className="text-base text-[rgb(97, 96, 97)] mt-6 text-gray-500">{t('getStartedView.text.alreadyUsingComet')}</div>
          <div onClick={toLogin} className={`mt-1 text-primary ${linkCss}`}>
            {t('getStartedView.text.signUpToWorkspace')}
          </div>
          <div className="w-full grow flex flex-col-reverse pb-4">
            <div className="flex w-full justify-center gap-6 text-gray-500">
              <div className={`${linkCss}`}>{t('common.text.privacy&Term')}</div>
              <div className={`${linkCss}`}>{t('common.text.contactUs')}</div>
              <ChangeRegion className={linkCss} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStartedView;
