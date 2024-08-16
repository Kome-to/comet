import { Button } from '@mui/material';
import React from 'react';
import Logo from '../../components/Logo/Logo';

const WelcomeView: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      <div className="container max-w-[1280px] h-[50vh] mx-auto mt-2 px-12">
        <div className="w-full h-20 flex justify-between items-center">
          <Logo className="w-36" />
          <div className="flex gap-5">
            <Button className="h-12 w-32 hover:!border-2" variant="outlined">
              Đăng nhập
            </Button>
            <Button className="h-12 w-36" variant="contained">
              Bắt đầu ngay
            </Button>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-6 justify-center items-center mt-24">
            <div className="text-5xl text-black font-bold md:text-4xl">
              <span>Được tạo ra cho mọi người.</span>
              <span className="pl-2 text-primary">Xây dựng vì năng suất.</span>
            </div>
            <Button className="h-14 w-44" variant="contained">
              Bắt đầu ngay
            </Button>
            <div className="text-lg">
              <strong>Comet được dùng thử miễn phí</strong>
              <span className="pl-1.5">bao lâu tùy thích</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-primary z-0 grow flex flex-col ">
        <div className="mx-auto container max-w-[1280px] flex items-center px-12 justify-between h-full grow sm:flex-col sm:justify-center sm:gap-4">
          <div className="w-2/4 px-20 flex flex-col gap-4 xl:px-2 sm:w-full sm:items-center sm:gap-2">
            <div className="text-5xl font-bold text-white lg:text-2xl xl:text-3xl sm:w-full">Tải xuống Comet cho Windows</div>
            <div className="text-white lg:text-base">Với ứng dụng của Comet, nhóm của bạn luôn sẵn sàng chỉ với một cú nhấp chuột</div>
            <Button className="h-16 w-60 lg:w-44 md:h-12" color="secondary" variant="contained">
              <div className="font-bold text-primary">Tải xuống (64-bit)</div>
            </Button>
          </div>
          <div className="w-2/4 sm:w-3/4">
            <img src="https://a.slack-edge.com/6e36e01/marketing/img/downloads/refreshed/slack-ia4-client-windows-desktop.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeView;
