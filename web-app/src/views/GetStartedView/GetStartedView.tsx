import { FastField, Form, Formik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import Logo from '../../components/Logo/Logo';
import { FormikTextInput } from '../../components/TextInput/TextInput';
import { SignUpParams } from '../../services/types/common';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../common/utils/routes';
import ChangeRegion from './ChangeRegion';

const linkCss = 'hover:underline cursor-pointer';

const GetStartedView: React.FC = () => {
  const { t } = useTranslation();
  const navigator = useNavigate();

  const defaultValue: SignUpParams = { email: '', password: '', confirmationPassword: '' };

  const signUpSchema = Yup.object().shape({
    email: Yup.string().required(t('form.error.fieldRequired')).email(t('form.error.invalidEmail')),
    password: Yup.string().required(t('form.error.fieldRequired')),
    // .matches(/^(?=.*[A-Z])/, t('form.error.password.missingRequirement'))
    // .matches(/^(?=.*[a-z])/, t('form.error.password.missingRequirement'))
    // .matches(/^(?=.*[0-9])/, t('form.error.password.missingRequirement'))
    // .matches(/^(?=.*[<'>:;|_~`+=,\\/%"?)(\][^!@#$%^&*.-])/, t('form.error.password.missingRequirement'))
    // .min(8, t('form.error.password.tooShort')),
    confirmationPassword: Yup.string()
      .required(t('form.error.fieldRequired'))
      .oneOf([Yup.ref('password')], t('form.error.confirmationPasswordNotMatch')),
  });

  const onSubmit = (value: SignUpParams) => {
    console.log('🚀 ~ onSubmit ~ value:', value);
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
                  label={t('getStartedView.form.field.label.password')}
                  placeholder={t('getStartedView.form.field.placeholder.email')}
                  name="password"
                  component={FormikTextInput}
                />
                <FastField
                  label={t('getStartedView.form.field.label.confirmationPassword')}
                  placeholder={t('getStartedView.form.field.placeholder.email')}
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
