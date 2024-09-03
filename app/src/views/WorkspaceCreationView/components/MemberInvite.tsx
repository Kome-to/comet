import { encryptWithAES, encryptWithRSA, generateAESKey } from '@/common/utils/crypto';
import api from '@/services/apiServies';
import { selectCurrentUser } from '@/services/controllers/user/UserSelector';
import CloseIcon from '@mui/icons-material/Close';
import LoadingButton from '@mui/lab/LoadingButton';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { InviteUser } from '../WorkspaceCreationView';
import { KeyPair } from '@/services/types/common';

const AddButton = styled(LoadingButton)({
  '&.Mui-disabled': {
    backgroundColor: '#003d61 !important',
  },
});

const MemberInvite: React.FC<{
  workspaceName: string;
  invites: InviteUser[];
  onInvite: (user: InviteUser) => void;
  onRemoveInvite: (email: string) => void;
  keyPairs: KeyPair[];
}> = ({ workspaceName, invites, onInvite, onRemoveInvite, keyPairs }) => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const currentUser = useSelector(selectCurrentUser);

  const handleAddUser = async () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return setError('Invalid email');
    }

    if (value === currentUser?.email) {
      return setError('Can not invite yourself');
    }

    try {
      setLoading(true);
      const user = await api.user.getUser({ email: value });
      if (!user) {
        return setError('User not found');
      }
      const { id, publicKey, email, firstName, lastName } = user;

      const key = await generateAESKey();
      const eKey = await encryptWithRSA(publicKey, key);
      const encryptKeys = await Promise.all(
        keyPairs.map(async (pair) => {
          const { cipherText } = await encryptWithAES(key, pair.privateKey, email);
          return `${eKey}___key___${cipherText}`;
        }),
      );

      onInvite({ id, email, encryptKeys, name: `${firstName} ${lastName}` });
      setValue('');
    } catch (e) {
      console.log(e);
      return setError('User not found');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-ex-text-primary flex flex-col items-start gap-10 mt-2">
      <div className="flex flex-col items-start gap-3">
        <div className="text-5xl ">Who else is on the {workspaceName} team?</div>
      </div>
      <div className="w-full !text-ex-text-primary flex flex-col gap-3">
        <div className="text-sm">Add coworker by email</div>
        <div className="w-full flex items-center gap-2 flex-wrap">
          {invites.map((i) => (
            <div className="px-2 py-1 bg-primary rounded-md flex gap-1" key={i.email}>
              {i.email}
              <div onClick={() => onRemoveInvite(i.email)} className="cursor-pointer hover:brightness-200">
                <CloseIcon />
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-3 items-center">
          <input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError('');
            }}
            className="bg-transparent border-[1px] border-solid border-primary rounded-lg w-full px-4 py-3 outline-none focus:outline-ex-text-primary focus:border-transparent resize-none"
            placeholder="Ex. ellis@gmail.com"
          />
          <AddButton loading={loading} onClick={handleAddUser} variant="contained" className="h-10 w-28">
            Add
          </AddButton>
        </div>
        <div className="text-red-400 font-normal text-xs pl-1">{error}</div>
      </div>
    </div>
  );
};

export default MemberInvite;
