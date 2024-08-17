import Logo from '@/components/Logo/Logo';
import { Button } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import icp from '../../services/ipc/icp';
import { WebAppRoutes } from '@/common/enum';

const SignView: React.FC = () => {
  const { t } = useTranslation();

  const navigatorToWebApp = (route: string) => icp.invoker.openExternal(`${import.meta.env.VITE_WEBAPP_URL}${route}`);

  return (
    <div className="size-full bg-primary flex select-none">
      <div className="text-white pt-24 pl-24 w-[580px] flex flex-col h-full">
        <Logo textColor="#fff" className="w-72 h-20 cursor-default" />

        <div className="text-5xl mt-[42px] font-bold leading-[56px]">{t('signInView.text.title')}</div>
        <Button
          onClick={() => navigatorToWebApp(WebAppRoutes.SIGN_IN)}
          variant="contained"
          classes={{ root: '!mt-8 !bg-ex-green h-[46px] !font-bold !normal-case !text-base !rounded-lg !w-[300px]' }}
        >
          Sign In to Comet
        </Button>
        <div className="mt-5">{t('signInView.text.info.navigateToBrowser')}</div>
        <div className="grow flex items-end text-sm pb-12 font-medium">
          {t('signInView.text.info.newInComet')}{' '}
          <span onClick={() => navigatorToWebApp(WebAppRoutes.GET_STATED)} className="underline cursor-pointer ml-1">
            {t('signInView.text.info.createNewWorkspace')}
          </span>
        </div>
      </div>
      <div className="grow flex flex-col items-center justify-center">
        <iframe
          className="w-[300px] h-[300px]"
          src="https://lottie.host/embed/8dcf12d4-28ff-4589-a04c-71f661ad5b27/H3ymzBlsJw.json"
        ></iframe>
      </div>
    </div>
  );
};

export default SignView;
