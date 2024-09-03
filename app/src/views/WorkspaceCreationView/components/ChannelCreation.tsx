import React from 'react';

const ChannelCreation: React.FC<{ value: string; onChange: (v: string) => void }> = ({ value, onChange }) => {
  return (
    <div className="text-ex-text-primary flex flex-col items-start gap-10 mt-2">
      <div className="flex flex-col items-start gap-3">
        <div className="text-5xl ">What’s your team working on right now?</div>
        <div className="text-sm">This could be anything: a project, campaign, event, or the deal you’re trying to close.</div>
      </div>
      <div className="w-full !text-ex-text-primary">
        <input
          value={value}
          onChange={(e) => e.target.value.length <= 20 && onChange(e.target.value)}
          className="bg-transparent border-[1px] border-solid border-primary rounded-lg w-full px-4 py-3 outline-none focus:outline-ex-text-primary focus:border-transparent"
          placeholder="Ex: Kma or Kma Academy"
        />
      </div>
    </div>
  );
};

export default ChannelCreation;
