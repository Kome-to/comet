import api from '@/services/apiServies';
import { selectCurrentUser } from '@/services/controllers/user/UserSelector';
import { setCurrentUser } from '@/services/controllers/user/UserSlice';
import { Button } from '@mui/material';
import { pick } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Channel from '../HomeView/components/Channel';
import ChannelCreation from './components/ChannelCreation';
import MemberInvite from './components/MemberInvite';
import WorkspaceNameCreation from './components/WorkspaceNameCreation';
import { useBulkGenerateKeyPairs } from './hooks/useBulkGenerateKeyPairs';
import { v4 as uuidV4 } from 'uuid';
import { ChannelCreateParams, MemberCreateParams } from '@/services/types/apiTypes';
import { ChannelRole } from '@/common/enum';

export interface InviteUser {
  id: string;
  email: string;
  name: string;
  encryptKeys: string[];
}

const DEFAULT_CHANNEL = ['general', 'random', 'topic'];

const WorkspaceCreationView: React.FC = () => {
  const [workspaceName, setWorkspace] = useState('');
  const [step, setStep] = useState(1);
  const [invites, setInvites] = useState<InviteUser[]>([]);
  const [channel, setChannel] = useState('');
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const { keyPairs } = useBulkGenerateKeyPairs(4);

  const getMe = async () => {
    try {
      const data = await api.user.getMe();
      if (!data) return;
      const user = pick(data, ['id', 'email', 'firstName', 'lastName']);
      dispatch(setCurrentUser(user));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      getMe();
    }
  }, [currentUser]);

  const handleNext = () => {
    if (!currentUser) return;

    if (step >= 3) {
      const channels: ChannelCreateParams[] = DEFAULT_CHANNEL.concat([channel]).map((c, i) => ({
        id: uuidV4(),
        name: c,
        publicKey: keyPairs[i].publicKey,
        isPrivate: false,
      }));

      const members: MemberCreateParams[] = channels.reduce((result: MemberCreateParams[], channel, i) => {
        const memberCreations = invites.map((invite) => {
          return {
            userId: invite.id,
            channelId: channel.id as string,
            role: ChannelRole.NONE,
            eChannelKey: invite.encryptKeys[i],
          };
        });

        // Owner
        // const ownerCreation = channels.map()
        // members.push({
        //   userId: currentUser.id,

        // });

        return result.concat(memberCreations);
      }, []);

      const params = {
        name: workspaceName,
        members,
        channels,
      };
      console.log('====================================');
      console.log(params);
      console.log('====================================');
      return;
    }
    setStep(step + 1);
  };

  const onInvite = (user: InviteUser) => {
    setInvites([...invites.filter((e) => e.email !== user.email), user]);
  };
  const onRemoveInvite = (email: string) => {
    setInvites([...invites.filter((e) => e.email !== email)]);
  };

  return (
    <div className="flex-1 pb-[4px] pr-[4px]">
      <div className="bg-[#101214]/60 size-full rounded-md overflow-hidden border-solid border-white/10 border-[1px] flex relative">
        <div className="w-[240px]">
          <div className="w-full h-[50px] flex justify-between items-center px-4">
            <div className="text-lg text-white font-bold">{workspaceName}</div>
          </div>

          {step >= 3 && (
            <div className="text-[#aeddec]/80">
              <div className="pt-4 w-full text-ex-text-primary">
                <div className="flex items-center cursor-pointer gap-1 pl-4 pb-1">
                  <span className="font-bold">Channels</span>
                </div>
                <div>
                  <Channel label={'general'} />
                  <Channel label={'topic'} />
                  <Channel label={'random'} />
                </div>

                <div>{channel && <Channel label={channel.replaceAll(' ', '-')} />}</div>
              </div>
            </div>
          )}

          {step >= 2 && (
            <div className="text-[#aeddec]/80">
              <div className="pt-4 w-full text-ex-text-primary">
                <div className="flex items-center cursor-pointer gap-1 pl-4 pb-1">
                  <span className="font-bold">Direct messages</span>
                </div>
                <div>
                  {invites.map((e) => {
                    return <Channel key={e.email} directMessage label={e.name} />;
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex-1 bg-[#1a1d21] flex flex-col p-16">
          <div className="text-ex-text-1 font-medium text-sm">Step {step} of 3</div>
          {step === 1 && <WorkspaceNameCreation value={workspaceName} onChange={(v) => setWorkspace(v)} />}
          {step === 2 && (
            <MemberInvite
              keyPairs={keyPairs}
              onRemoveInvite={onRemoveInvite}
              onInvite={onInvite}
              invites={invites}
              workspaceName={workspaceName}
            />
          )}
          {step === 3 && <ChannelCreation value={channel} onChange={(v) => setChannel(v)} />}
          <div className="flex gap-4">
            <Button onClick={handleNext} className="!w-20 !mt-10" variant="contained">
              {step === 3 ? 'Create' : 'Next'}
            </Button>
            {step > 1 && (
              <Button
                onClick={() => {
                  setStep(step - 1);
                }}
                className="!w-20 !mt-10"
                variant="outlined"
              >
                Back
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceCreationView;
