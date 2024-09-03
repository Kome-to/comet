import { TextField } from '@mui/material';
import React from 'react';

const WorkspaceNameCreation: React.FC<{ onChange: (value: string) => void; value: string }> = ({ onChange, value }) => {
  return (
    <div className="text-ex-text-primary flex flex-col items-start gap-10 mt-2">
      <div className="flex flex-col items-start gap-3">
        <div className="text-5xl ">What’s the name of your company or team?</div>
        <div className="text-sm">This will be the name of your Comet workspace — choose something that your team will recognize.</div>
      </div>
      <div className="w-full !text-ex-text-primary">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent border-[1px] border-solid border-primary rounded-lg w-full px-4 py-3 outline-none focus:outline-ex-text-primary focus:border-transparent"
          placeholder="Ex: Kma or Kma Academy"
        />
      </div>
    </div>
  );
};

export default WorkspaceNameCreation;
