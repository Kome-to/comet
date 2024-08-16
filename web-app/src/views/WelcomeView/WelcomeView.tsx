import { Button } from '@mui/material';
import React from 'react';
import Logo from '../../components/Logo/Logo';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../common/utils/routes';
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@mui/icons-material/Language';

import ChangeRegion from '../GetStartedView/ChangeRegion';

const WelcomeView: React.FC = () => {
  const navigator = useNavigate();
  const { t } = useTranslation();

  const previewImage = 'https://a.slack-edge.com/6e36e01/marketing/img/downloads/refreshed/slack-ia4-client-windows-desktop.png';

  const onClickLogo = () => window.location.reload();
  const toGetStarted = () => navigator(routes.GET_STATED);
  const toLogin = () => navigator(routes.SIGN_IN);

  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      <div className="container max-w-[1280px] h-[50vh] mx-auto mt-2 px-12">
        <div className="w-full h-20 flex justify-between items-center">
          <Logo onClick={onClickLogo} className="w-36" />
          <div className="grow pr-10 flex flex-row-reverse items-center">
            <div className="flex gap-1 items-center ml-6">
              <LanguageIcon />
              <ChangeRegion className="cursor-pointer hover:underline font-bold" />
            </div>
            <div className=" cursor-pointer font-bold hover:underline hover:underline-offset-4">{t('welcomeView.button.download')}</div>
          </div>
          <div className="flex gap-5">
            <Button onClick={toLogin} className="h-12 w-36 hover:!border-2" variant="outlined">
              {t('welcomeView.button.signIn')}
            </Button>
            <Button onClick={toGetStarted} className="h-12 w-36" variant="contained">
              {t('welcomeView.button.getStarted')}
            </Button>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-6 justify-center items-center mt-24">
            <div className="text-5xl text-black font-bold md:text-4xl">
              <span>{t('welcomeView.text.slogan1')}</span>
              <span className="pl-2 text-primary">{t('welcomeView.text.slogan2')}</span>
            </div>
            <Button onClick={toGetStarted} className="h-14 w-44" variant="contained">
              {t('welcomeView.button.getStarted')}
            </Button>
            <div className="text-lg">
              <strong>{t('welcomeView.text.description.1')}</strong>
              <span className="pl-1.5">{t('welcomeView.text.description.2')}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-primary z-0 grow flex flex-col ">
        <div className="mx-auto container max-w-[1280px] flex items-center px-12 justify-between h-full grow sm:flex-col sm:justify-center sm:gap-4">
          <div className="w-2/4 px-20 flex flex-col gap-4 xl:px-2 sm:w-full sm:items-center sm:gap-2">
            <div className="text-5xl font-bold text-white lg:text-2xl xl:text-3xl sm:w-full">{t('welcomeView.text.download.title')}</div>
            <div className="text-white lg:text-base">{t('welcomeView.text.download.subTitle')}</div>
            <Button className="h-16 w-60 lg:w-44 md:h-12" color="secondary" variant="contained">
              <div className="font-bold text-primary">{t('welcomeView.button.download64Bit')}</div>
            </Button>
          </div>
          <div className="w-2/4 sm:w-3/4">
            <img src={previewImage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeView;
