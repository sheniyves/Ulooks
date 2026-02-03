import React from 'react';
import CustomizedSwitchRadio from '../SharedComponents/CustomedSwitchRadio';

const SubscribeToggleButton = ({ isSubscribed, onToggle }) => {
  return (
    <div className='flex items-center justify-between -mr-4'>
      <p className="text-darkPurple text-sm font-bold">Subscribe for the Month</p>
      <CustomizedSwitchRadio
        checked={isSubscribed}
        onChange={onToggle}
        checkedTrackColor="#ca9bec"
        thumbColor="#6a0dad"
        checkedBorderColor="#6a0dad"
      />
    </div>
  );
};

export default SubscribeToggleButton;
