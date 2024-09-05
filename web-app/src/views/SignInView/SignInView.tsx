import { Button } from '@mui/material';
import { FastField, Form, Formik } from 'formik';
import { get } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { hash } from '../../common/utils/crypto';
import notify from '../../common/utils/notify';
import { routes } from '../../common/utils/routes';
import Logo from '../../components/Logo/Logo';
import { FormikTextInput } from '../../components/TextInput/TextInput';
import api from '../../services/apiService';
import { SignInParams } from '../../services/types/common';
import ChangeRegion from '../GetStartedView/ChangeRegion';
import { storage } from '../../common/utils/storage';
import { useDispatch } from 'react-redux';
import { setEmail, setHashKey } from '../../services/controllers/common/CommonSlice';

const linkCss = 'hover:underline cursor-pointer';

const SignInView: React.FC = () => {
  const { t } = useTranslation();
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const defaultValue: SignInParams = { email: '', password: '' };

  const signInSchema = Yup.object().shape({
    email: Yup.string().required(t('form.error.fieldRequired')).email(t('form.error.invalidEmail')),
    password: Yup.string().required(t('form.error.fieldRequired')),
  });

  const onSubmit = async ({ email, password }: SignInParams) => {
    try {
      const hashedPassword = await hash(password);
      const data = await api.user.login({ email, password: hashedPassword });
      notify.success(t('signInView.success.signInSuccessfully'));
      storage.setToken(data);
      dispatch(setHashKey(hashedPassword));
      dispatch(setEmail(email));
      navigator(routes.WORKSPACE_SELECTION);
    } catch (e) {
      console.log(e);
      const message = get(e, 'response.data.message');

      if (message) {
        return notify.error(t('signInView.error.emailOrPasswordIncorrect'));
      }
      return notify.error(t('error.somethingWrong'));
    }
  };

  const onClickLogo = () => navigator(routes.DEFAULT);
  const toGetStarted = () => navigator(routes.GET_STATED);

  return (
    <div className="container max-w-[768px] h-screen mx-auto flex flex-col">
      <Logo onClick={onClickLogo} wrapperClassName="mx-auto py-4" className="w-48" />
      <div className="grow flex flex-col">
        {
          <div className="text-center">
            <div className="text-5xl font-bold mb-3 sm:text-4xl">{t('signInView.text.title.signInToComet')}</div>
            <div className="text-lg mb-8">
              <span>{t('getStartedView.text.subTitle.enterEmailAndPassword.1')}</span>
              <span className="px-1 font-medium">{t('getStartedView.text.subTitle.enterEmailAndPassword.2')}</span>
            </div>
          </div>
        }
        <div className="flex flex-col grow items-center w-96 mx-auto">
          <Formik onSubmit={onSubmit} validateOnChange initialValues={defaultValue} validationSchema={signInSchema}>
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
                  type="password"
                  component={FormikTextInput}
                />
                <Button className="w-full h-12 !text-xl !mt-4" variant="contained" type="submit">
                  {t('welcomeView.button.signIn')}
                </Button>
              </Form>
            )}
          </Formik>
          <hr className="border-solid border-[#ddd] border-t-1 mt-10 w-full" />
          <div className="text-base text-[rgb(97, 96, 97)] mt-6 text-gray-500">{t('signInView.text.newToComet')}</div>
          <div onClick={toGetStarted} className={`mt-1 text-primary ${linkCss}`}>
            {t('signInView.text.createAnAccount')}
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

export default SignInView;
