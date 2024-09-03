import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../common/utils/routes';
import { storage } from '../../common/utils/storage';
import Logo from '../../components/Logo/Logo';
import Svg, { SvgName } from '../../components/Svg/Svg';
import { selectHashKey } from '../../services/controllers/common/CommonSelector';
import { setHashKey } from '../../services/controllers/common/CommonSlice';
import ChangeRegion from '../GetStartedView/ChangeRegion';
const linkCss = 'hover:underline cursor-pointer';

const WorkspaceSelectionView: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const hashKey = useSelector(selectHashKey);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!hashKey) {
      storage.removeToken();
      navigate(routes.SIGN_IN);
    }
  }, [hashKey]);

  const onTryAnotherAccount = () => {
    storage.removeToken();
    dispatch(setHashKey(''));
    navigate(routes.SIGN_IN);
  };

  const handleCreateWorkspace = async () => {
    const token = storage.getToken();
    dispatch(setHashKey(''));
    storage.removeToken();
    window.location.replace(`${import.meta.env.VITE_APP_PROTOCOL}open?token=${token}&&hashKey=${hashKey}`);
  };

  return (
    <div className="container max-w-[768px] h-screen mx-auto flex flex-col">
      <Logo onClick={() => {}} wrapperClassName="mx-auto py-4" className="w-40" />
      <div className="grow flex flex-col flex-grow">
        <div className="text-center w-[600px] mx-auto">
          <div className="flex gap-10 items-center ">
            <div className="flex flex-col gap-1  text-justify">
              <div className="text-black text-3xl font-bold">It looks like you’re new to Comet</div>
              <div>
                <span>There aren’t any invitations or Slack accounts for</span>
                <span className="font-bold pl-1">{'ducanh2306nd@gmail.com'}</span>
                <span>. If your team isn’t on Slack yet, you can create a workspace for them.</span>
              </div>
            </div>
            <div>
              <Svg className="scale-x-[-1] w-[200px]" name={SvgName.GET_STATED_WORKSPACE} />
            </div>
          </div>
          <div className="flex gap-6 mt-4">
            <Button onClick={handleCreateWorkspace} variant="outlined" size="large">
              Create a Workspace
            </Button>
            <Button onClick={onTryAnotherAccount} variant="outlined" size="large">
              Try a Different Account
            </Button>
          </div>
        </div>
        <div className="flex flex-col grow items-center w-96 mx-auto">
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

export default WorkspaceSelectionView;
